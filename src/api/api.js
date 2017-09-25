class CategoryApi {

    static requestHeaders() {
        return {'Authorization': `${process.env.REACT_APP_APP_KEY}`}
    }

    static loadCategory() {
        const headers = this.requestHeaders();
        const request = new Request(`${process.env.API_HOST}/categories`, {
            method: 'GET',
            headers: headers
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    ////${category}/posts
    static fetchCategoryPostsAsync(category) {
        const headers = Object.assign({
            'Content-Type': 'application/json'
        }, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/${category}/posts`, {
            method: 'GET',
            headers: headers
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    ////posts
    static fetchPostAsync() {
        const headers = Object.assign({
            'Content-Type': 'application/json'
        }, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/posts`, {
            method: 'GET',
            headers: headers
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    ////posts/${postId}
    static fetchPostByIDAsync(PostId) {
        const headers = Object.assign({
            'Content-Type': 'application/json'
        }, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/posts/${postId}`, {
            method: 'GET',
            headers: headers
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    ///posts
    static createPostAsync(post) {
        const postData = {
            ...post,
            id: new Date().valueOf(),
            timestamp: Date.now()
        }
        const headers = Object.assign({
            'Content-Type': 'application/json'
        }, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/posts`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(postData)
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static editPostAsync({postId, post}) {
        const headers = Object.assign({
            'Content-Type': 'application/json'
        }, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/posts/${postId}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(post)
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static deletePostAsync({postId}) {
        const headers = Object.assign({
            'Content-Type': 'application/json'
        }, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/posts/${postId}`, {
            method: 'DELETE',
            headers: headers
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static votePostAsync({postId, vote}) {
        const headers = Object.assign({
            'Content-Type': 'application/json'
        }, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/posts/${postId}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({option: vote})
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static fetchPostCommentsAsync(postId) {
        const headers = Object.assign({
            'Content-Type': 'application/json'
        }, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/posts/${postId}/comments`, {
            method: 'GET',
            headers: headers
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static deletePostCommentAsync({commentId}) {
        const headers = Object.assign({
            'Content-Type': 'application/json'
        }, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/comments/${commentId}`, {
            method: 'DELETE',
            headers: headers
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static createPostCommentAsync({body, author, parentId}) {
        const postData = {
            body: body,
            author: author,
            parentId: parentId,
            id: new Date().valueOf(),
            timestamp: Date.now()
        }
        const headers = Object.assign({
            'Content-Type': 'application/json'
        }, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/comments`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(postData)
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static editPostCommentAsync({id, body, author}) {
        const headers = Object.assign({
            'Content-Type': 'application/json'
        }, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/comments/${id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({'body': body, 'author': author})
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static votePostCommentAsync({commentId, vote}) {
        const headers = Object.assign({
            'Content-Type': 'application/json'
        }, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/comments/${commentId}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({option: vote})
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default CategoryApi;