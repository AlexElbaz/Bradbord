<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4">
        <AddCourse @add-course="addCourse"/>
        <Courses
        @delete-course="deleteCourse"
        @show-posts="showPosts"
        :courses="courses"
        />
      </div>
      <div class="col-lg-8">
        <div id="posts">
          <!-- posts from the selected course go here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddCourse from '@/components/AddCourse.vue'
import Courses from '@/components/Courses.vue'

import PostService from '@/PostService.js'
import CourseService from '@/CourseService.js'

export default {
  name: 'Home',
  components: {
    AddCourse,
    Courses,
  },
  data() {
    return {
      courses: [],
      posts: [],
    }
  },
  methods: {
    async addCourse(course) {
      await CourseService.insertCourse(course.text, course.posts);
      this.courses = await CourseService.getCourses();
    },
    async deleteCourse(id) {
      await CourseService.deleteCourse(id);
      this.courses = await CourseService.getCourses();
    },
    async showPosts(id) {
      document.querySelector('#posts').innerHTML = '';
      //let currentCourse = await CourseService.getCourse(id);
      this.posts = await PostService.getPosts();
      console.log(this.posts);
      this.posts.forEach((post) => {
        console.log(post.courseID);
        if (post.courseID === id) {
          console.log('test');
          let coursePost = this.showPost(post);
          document.querySelector('#posts').appendChild(coursePost);
        }
      })
      /*currentCourse.posts.forEach(post => {
        let coursePost = this.showPost(post);
        document.querySelector('#posts').appendChild(coursePost);
      })*/
    },
    showPost(post) {
      let newPost = document.createElement('div');
      newPost.setAttribute('class', 'row');

      // will use below once there is more post functionality
      /*let postBody = document.createElement('p');
      postBody.appendChild(document.createTextNode(`${post}`));*/

      newPost.appendChild(document.createTextNode(`${post.title}`));
      newPost.appendChild(document.createTextNode(`${post.body}`));
      newPost.appendChild(document.createTextNode(`${post.type}`));
      return newPost;
    }
  },
  async created() {
    this.courses = await CourseService.getCourses();
  }
}
</script>

<style scoped>
div.container {
  max-width: 80%;
  margin: 0 auto;
}
</style>
