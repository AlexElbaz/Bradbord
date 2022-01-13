<template>
<div class="container card p-4">
  <form class="g-3">
    <div class="row justify-content-center mb-3">
        <div class="col-md-6">
            <label for="" class="form-label">Title:</label>
            <input type="text" class="form-control" id="postTitle" placeholder="Post title">
        </div>
    </div>
    <div class="row justify-content-center mb-3">
        <div class="col-8">
            <label for="" class="form-label">Text:</label>
            <textarea type="text" class="form-control" id="postBody" placeholder="Post body"></textarea>
        </div>
    </div>
    <div class="row justify-content-center mb-3">
        <div class="col-6">
            <label for="" class="form-label">Course:</label>
            <select class="form-select" id="postCourse">
              <option>Please select one</option>
              <option v-for="course in courses" :key="course">{{course.text}}</option> 
            </select>
            
        </div>
        <div class="col-6">
            <label for="" class="form-label">Type:</label>
            <select class="form-select" id="postType">
              <option>Please select one</option>
              <option>Test</option>
              <option>Assignment</option>
              <option>Homework</option>
              <option>Announcement</option>
            </select>
        </div>
    </div>
    <div class="row justify-content-center mb-3">
        <div class="col-12 text-center">
            <button type="button" class="btn btn-lg btn-dark me-1" @click="addPost()">Add Post</button>
        </div>
    </div>
    <div class="row justify-content-center mb-3">
      <p class="col-12 text-center lead" id="msg"></p>
    </div>
  </form>
  </div>
</template>

<script>
import CourseService from '../CourseService';
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      courses: [],
      error: '',
      title: '',
      body: '',
      type: '',
      courseID: ''
    }
  },
  async created() {
    try {
      this.courses = await CourseService.getCourses();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async addPost() {
      if ((document.querySelector('#postTitle').value == '') || (document.querySelector('#postBody').value == '') || (document.querySelector('#postCourse').value == 'Please select one') || (document.querySelector('#postType').value == 'Please select one')) {
        document.querySelector('#msg').classList.add('text-danger');
        document.querySelector('#msg').innerHTML = 'Must fill all input fields.';
        setTimeout(() => {document.querySelector('#msg').innerHTML = ''; document.querySelector('#msg').classList.remove('text-danger');}, 3000);
      } else {
        this.title = document.querySelector('#postTitle').value;
        this.body = document.querySelector('#postBody').value;
        this.type = document.querySelector('#postType').value;
        this.courseID = this.findCourseID(); // the problem is here, courseID in the posts are null

        await PostService.insertPost(this.title, this.body, this.type, this.courseID);

        document.querySelector('#postTitle').value = '';
        document.querySelector('#postBody').value = '';
        document.querySelector('#postType').value = '';

        document.querySelector('#msg').classList.add('text-success');
        document.querySelector('#msg').innerHTML = `Post Added to ${document.querySelector('#postCourse').value}`;
        setTimeout(() => {document.querySelector('#msg').innerHTML = ''; document.querySelector('#msg').classList.remove('text-success');}, 3000);       
      }
    },
    findCourseID() {
      this.courses.forEach((course) => {
        if (document.querySelector('#postCourse').value === course.text)
          return course._id;
      })
    }
  }
}
</script>

<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}
 
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding:  10px;
  margin-bottom: 15px;
}
 
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color:  #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
 
div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
 
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
