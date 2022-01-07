<template>
  <div class="home">
    <AddCourse @add-course="addCourse"/>
    <Courses
      @delete-course="deleteCourse"
      :courses="courses"
    />
  </div>
</template>

<script>
import AddCourse from '@/components/AddCourse.vue'
import Courses from '@/components/Courses.vue'

import PostService from '@/PostService.js'

export default {
  name: 'Home',
  components: {
    AddCourse,
    Courses,
  },
  data() {
    return {
      courses: [],
    }
  },
  methods: {
    async addCourse(course) {
      await PostService.insertPost(course.text)
      this.courses = await PostService.getPosts();
    },
    async deleteCourse(id) {
      await PostService.deletePost(id);
      this.courses = await PostService.getPosts();
    }
  },
  async created() {
    this.courses = await PostService.getPosts();
  }
}
</script>
