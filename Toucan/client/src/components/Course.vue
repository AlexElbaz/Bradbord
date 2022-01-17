<template>
    <div @dblclick="$emit('delete-course', course._id)" @click="$emit('show-posts', course._id)" class="card mb-3 text-white">
        <div class="card-title p-0 m-0">
            <h4>{{ course.name }}</h4>
        </div>
        <div class="card-body p-0">
            <h6 class="">{{course.courseCode}}</h6>
            <h6 class="d-inline mx-1">{{ course.teacher }}</h6>
            <h6 class="d-inline mx-1">{{ course.time }}</h6>
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

<style scoped>

.card{
    background: rgba(100, 100, 100, 0.5);
    border-radius: 30px;
    border-style: none;
}

</style>