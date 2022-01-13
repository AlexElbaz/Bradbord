<template>
  <div class="container">
    <div class="home">
      <NavbarComponent />
      <div class="col-4">
        <AddCourse @add-course="addCourse"/>
        <Courses
        @delete-course="deleteCourse"
        @show-posts="showPosts"
        :courses="courses"
        />
      </div>
      <div class="col-6">
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
import NavbarComponent from '@/components/NavbarComponent.vue'

import PostService from '@/PostService.js'

export default {
  name: 'Home',
  components: {
    AddCourse,
    Courses,
    NavbarComponent
  },
  data() {
    return {
      courses: [],
    }
  },
  methods: {
    async addCourse(course) {
      await PostService.insertPost(course.text, course.posts);
      this.courses = await PostService.getPosts();
    },
    async deleteCourse(id) {
      await PostService.deletePost(id);
      this.courses = await PostService.getPosts();
    },
    async showPosts(id) {
      document.querySelector('#posts').innerHTML = '';
      let currentCourse = await PostService.getPost(id);
      console.log(currentCourse[0].posts);
      currentCourse[0].posts.forEach(post => {
        let coursePost = this.showPost(post);
        document.querySelector('#posts').appendChild(coursePost);
      })
    },
    showPost(post) {
      let newPost = document.createElement('div');
      newPost.setAttribute('scope', 'row');

      // will use below once there is more post functionality
      /*let postBody = document.createElement('p');
      postBody.appendChild(document.createTextNode(`${post}`));*/

      newPost.appendChild(document.createTextNode(`${post}`));
      return newPost;
    }
  },
  async created() {
    this.courses = await PostService.getPosts();
  }
}
</script>

<style scoped>
div.container {
  max-width: 80%;
  margin: 0 auto;
}
</style>
