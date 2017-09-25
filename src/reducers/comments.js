import {FETCH_POST_COMMENTS, CREATE_POST_COMMENT, EDIT_POST_COMMENT, DELETE_POST_COMMENT, VOTE_POST_COMMENT} from '../actions/comments'
import * as _ from 'lodash'

function comments(state = [], action) {
    switch (action.type) {
        case FETCH_POST_COMMENTS:
            return _.sortBy(action.data, function (data) {
                return data.timestamp
            });
        case CREATE_POST_COMMENT:
            return _.orderBy(state.concat([action.data]),[action.sortProperty],[action.sortBy]);
        case EDIT_POST_COMMENT:
            return _.orderBy([
                ...state.filter(comment => comment.id !== action.data.id),
                Object.assign({}, action.data)
            ], [action.sortProperty],[action.sortBy]);
        case DELETE_POST_COMMENT:
            return state.filter(comment => comment.id !== action.data.id)
        case VOTE_POST_COMMENT:
            return _.orderBy([
                ...state.filter(comment => comment.id !== action.data.id),
                Object.assign({}, action.data)
            ], [action.sortProperty],[action.sortBy]);
        default:
            return state
    }
}

export default comments