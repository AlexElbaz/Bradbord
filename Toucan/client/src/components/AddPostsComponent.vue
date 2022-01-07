<template>
<div class="container card p-4">
  <h2 class="title text-center mb-4">{{title}}</h2>
  <form class="g-3">
    <div class="row justify-content-center mb-3">
        <div class="col-md-6">
            <label for="" class="form-label">Title:</label>
            <input type="text" class="form-control" id="postTitle" placeholder="Post title">
        </div>
    </div>
    <div class="row justify-content-center mb-3">
        <div class="col-8">
            <label for="" class="form-label">Text:</label>
            <textarea type="text" class="form-control" id="postBody" placeholder="Post body"></textarea>
        </div>
    </div>
    <div class="row justify-content-center mb-3">
        <div class="col-6">
            <label for="" class="form-label">Location:</label>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="postLocation" data-bs-toggle="dropdown" aria-expanded="false">
                Pick a class to post to
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuClickableInside">
                <!-- <div v-for="hi in hello" :key="hi"> <!- FIX WITH ACTUAL ITEMS FROM GET REQUEST -->
                  <li>Hello</li> <!-- Have to make a get request to the class list for that account and then determine list of items from there -->
                <!-- </div> -->
              </ul>
            </div>
        </div>
        <div class="col-6">
            <label for="" class="form-label">Type:</label>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Separated link</a></li>
            </ul>
        </div>
    </div>
    <div class="row justify-content-center mb-3">
        <div class="col-12 text-center">
            <button type="button" class="btn btn-lg btn-dark me-1" @click="addPost()">Add Post</button>
            <!-- ^^ MAKE THE LOCATION FOR THE @click RIGHT!!!!!!!!!!!!! -->
        </div>
    </div>
  </form>
  <p class="lead text-center mt-3" id="msg"></p>
  </div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      title: '',
      body: '',
      type: '',
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.title, this.body, this.type);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    async addClass() {
      console.log("test");
    }
  }
}
</script>

<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}
 
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding:  10px;
  margin-bottom: 15px;
}
 
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color:  #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
 
div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
 
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
