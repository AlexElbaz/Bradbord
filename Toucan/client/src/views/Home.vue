<template>
  <div class="home">
    <AddCourse @add-course="addCourse"/>
    <Courses
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
      console.log(course);
      await PostService.insertPost(course)
      this.courses = await PostService.getPosts();
    },
  },
  async created() {
    this.courses = await PostService.getPosts();
  }
}
</script>
