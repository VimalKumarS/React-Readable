import React from 'react';
import {connect} from 'react-redux';

import {fetchPostCommentsAsync} from '../actions/comments'

class CommentCount extends React.Component {

    componentDidMount() {
        //this.fetchData();
        this
            .props
            .fetchPostCommentsAsync(this.props.postid)
    }

    //shouldComponentUpdate(nextProps) {
        //const differentTitle = this.props.title !== nextProps.title;
        //const differentDone = this.props.done !== nextProps.done
       // return this.props.comments !== nextProps.comments;
    //}

    render() {

        const {comments} = this.props

        return (
            <div>

                <p>{comments && comments
                        ? comments.length
                        : 0}
                    comments</p>

            </div>
        );
    }
}

function mapStateToProps(state, {postid}) {

    return {comments:state.comments.filter(x=> x.parentId===postid)}
}

function mapDispatchToProps(dispatch) {
    return {

        fetchPostCommentsAsync: (data) => dispatch(fetchPostCommentsAsync(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCount);
