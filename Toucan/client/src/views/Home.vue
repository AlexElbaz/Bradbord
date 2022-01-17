<template>
  <div class="container">
    <div class="row">
      <NavbarComponent />
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
import NavbarComponent from '@/components/NavbarComponent.vue'

import PostService from '@/PostService.js'
import CourseService from '@/CourseService.js'

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
      posts: [],
    }
  },
  methods: {
    async addCourse(course) {
      await CourseService.insertCourse(course.name, course.courseCode, course.teacher, course.members, course.img);
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

      const courseName = this.getCourseName(id);
      this.createPostsHeader(courseName);
      
      this.posts.forEach((post) => {
        console.log(post.courseID);
        if (post.courseID === id) {
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
      //newPost.setAttribute('scope', 'row');
      newPost.classList.add('card', 'mx-auto', 'p-3', 'my-2');

      let postTitle = document.createElement('div');
      postTitle.classList.add('card-title', 'h2');
      postTitle.appendChild(document.createTextNode(`${post.title}`));
      newPost.appendChild(postTitle);

      let hr = document.createElement('hr');
      newPost.appendChild(hr);

      let postBody = document.createElement('div');
      postBody.classList.add('card-body', 'text-start');
      postBody.appendChild(document.createTextNode(`${post.body}`));
      newPost.appendChild(postBody);

      //newPost.appendChild(document.createTextNode(`${post.type}`)); // have a corresponding icon for the post type
      return newPost;
    },
    getCourseName(id) {
      let courseName = '';
      this.courses.forEach((course) => {
        if (course._id === id) {
          courseName = course.name;
        }
      })
      return courseName;
    },
    createPostsHeader(courseName) {
      let title = document.createElement('div');
      title.classList.add('h1');
      title.appendChild(document.createTextNode(`Posts for ${courseName}`));
      document.querySelector('#posts').appendChild(title);

      // the link on this button doesn't work
      let addPostsButton = document.createElement('a');
      addPostsButton.setAttribute('type', 'button');
      addPostsButton.classList.add('btn', 'btn-primary', 'link');
      addPostsButton.setAttribute('href', '/addposts');
      addPostsButton.appendChild(document.createTextNode('Add Posts'));
      document.querySelector('#posts').appendChild(addPostsButton);
    }
  },
  async created() {
    this.courses = await CourseService.getCourses();
  }
}
</script>

<style>
div.container {
  max-width: 80%;
  margin: 0 auto;
}

body:before {
  content: '';
  z-index: -1;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(../assets/homebg.png) no-repeat;
  background-size: cover;
  opacity: 0.25;
}
</style>
