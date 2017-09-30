import CategoryApi from '../api/api';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'


export function loadCategory(data) {
    return {type: FETCH_CATEGORIES, data};
}



export function loadCategories() {
    // make async call to api, handle promise, dispatch action when promise is
    // resolved
    return function (dispatch) {
        return CategoryApi
            .loadCategory()
            .then(data => {
                dispatch(loadCategory(data.categories));
            })
            .catch(error => {
                throw(error);
            });
    };
}

