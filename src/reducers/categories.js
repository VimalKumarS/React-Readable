import {FETCH_CATEGORIES, FETCH_CATEGORY_POSTS, FETCH_POSTS,SORT_POSTS} from '../actions/categories'
import * as _ from 'lodash'
function categories(state = [], action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return action.data
        case FETCH_POSTS:
            return action.data
        case FETCH_CATEGORY_POSTS:
            return action.data
        case SORT_POSTS:
            return _.orderBy([...state], [action.sortProperty], [action.sortBy])
        default:
            return state
    }
}

export default categories