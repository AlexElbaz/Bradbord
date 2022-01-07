<template>
    <div>
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