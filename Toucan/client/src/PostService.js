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

        let course = data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
        }));

        return course[0];
    }

    // Create Post for testing
    static insertPost(title, body, type, courseID) {
        return axios.post(url, {
            title,
            body,
            type,
            courseID,
        });
    }

    // Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;