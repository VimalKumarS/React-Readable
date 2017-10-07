import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {fetchPostAsync, votePostAsync, deletePostAsync} from '../actions/post';
import {fetchPostCommentsAsync, votePostCommentAsync, deletePostCommentAsync, editPostCommentAsync, createPostCommentAsync} from '../actions/comments'

class PostDetail extends React.Component {

    componentWillMount() {
        const {postId} = this.props.match.params
        this
            .props
            .fetchPostAsync(postId);
        this
            .props
            .fetchPostCommentsAsync(postId);
    }

    deletePostAsync(postid) {
        this
            .props
            .deletePostAsync(postid);
        this
            .props
            .comments
            .foreach(comment => {
                this
                    .props
                    .deletePostCommentAsync(comment.id)
            })
        this
            .props
            .history
            .push('/')
    }
    CommentVote(commentId, vote) {
        this
            .props
            .votePostCommentAsync({
                commentId: commentId,
                vote: vote
            }, "voteScore", "desc")

    }

    saveComment(commentId) {}
    deleteComment(commentId) {
        this
            .props
            .deletePostCommentAsync(commentId);
    }

    postVote(postId, vote) {
        this
            .props
            .votePostAsync({postId: postId, vote: vote});
    }
    editComment(commentItem) {

        this.author.value = commentItem.author;
        this.comment.value = commentItem.body;
        this.commentId.value = commentItem.id;
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const commentBody = e.target.body.value
        const author = e.target.author.value
        const parentid = this.props.post.id
        if (this.commentId.value !== undefined && this.commentId.value !== '') {
            this
                .props
                .editPostCommentAsync({id: this.commentId.value, body: commentBody, author: author})
        } else {
            this
                .props
                .createPostCommentAsync({body: commentBody, author: author, parentId: parentid})
        }
        e.target.body.value = ''
        e.target.author.value = ''

        this.author.value = '';
        this.comment.value = '';
        this.commentId.value = '';
    }

    render() {
        const {post, comments} = this.props
        return (
            <div>
                {post.id !== undefined
                    ? ((
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
                                                onClick={this
                                                .deletePostAsync
                                                .bind(this, post.id)}>
                                                <span className="glyphicon glyphicon-remove"></span>
                                                Remove
                                            </button>
                                            <strong>
                                                <a href="">{post.title}</a>
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
                                        <p>{comments && comments ? comments.length : 0} comments</p>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    ))
                    : (
                        <div>
                            No record found</div>
                    )}
                {post.id !== undefined
                    ? (
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Name
                                    <span className="required">*</span>
                                </label>
                                <input type="hidden" ref={input => this.commentId = input}/>
                                <input
                                    type="text"
                                    ref={input => this.author = input}
                                    name="author"
                                    className="form-control field-long"/>
                            </div>
                            <div className="form-group">
                                <label>Comment
                                    <span className="required">*</span>
                                </label>
                                <textarea
                                    ref={input => this.comment = input}
                                    name="body"
                                    id="field5"
                                    className="form-control field-long field-textarea"></textarea>
                            </div>
                            <button className="pull-right">Submit</button>

                        </form>
                    )
                    : (
                        <div>
                            </div>
                    )}
                {comments && comments.map((item) => (
                    <div className="row" key={item.id}>
                        <div className="col-sm-5">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <button
                                        type="button"
                                        className="btn btn-default btn-sm"
                                        onClick={this
                                        .deleteComment
                                        .bind(this, item.id)}>
                                        <span className="glyphicon glyphicon-remove"></span>
                                        Remove
                                    </button>
                                    <strong>{item.author}</strong>
                                    {/* <Link to={`/${this.props.category}/${comment.parentId}/${comment.id}/edit`}> */}
                                    <button
                                        type="button"
                                        className="btn btn-default pull-right btn-edit"
                                        onClick={this
                                        .editComment
                                        .bind(this, item)}>Edit</button>
                                    {/* </Link> */}

                                    <span className="text-muted pull-right btn-edit">{(new Date(item.timestamp)).toDateString()}</span>
                                </div>
                                <div className="panel-body">
                                    {item.body}
                                    {/* <textarea className="form-control" name="body" id="field5">{item.body}</textarea> */}
                                </div>
                                <div className="panel-heading">
                                    <button
                                        type="button"
                                        className="btn btn-default btn-sm btn-margin-5"
                                        onClick={this
                                        .CommentVote
                                        .bind(this, item.id, 'upVote')}>
                                        <span className="glyphicon glyphicon-thumbs-up"></span>
                                        Up Vote
                                    </button>
                                    <span className="text-muted">{item.voteScore}</span>

                                    <button
                                        type="button"
                                        className="btn btn-default btn-sm btn-margin-5"
                                        onClick={this
                                        .CommentVote
                                        .bind(this, item.id, 'downVote')}>
                                        <span className="glyphicon glyphicon-thumbs-down"></span>
                                        Down Vote
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {
    return {
        ...state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPostAsync: (data) => dispatch(fetchPostAsync(data)),
        votePostAsync: (data) => dispatch(votePostAsync(data)),
        deletePostAsync: (data) => dispatch(deletePostAsync(data)),
        fetchPostCommentsAsync: (data) => dispatch(fetchPostCommentsAsync(data)),
        votePostCommentAsync: (data, sortProperty, sortBy) => dispatch(votePostCommentAsync(data, sortProperty, sortBy)),
        deletePostCommentAsync: (data) => dispatch(deletePostCommentAsync(data)),
        createPostCommentAsync: (data) => dispatch(createPostCommentAsync(data)),
        editPostCommentAsync: (data) => dispatch(editPostCommentAsync(data))
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
