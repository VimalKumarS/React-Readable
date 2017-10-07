import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {votePostsAsync, deletePostsAsync, fetchPostsAsync} from '../actions/posts';

import CommentCount from "./commentcount"

class SinglePost extends React.Component {

    componentDidMount() {
        //this.fetchData();
       
    }


    postVote(postId, vote) {
        this
            .props
            .votePostsAsync({postId: postId, vote: vote})
        this
            .props
            .fetchPostsAsync()
    }

    fetchData = () => {
        this
            .props
            .fetchPostCommentsAsync(this.props.post.id)
    }
    render() {
        
        const { post } = this.props

        return (
            <div>

                <div className="container">
                    {post && (
                        <div className="row" key={post.id}>
                            <div className="span12">
                                <div className="row">
                                    <div className="span8">
                                        <h4>
                                            <Link to={"/post/" + post.id}>
                                                <button type="button" className="btn btn-default btn-sm float-right">
                                                    Edit
                                                </button>
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-default btn-sm"
                                                onClick={() => {
                                                this
                                                    .props
                                                    .deletePostsAsync(post.id);
                                                
                                                    this
                                                    .props
                                                    .fetchPostsAsync()
                                            }}>
                                                <span className="glyphicon glyphicon-remove"></span>
                                                Remove
                                            </button>
                                            <strong>
                                                <Link to={"/" + post.category + "/" + post.id}>{post.title}</Link>
                                            </strong>
                                        </h4>

                                    </div>
                                </div>
                                <div className="row">

                                    <div className="span10">
                                        <p>
                                            {post.body}
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
                                                {post.author}
                                            </a>
                                            | created on : {(new Date(post.timestamp)).toDateString()}
                                            | Category : {post.category}
                                            |
                                            <button
                                                type="button"
                                                className="btn btn-default btn-sm btn-margin-5"
                                                onClick={this
                                                .postVote
                                                .bind(this, post.id, 'upVote')}>
                                                <span className="glyphicon glyphicon-thumbs-up"></span>
                                                Up Vote
                                            </button>
                                            Score : {post.voteScore}
                                            <button
                                                type="button"
                                                className="btn btn-default btn-sm btn-margin-5"
                                                onClick={this
                                                .postVote
                                                .bind(this, post.id, 'downVote')}>
                                                <span className="glyphicon glyphicon-thumbs-down"></span>
                                                Down Vote
                                            </button>

                                        </p>
                                        <CommentCount postid={post.id}/>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    )
}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, {post}) {
    
    return {
       post:post
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPostsAsync: () => dispatch(fetchPostsAsync()),
        votePostsAsync: (data) => dispatch(votePostsAsync(data)),
        deletePostsAsync: (data) => dispatch(deletePostsAsync(data))       
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
