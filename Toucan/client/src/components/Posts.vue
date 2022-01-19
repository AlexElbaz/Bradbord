<template>
<div>
    <div class="container text-center">
        <div :key="post._id" v-for="post in posts">
            <Post 
            @delete-post="$emit('delete-post', post._id)"
            :post="post"
            />
        </div>
    </div>
</div>
</template>

<script>
import Post from './Post.vue'

export default {
    name: "Courses",
    props: {
        posts: [],
    },
    components: {
        Post,
    },
    emits: []
    
}
</script>

<style scoped>

nav{
    border-radius: 40px;
    background: rgb(1, 128, 81);
    padding: none;
}

i {
    color: white;
    font-size: 30px;
}

</style>