<template>
    <div @dblclick="$emit('delete-course', course._id)" @click="$emit('show-posts', course._id)" class="card mb-3 p-3">
        <div class="card-title">
            <h1>{{ course.name }} {{course.courseCode}}</h1>
        </div>
        <div class="card-body p-0">
            <h3>{{ course.teacher }}</h3>
            <h5>{{ course.time }}</h5>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Course',
    props: {
        course: Object,
    },
}
</script>