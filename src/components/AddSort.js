import React from 'react';
import {connect} from 'react-redux';
import {sortPosts} from '../actions/posts';
import {withRouter} from 'react-router-dom'
class AddSort extends React.Component {
    newPost = () => {
        this
            .props
            .history
            .push('/newpost')
    }
    state = {
        timestamp: 0,
        voteScore: 0
    }
    sortPosts(sortProperty) {

        this
            .props
            .sortPosts(sortProperty, this.state[sortProperty] % 2 === 0
                ? "desc"
                : "asc");
        this.setState({})
        this.setState(function (prevState, props) {
            return {
                timestamp: sortProperty === "timestamp" ? prevState.timestamp + 1 : prevState.timestamp ,
                voteScore : sortProperty === "voteScore" ? prevState.voteScore + 1 : prevState.timestamp
            }
        });
    }

    render() {
        return (
            <div>
                <div className="container">

                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={this
                        .sortPosts
                        .bind(this, 'timestamp')}>order by date</button>
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={this
                        .sortPosts
                        .bind(this, 'voteScore')}>order by score</button>
                    <button
                        type="button"
                        className="btn btn-primary pull-right"
                        onClick={this.newPost}>Add New Post</button>

                </div>

            </div>
        )
    }
}

const mapStateToProps = ({categories, posts}) => ({categories, posts})

function mapDispatchToProps(dispatch) {
    return {
        sortPosts: (sortby, orderby) => dispatch(sortPosts(sortby, orderby))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSort));