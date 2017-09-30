import CategoryApi from '../api/api';
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS'
export const FETCH_POSTS = 'FETCH_POSTS'
export const SORT_POSTS = 'SORT_POSTS'
export const VOTE_POSTS = 'VOTE_POSTS'
export const DELETE_POSTS = 'DELETE_POSTS'

export function fetchPosts(data) {
    return {type: FETCH_POSTS, data}
}

export function sortPosts(sortProperty,orderBy) {
    return {type: SORT_POSTS, sortProperty,orderBy}
}

export function fetchCategoryPosts(data) {
    return {type: FETCH_CATEGORY_POSTS, data}
}

export function votePosts(data) {
    return {type: VOTE_POSTS, data}
}

export function deletePosts(data) {
    return {type: DELETE_POSTS, data}
}

export function fetchCategoryPostsAsync(category) {
    return function (dispatch) {
        return CategoryApi
            .fetchCategoryPostsAsync(category)
            .then(data => {
                dispatch(fetchCategoryPosts(data));
            })
            .catch(error => {
                throw(error);
            });
    };
}

export function fetchPostsAsync() {
    return function (dispatch) {
        return CategoryApi
            .fetchPostAsync()
            .then(data => {
                dispatch(fetchPosts(data));
            })
            .catch(error => {
                throw(error);
            });
    };
}


export function votePostsAsync({postId, vote}) {
    return dispatch => CategoryApi
        .votePostAsync({postId,vote})
        .then(data => dispatch(votePosts(data)))
        .catch(error => {
            throw(error);
        });

}

export function deletePostsAsync(postId) {
    return dispatch => CategoryApi
        .deletePostAsync(postId)
        .then(data => dispatch(deletePosts(data)))
        .catch(error => {
            throw(error);
        });
}