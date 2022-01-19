<template>
<div>
    <div class="card p- my-2">
        <div class="card-body">
            <div class="d-flex">
            <h3 class="card-title mx-auto fw-bolder">{{post.title}}</h3>
            <button class="btn btn-close text-right" 
            @click="$emit('delete-post', post._id)"></button>
            </div>
            <p class="">{{post.dueDate}} at {{post.dueTime}}</p>
            <div class=" text-start">
            <hr>
            {{ post.body }} 
            <hr>
            <p class="fst-italic"> date: {{ post.createdAt.toString().substring(0, 16) }} </p>
            </div>
        </div>
       
        </div>
    </div>
    <!-- Modal -->
    
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

hr{
    border-top: 1px dashed grey;
}

.card{
    border-radius: 20px;
    background: #f3ffed;
    border: 1px solid rgba(100, 100, 100, 0.25)
}

i {
  font-size: 25px;
}

.logo{
  position: absolute;
  width: 45%;
  left: 25%;
  top: 100px;
}

.modal-dialog{
  position: relative;
}

</style>