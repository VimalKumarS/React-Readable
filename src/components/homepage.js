import React from 'react';
import {connect} from 'react-redux';
import uuidv4 from 'uuid/v4'
import {fetchCategoryPostsAsync, fetchPostsAsync, votePostsAsync, deletePostsAsync} from '../actions/posts';
import CommentCount from "./commentcount"
import AddSort from "./AddSort"
import SinglePost from "./singlepost"

class Home extends React.Component {
  state = {
    categoryName: "All Post"
  }
  componentWillMount() {
    //this.fetchData();
  }
  componentDidMount() {
    this.fetchData()
  }
  // componentDidUpdate(prevProps) {
  //   // console.log(prevProps); console.log(this.props);
  //   if (prevProps.match.params !== this.props.match.params) {
  //     this.fetchData()
  //   }
  // }
  // postVote(postId, vote) {   console.log(this.props.votePostsAsync({postId:
  // postId, vote: vote})) }

  fetchData = () => {
    const {category} = this.props.match.params
    if (category != null) {
      this.setState(() => ({categoryName: category}))

      // this   .props   .fetchCategoryPostsAsync(category)
    } else {
      this.setState(() => ({categoryName: "All Post"}))

    }
    this
      .props
      .fetchPostsAsync()
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
          {posts.map(post =>(
            <div key={uuidv4()}>
            <SinglePost
            key={post.id}
            post={post}
            />
            <CommentCount key={uuidv4()} postid={post.id} />
            <hr/>
            </div>
            ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({
  posts
  
}, {match}) {
  const category = match.params.category
  return {
    posts: category
      ? posts.filter(post => post.category === category)
      : posts,
   
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPostsAsync: () => dispatch(fetchPostsAsync()),
    fetchCategoryPostsAsync: (data) => dispatch(fetchCategoryPostsAsync(data)),
    votePostsAsync: (data) => dispatch(votePostsAsync(data)),
    deletePostsAsync: (data) => dispatch(deletePostsAsync(data)),
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
