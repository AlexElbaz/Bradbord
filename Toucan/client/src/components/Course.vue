<template>
    <div @dblclick="$emit('delete-course', course._id)" @click="$emit('show-posts', course._id)" class="card mb-3 text-white">
        <div class="row">
            <div class="col-lg-3">
                <img class="mt-2" :src="course.img"> 
            </div>
            <div class="col p-0">
        <div class="card-title p-0 m-0">
            <h5>{{ course.name }}</h5>
        </div>
        <div class="card-body p-0">
            <p class="mb-0">{{course.courseCode}}</p>
            <p class="d-inline mx-1">{{ course.teacher }}</p>
            <p class="d-inline mx-1">{{ course.time }}</p>
        </div>
        </div>
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

img{
    width: 60px;
    height: 60px;
    border-radius: 50px;
    margin-left: 10px;
}

</style>