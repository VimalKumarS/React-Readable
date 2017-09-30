import {FETCH_CATEGORY_POSTS, FETCH_POSTS,SORT_POSTS,VOTE_POSTS,DELETE_POSTS} from '../actions/posts'
import * as _ from 'lodash'
function posts(state = [], action) {
    switch (action.type) {
        case FETCH_POSTS:
            return action.data
        case FETCH_CATEGORY_POSTS:
            return action.data
        case SORT_POSTS:
            return _.orderBy([...state], [action.sortProperty], [action.orderBy])
        case VOTE_POSTS:
            let id = action.data.id;
           state.map((item) => {
                if(item.id === id){
                    item.voteScore = action.data.voteScore
                    
                }
            })
            return [...state];
        case DELETE_POSTS:
            return [...state.filter(x=> x.id != action.data.id )];
        default:
            return state
    }
}

export default posts