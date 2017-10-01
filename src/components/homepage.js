import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {fetchCategoryPostsAsync, fetchPostsAsync, votePostsAsync, deletePostsAsync} from '../actions/posts';
import AddSort from "./AddSort"

class Home extends React.Component {
  state = {
    categoryName: "All Post"
  }
  componentWillMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    console.log(this.props);
    if (prevProps.match.params !== this.props.match.params) {
      this.fetchData()
    }
  }
  postVote(postId, vote) {
    console.log(this.props.votePostsAsync({postId: postId, vote: vote}))
  }

  fetchData = () => {
    const {category} = this.props.match.params
    if (category != null) {
      this.setState(() => ({categoryName: category}))

      this
        .props
        .fetchCategoryPostsAsync(category)
    } else {
      this.setState(() => ({categoryName: "All Post"}))
      this
        .props
        .fetchPostsAsync()
    }
  }
  render() {
    const posts = this.props.posts
    return (
      <div>
        <AddSort/>
        <h1>{this
            .state
            .categoryName
            .charAt(0)
            .toUpperCase() + this
            .state
            .categoryName
            .slice(1)}</h1>
        <div className="container">
          {posts.length > 0
            ? posts.map((item) => (
              <div className="row" key={item.id}>
                <div className="span12">
                  <div className="row">
                    <div className="span8">
                      <h4>
                        <Link to={"/post/"+item.id}>
                        <button
                          type="button"
                          className="btn btn-default btn-sm float-right"
                         >                          
                          Edit
                        </button>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-default btn-sm"
                          onClick={()=>this
                          .props
                          .deletePostsAsync(item.id)}>
                          <span className="glyphicon glyphicon-remove"></span>
                          Remove
                        </button>
                        <strong>
                          <Link to={"categrory/"+item.category+"/"+item.id}>{item.title}</Link>                          
                        </strong>
                      </h4>
                      
                    </div>
                  </div>
                  <div className="row">

                    <div className="span10">
                      <p>
                        {item.body}
                      </p>

                    </div>
                  </div>
                  <div className="row">
                    <div className="span8">
                      <p></p>
                      <p>
                        <i className="icon-user"></i>
                        by
                        <a href="">
                          {item.author}
                        </a>
                        | created on : {(new Date(item.timestamp)).toDateString()}
                        | Category : {item.category}
                        |
                        <button
                          type="button"
                          className="btn btn-default btn-sm btn-margin-5"
                          onClick={this
                          .postVote
                          .bind(this, item.id, 'upVote')}>
                          <span className="glyphicon glyphicon-thumbs-up"></span>
                          Up Vote
                        </button>
                        Score : {item.voteScore}
                        <button
                          type="button"
                          className="btn btn-default btn-sm btn-margin-5"
                          onClick={this
                          .postVote
                          .bind(this, item.id, 'downVote')}>
                          <span className="glyphicon glyphicon-thumbs-down"></span>
                          Down Vote
                        </button>

                      </p>
                    </div>
                  </div>
                </div>
                <hr/>
              </div>
            ))
            : 'No Record found!!'}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPostsAsync: () => dispatch(fetchPostsAsync()),
    fetchCategoryPostsAsync: (data) => dispatch(fetchCategoryPostsAsync(data)),
    votePostsAsync: (data) => dispatch(votePostsAsync(data)),
    deletePostsAsync: (data) => dispatch(deletePostsAsync(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
