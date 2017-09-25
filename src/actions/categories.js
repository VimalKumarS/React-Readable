import CategoryApi from '../api/api';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS'
export const FETCH_POSTS = 'FETCH_POSTS'
export const SORT_POSTS = 'SORT_POSTS'

export function loadCategory(data) {
    return {type: FETCH_CATEGORIES, data};
}

export function fetchPosts(data) {
    return {type: FETCH_POSTS, data}
}

export function sortPosts(sortBy) {
    return {type: SORT_POSTS, sortBy}
}

export function fetchCategoryPosts(category, data) {
    return {type: FETCH_CATEGORY_POSTS, data}
}

export function loadCategories() {
    // make async call to api, handle promise, dispatch action when promise is
    // resolved
    return function (dispatch) {
        return CategoryApi
            .loadCategory()
            .then(data => {
                dispatch(loadCategory(data));
            })
            .catch(error => {
                throw(error);
            });
    };
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