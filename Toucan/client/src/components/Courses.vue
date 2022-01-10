<template>
<div>
    <div :key="course._id" v-for="course in courses">
        <Course
            @delete-course="$emit('delete-course', course._id)"
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
    },
    emits: ['delete-course',]
    
}
</script>