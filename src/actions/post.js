import CategoryApi from '../api/api';

export const FETCH_POST = 'FETCH_POST'
export const RESET_POST = 'RESET_POST'
export const CREATE_POST = 'CREATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'

export function fetchPost(data) {
    return {type: FETCH_POST, data}
}

export function createPost(data) {
    return {type: CREATE_POST, data}
}

export function editPost(data) {
    return {type: EDIT_POST, data}
}

export function deletePost(data) {
    return {type: DELETE_POST, data}
}

export function votePost(data) {
    return {type: VOTE_POST, data}
}

export function fetchPostAsync(postId) {
    return dispatch => CategoryApi
        .fetchPostByIDAsync(postId)
        .then(data => dispatch(fetchPost(data)))
        .catch(error => {
            throw(error);
        });
}

export function createPostAsync(post) {
    return dispatch => CategoryApi
        .createPostAsync(post)
        .then(data => dispatch(createPost(data)))
        .catch(error => {
            throw(error);
        });
}

export function editPostAsync({postId, post}) {
    return dispatch => CategoryApi
        .editPostAsync({postId, post})
        .then(data => dispatch(editPost(data)))
        .catch(error => {
            throw(error);
        });
}

export function deletePostAsync(postId) {
    return dispatch => CategoryApi
        .deletePostAsync(postId)
        .then(data => dispatch(deletePost(data)))
        .catch(error => {
            throw(error);
        });
}

export function votePostAsync({postId, vote}) {
    return dispatch => CategoryApi
        .votePostAsync({postId,vote})
        .then(data => dispatch(votePost(data)))
        .catch(error => {
            throw(error);
        });

}
