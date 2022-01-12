import axios from 'axios';

const url = 'api/courses/';

class PostService {
    // Get Course
    static async getCourses() {
        const res = await axios.get(url);
        const data = res.data;

        return data.map(course => ({
            ...course,
            createdAt: new Date(course.createdAt)
        }));
    }

    // Get Course
    static async getCourse(id) {
        const res = await axios.get(`${url}${id}`);
        const data = res.data;

        let course = data.map(course => ({
            ...course,
            createdAt: new Date(course.createdAt)
        }));

        return course[0];
    }

    // Create Course
    /*static insertPost(title, body, type) {
        return axios.post(url, {
            title,
            body,
            type
        });
    }*/


    // Create Post for testing
    static insertCourse(text) {
        return axios.post(url, {
            text
        });
    }

    // Delete Course
    static deleteCourse(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;