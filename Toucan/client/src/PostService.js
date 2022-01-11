import axios from 'axios';

const url = 'api/posts/';

class PostService {
    // Get Posts
    static async getPosts() {
        const res = await axios.get(url);
        const data = res.data;

        return data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
        }))
    }

    // Get Post
    static async getPost(id) {
        const res = await axios.get(`${url}${id}`);
        const data = res.data;

        return data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
        }))
    }

    // Create Post
    /*static insertPost(title, body, type) {
        return axios.post(url, {
            title,
            body,
            type
        });
    }*/

    // Create Post for testing
    static insertPost(text, posts) {
        return axios.post(url, {
            text,
            posts,
        });
    }

    // Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;