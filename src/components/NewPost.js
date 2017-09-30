import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {createPostAsync} from '../actions/post';

class NewPost extends React.Component {

    addNewPost = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const author = e.target.author.value;
        const category = e.target.category.value;
        this.props.createPostAsync({
            title:title,
            body:body,
            author:author,
            category:category
        })
        this
            .props
            .history
            .push('/')
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.addNewPost}>
                    <h2>New Post</h2>

                    <div className="form-group">
                        <label >Name*
                        </label>
                        <input type="text" className="form-control" name="author"/>
                    </div>
                    <div className="form-group">
                        <label >Title

                        </label>
                        <input type="text" className="form-control" name="title"/>
                    </div>
                    <div className="form-group">
                        <label >Category
                        </label>
                        <select name="category" className="form-control">
                            {this.props.categories && this
                                .props
                                .categories
                                .map((category) => (
                                    <option key={category.name} value={category.name}>{category.name}</option>
                                ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label >Post*

                        </label>
                        <textarea className="form-control" name="body" id="field5"></textarea>
                    </div>
                    <button>Submit
                    </button>

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
        createPostAsync: (data) => dispatch(createPostAsync(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));