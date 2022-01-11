<template>
    <div @dblclick="$emit('delete-course', course._id)" @click="$emit('show-posts', course._id)">
        <h1>{{ course.text }}</h1>
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