import CategoryApi from '../api/api';

export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS'
export const CREATE_POST_COMMENT = 'CREATE_POST_COMMENT'
export const EDIT_POST_COMMENT = 'EDIT_POST_COMMENT'
export const DELETE_POST_COMMENT = 'DELETE_POST_COMMENT'
export const VOTE_POST_COMMENT = 'VOTE_POST_COMMENT'

export function fetchPostComments(data) {
    return {type: FETCH_POST_COMMENTS, data}
}

export function createPostComment(data) {
    return {type: CREATE_POST_COMMENT, data}
}

export function editPostComment(data) {
    return {type: EDIT_POST_COMMENT, data}
}

export function deletePostComment(data) {
    return {type: DELETE_POST_COMMENT, data}
}

export function votePostComment(data) {
    return {type: VOTE_POST_COMMENT, data}
}

export function fetchPostCommentsAsync(postId) {
    return dispatch => CategoryApi
        .fetchPostCommentsAsync(postId)
        .then(data => dispatch(fetchPostComments(data)))
        .catch(error => {
            throw(error);
        });
}

export function deletePostCommentAsync({commentId}) {
    return dispatch => CategoryApi
        .deletePostCommentAsync({commentId})
        .then(data => dispatch(deletePostComment(data)))
        .catch(error => {
            throw(error);
        });
}

function createPostCommentAsync({body, author, parentId}) {
    return dispatch => CategoryApi
        .createPostCommentAsync({body, author, parentId})
        .then(data => dispatch(createPostComment(data)))
        .catch(error => {
            throw(error);
        });
}

function editPostCommentAsync({id, body, author}) {
    return dispatch => CategoryApi
        .editPostCommentAsync({id, body, author})
        .then(data => dispatch(editPostComment(data)))
        .catch(error => {
            throw(error);
        });
}

function votePostCommentAsync({commentId, vote}) {
    return dispatch => CategoryApi
        .votePostCommentAsync({commentId, vote})
        .then(data => dispatch(votePostComment(data)))
        .catch(error => {
            throw(error);
        });
}