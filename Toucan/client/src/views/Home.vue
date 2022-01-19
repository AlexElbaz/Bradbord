<template>
<div id="bg">
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
        <div id="post-header">
          
        </div>
        <div id="posts">
          <!-- posts from the selected course go here -->
          <Posts 
          @delete-post="deletePost"
          :posts="filteredPosts"
          />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AddCourse from '@/components/AddCourse.vue'
import Courses from '@/components/Courses.vue'
import Posts from '@/components/Posts.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'

import PostService from '@/PostService.js'
import CourseService from '@/CourseService.js'

export default {
  name: 'Home',
  components: {
    AddCourse,
    Courses,
    Posts,
    NavbarComponent
  },
  data() {
    return {
      courses: [],
      posts: [],
      filteredPosts: [],
    }
  },
  methods: {
    async addCourse(course) {
      await CourseService.insertCourse(course.name, course.courseCode, course.teacher, course.members, course.time, course.img);
      this.courses = await CourseService.getCourses();
    },
    async deleteCourse(id) {
      await CourseService.deleteCourse(id);
      this.courses = await CourseService.getCourses();
    },
    async showPosts(id) {
      this.filteredPosts = this.posts.filter(post => (post.courseID === id));
    },
    // redundant
    showPost(post, deleteCourseID) {
      let newPost = document.createElement('div');
      //newPost.setAttribute('scope', 'row');
      newPost.classList.add('card', 'mx-auto', 'p-3', 'my-2');

      // post title
      let postTitle = document.createElement('div');
      postTitle.classList.add('card-title', 'h2', 'post-title', 'd-flex', 'justify-content-between', 'align-items-center', 'px-3');
      postTitle.appendChild(document.createTextNode(`${this.getCourseName(deleteCourseID)}: ${post.title} - ${post.dueDate} at ${post.dueTime}`));
      // Delete Post Button (part of post title)
      let deletePostButton = document.createElement('button');
      deletePostButton.classList.add('btn', 'btn-danger');
      console.log(deletePostButton.attributes);
      deletePostButton.setAttribute('onclick', `deletePost(${post._id}, ${deleteCourseID})`);
      deletePostButton.appendChild(document.createTextNode('Delete Post'));
      postTitle.appendChild(deletePostButton);

      newPost.appendChild(postTitle);

      // line break
      let hr = document.createElement('hr');
      newPost.appendChild(hr);

      // post body
      let postBody = document.createElement('div');
      postBody.classList.add('card-body', 'text-start');
      postBody.appendChild(document.createTextNode(`${post.body} - created at: ${post.createdAt.toString().substring(0, 24)}`));
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
      title.classList.add('h1', 'mt-3');
      title.appendChild(document.createTextNode(`Posts for ${courseName}`));
      document.querySelector('#post-header').appendChild(title);

      let addPostsButton = document.createElement('a');
      addPostsButton.setAttribute('type', 'button');
      addPostsButton.classList.add('btn', 'btn-primary', 'link');
      addPostsButton.setAttribute('href', '/addposts');
      addPostsButton.appendChild(document.createTextNode('Add Posts'));
      document.querySelector('#post-header').appendChild(addPostsButton);
    },
    async deletePost(id) {
      console.log(id);
      await PostService.deletePost(id);
      this.posts = (await PostService.getPosts()).reverse();
      this.filteredPosts = this.posts;
    }
  },
  async created() {
    this.courses = await CourseService.getCourses();
    this.posts = (await PostService.getPosts()).reverse();
    this.filteredPosts = this.posts;
  }
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
