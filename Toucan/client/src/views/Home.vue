<template>
<div id="bg">
  <div class="container">
    <h3>{{ content }}</h3>
    <div class="row">
      <NavbarComponent />
      <div class="col-lg-4">
        <AddCourse @add-course="addCourse"/>
        <Courses
        @delete-course="deleteCourse"
        @show-posts="showPosts"
        @show-all-posts="showAllPosts"
        :courses="courses"
        />
      </div>
      <div class="col-lg-8">
        <div id="post-header"></div>
        <CourseTabs :posts="filteredPosts" @delete-post="deletePost" @re-render-posts="forceRerender" :course="selectedCourse" :isSelected="isSelected" :hasManyPosts="hasManyPosts"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AddCourse from '@/components/AddCourse.vue'
import Courses from '@/components/Courses.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import CourseTabs from '@/components/CourseTabs.vue'

import PostService from '@/PostService.js'
import CourseService from '@/CourseService.js'

import UserService from "../services/user.service"

export default {
  name: 'Home',
  components: {
    AddCourse,
    Courses,
    NavbarComponent,
    CourseTabs
  },
  data() {
    return {
      courses: [],
      posts: [],
      coursePosts: [],
      filteredPosts: [],
      selectedCourse: '',
      isSelected: false,
      hasManyPosts: false,
      content: "",
    }
  },
  methods: {
    async addCourse(course) {
      await CourseService.insertCourse(course.name, course.courseCode, course.teacher, course.members, course.time, course.img, course.modalID);
      this.courses = await CourseService.getCourses();
    },
    async deleteCourse(id) {
      await CourseService.deleteCourse(id); // Deletes the course
      this.courses = await CourseService.getCourses(); // Gets all the courses again now that a specific course has been deleted

      // Find all the posts that belong to the deleted course and deletes them one by one
      this.posts.forEach(async post => {
        if (post.courseID === id)
          await PostService.deletePost(post._id);
      });
      
      this.posts = (await PostService.getPosts()).reverse();  // Gets all the posts again now that all the posts belonging to the deleted course have been deleted
      this.filteredPosts = this.showFivePosts(this.posts); // Sets filteredPosts (determines which posts are displayed) to all remaining posts
    },
    async showPosts(id) {
      // old version of showPosts without using component; may revert back to this if posts component fails
      /*document.querySelector('#post-header').innerHTML = '';
      document.querySelector('#posts').innerHTML = '';
      //let currentCourse = await CourseService.getCourse(id);
      this.posts = await PostService.getPosts();
      console.log(this.posts);
      console.log(this.courses);

      const courseName = this.getCourseName(id);
      this.createPostsHeader(courseName);
      
      this.posts.forEach((post) => {
        console.log(post.courseID);
        if (post.courseID === id) {
          let coursePost = this.showPost(post, id);
          console.log(coursePost);
          document.querySelector('#posts').appendChild(coursePost);
        }
      })*/
      this.selectedCourse = id;
      this.isSelected = true;
      this.coursePosts = this.posts.filter(post => (post.courseID === id));
      this.filteredPosts = this.showFivePosts(this.coursePosts);
    },
    showAllPosts() {
      this.isSelected = false;
      this.filteredPosts = this.showFivePosts(this.posts);
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
    async deletePost(id) {
      console.log(id);

      let courseOfPost;
      this.posts.forEach(post => {
        if (post._id === id)
          courseOfPost = post.courseID;
      });

      await PostService.deletePost(id);

      this.posts = (await PostService.getPosts()).reverse();

      if (this.isSelected) // Makes it so that if a course is selected, displays those posts, otherwise dispaly all posts
        this.filteredPosts = this.posts.filter(post => (post.courseID === courseOfPost));
      else
        this.filteredPosts = this.posts;
    },
    async forceRerender(id) {
      this.posts = (await PostService.getPosts()).reverse();
      this.showPosts(id)
    },
    showFivePosts(posts) {
      this.hasManyPosts = false;

      let postsToShow = [];

      posts.forEach((post, index) => {
        if (index < 5)
          postsToShow.push(JSON.parse(JSON.stringify(post)));
      });

      if (posts.length > 5) {
        this.hasManyPosts = true;
      }

      return postsToShow;
    },
  },
  async created() {
    this.courses = await CourseService.getCourses();
    this.posts = (await PostService.getPosts()).reverse();
    this.filteredPosts = this.showFivePosts(this.posts);
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
}
</script>

<style scoped>
div.container {
  max-width: 80%;
  margin: 0 auto;
}

div.post-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<style>

body{
    background: url(../assets/homebg.png) no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    height: 100vh;
  }
</style>
