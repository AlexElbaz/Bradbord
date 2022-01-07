<template>
<div>
    <div :key="course.id" v-for="course in courses">
        <Course
            :course="course"
        />
    </div>
</div>
</template>

<script>
import Course from './Course.vue'

export default {
    name: "Courses",
    props: {
        courses: []
    },
    components: {
        Course
    }
    
}
</script>