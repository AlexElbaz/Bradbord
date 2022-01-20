import axios from 'axios';

const url = 'api/courses/';

class CourseService {
    // Get Course
    static async getCourses() {
        const res = await axios.get(url);
        const data = res.data;
        console.log('s')

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

    // Create Post for testing
    static insertCourse(name, courseCode, teacher, members, time, img) {
        return axios.post(url, {
            name,
            courseCode,
            teacher,
            members,
            time,
            img
        });
    }

    // Delete Course
    static deleteCourse(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default CourseService;