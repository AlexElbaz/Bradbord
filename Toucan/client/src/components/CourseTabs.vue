<template>
  <div class="container">
    <div class="my-3">
      <div v-if="isSelected">
        <button type="button" class="btn btn-success d-none d-md-inline me-2 active" id="postsBtn" @click="showPosts = true; showMembers = false; showDetails = false; showAddPosts = false; changeActive('postsBtn')">Posts</button>
        <button type="button" class="btn btn-success d-none d-md-inline me-2" id="membersBtn" @click="showPosts = false; showMembers = true; showDetails = false; showAddPosts = false; changeActive('membersBtn')">Members</button>
        <button type="button" class="btn btn-success d-none d-md-inline me-2" id="detailsBtn" @click="showPosts = false; showMembers = false; showDetails = true; showAddPosts = false; changeActive('detailsBtn')">Details</button>
        <button type="button" class="btn btn-success d-none d-md-inline" id="addPostsBtn" @click="showPosts = false; showMembers = false; showDetails = false; showAddPosts = true; changeActive('addPostsBtn')">Add Posts</button>
      </div>
    </div>
    <div id="output">
      <div v-if="showPosts">
        <Posts @delete-post="emitDeletePost" :posts="posts"/>
      </div>
      <div v-if="showMembers">
        <Members/>
      </div>
      <div v-if="showDetails">
        <Details/>
      </div>
      <div v-if="showAddPosts">
        <AddPostsComponent :course="course" @re-render-posts="forceRerender"/>
      </div>
    </div>
  </div>
</template>

<script>
import Posts from '@/components/Posts.vue'
import Members from '@/components/Members.vue'
import Details from '@/components/Details.vue'
import AddPostsComponent from '@/components/AddPostsComponent.vue'


export default {
  name: "AddCourse",
  props: {
    posts: [],
    course: '',
    isSelected: Boolean,
  },
  components: {
    Posts,
    Members,
    Details,
    AddPostsComponent
  },
  data() {
    return {
      showPosts: true,
      showMembers: false,
      showDetails: false,
      showAddPosts: false,
      currentTable: 'postsBtn',
    };
  },
  methods: {
    changeActive(newTable) {
      document.querySelector(`#${this.currentTable}`).classList.remove("active");
      document.querySelector(`#${newTable}`).classList.add("active");
      this.currentTable = newTable;
    },
    emitDeletePost(id) {
      this.$emit('delete-post', id);
    },
    forceRerender(id) {
      this.$emit('re-render-posts', id);
    },
  },
};
</script>

<style scoped>

i {
  font-size: 25px;
}

.logo{
  position: absolute;
  width: 45%;
  left: 25%;
  top: -25px;
}

.modal-dialog{
  position: relative;
}

</style>
