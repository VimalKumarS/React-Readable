import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {editPostAsync, fetchPostAsync} from '../actions/post';
import {Link} from 'react-router-dom'

class EditPost extends React.Component {
    componentWillMount() {
        const {postId} = this.props.match.params
        this
            .props
            .fetchPostAsync(postId)

    }
    componentDidMount() {

        // this.title.value = this.props.post.title === undefined ? '' :
        // this.props.post.title; this.comment.value = this.props.post.body;
    }
    componentWillReceiveProps() {}
    componentDidUpdate() {

        this.title.value = this.props.post !== undefined
            ? this.props.post.title
            : ''
        this.comment.value = this.props.post !== undefined
            ? this.props.post.body
            : ''
    }
    editPost = (e) => {
        e.preventDefault();
        const title = e.target.title.value
        const body = e.target.body.value
        this.props.editPostAsync(this.props.post.id,{title:title,body:body})
        this
            .props
            .history
            .push('/')
    }
    render() {
        const {post} = this.props

        return (
            <div>
                <form onSubmit={this.editPost}>
                    <h2>Edit Post</h2>
                    {post.body}
                    <div>
                        <label className="form-group">Title
                            <span className="required">*</span>
                        </label>
                        <input
                            ref={input => this.title = input}
                            type="text"
                            name="title"
                            className="form-control"/>
                    </div>
                    <div>
                        <label className="form-group">Post
                            <span className="required">*</span>
                        </label>
                        <textarea
                            ref={input => this.comment = input}
                            name="body"
                            id="field5"
                            className="form-control"></textarea>
                    </div>
                    <button>Update</button>
                    <Link to={"/"}>
                        <button>Cancel</button>
                    </Link>

                </form>
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
        editPostAsync: (data,post) => dispatch(editPostAsync(data,post)),
        fetchPostAsync: (data) => dispatch(fetchPostAsync(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost));