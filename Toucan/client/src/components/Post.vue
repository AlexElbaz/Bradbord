<template>
    <div class="card mx-auto p-3 my-2">
        <div class="card-title h2 post-title d-flex justify-content-between align-items-center px-3">
            {{post.title}} - {{post.dueDate}} at {{post.dueTime}}
            <button class="btn btn-danger" @click="$emit('delete-post', post._id)">Delete Post</button>
        </div>
        <hr>
        <div class="card-body text-start">
            {{ post.body }} - created at: {{ post.createdAt.toString().substring(0, 24) }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Post',
    props: {
        post: Object,
    },
}
</script>

<style scoped>

</style>