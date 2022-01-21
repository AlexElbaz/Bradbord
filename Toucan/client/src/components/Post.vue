<template>
<div>
    <div class="card p- my-2">
        <div class="card-body">
            <div class="d-flex">
            <h3 class="card-title mx-auto fw-bolder">{{post.title}}</h3>
            <div v-if="canEdit">
                <button class="btn btn-close text-right" 
              data-bs-toggle="modal" 
              :data-bs-target="'#'+post.modalID"
              ></button>
            </div>
            </div>
            <p class="">{{post.dueDate}} at {{post.dueTime}}</p>
            <div class=" text-start">
            <hr>
            {{ post.body }} 
            <hr>
            <p class="fst-italic"> date: {{ post.createdAt.toString().substring(0, 10) }} at {{ post.createdAt.toString().substring(11, 16) }}</p>
            </div>
        </div>
       
    </div>
    <div class="container">
    <!-- Modal -->
    <div
      class="modal fade"
      :id="post.modalID"
      tabindex="-1"
      :aria-labelledby="post.modalID"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <img class="logo" src='../assets/toucan.png'>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title ms-auto" id="exampleModalLabel">Are You Sure You Want to Delete This Post?</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-footer mx-auto">
            <button v-on:click="$emit('delete-post', post._id)" type="button" data-bs-dismiss="modal" class="btn yes">Yes</button>
        </div>
          </div>
      </div>
    </div>
  </div>
</div>   
</template>

<script>
export default {
    name: 'Post',
    props: {
        post: Object,
        canEdit: Boolean,
    },
}
</script>

<style scoped>

.yes{
    color: white;
    background: rgb(1, 141, 90);
    transition: font-size 0.3s;
    transition-timing-function: cubic-bezier(0.1, 1, 0.1);
}


.yes:hover{
    color: white;
    font-size: 20px;
}

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

.modal-content{
    background: #f3ffed;
    border-radius: 30px;
}

</style>