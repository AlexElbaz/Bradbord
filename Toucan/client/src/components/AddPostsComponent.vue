<template>
  <div class="card p-4">
    <h4 class="fw-bolder"> Add a New Post! </h4>
    <form class="g-3">
      <label for="" class="form-label my-2">Title:</label>
      <input
        type="text"
        class="form-control"
        id="postTitle"
        placeholder="Post title"
        v-model="title"
      />
      <label for="" class="form-label my-2">Text:</label>
      <textarea
        type="text"
        class="form-control"
        id="postBody"
        placeholder="Post body"
        v-model="body"
      ></textarea>
      <label for="" class="form-label my-2">Type:</label>
      <select class="form-select" id="postType" v-model="type">
        <option>Please select one</option>
        <option>Test</option>
        <option>Assignment</option>
        <option>Homework</option>
        <option>Announcement</option>
      </select>
      <label for="" class="form-label my-2">Due Date (OPTIONAL):</label>
      <input
        type="date"
        class="form-control"
        id="postDueDate"
        v-model="dueDate"
      />
      <label for="" class="form-label my-2">Due Time (OPTIONAL):</label>
      <input
        type="time"
        class="form-control"
        id="postDueTime"
        v-model="dueTime"
      />
      <button type="button" class="btn btn-lg me-1 mt-3" @click="addPost()">
        Add Post
      </button>
      <div class="row justify-content-center mt-3">
        <p class="col-12 text-center lead" id="msg"></p>
      </div>
    </form>
  </div>
</template>

<script>
import CourseService from "../CourseService";
import PostService from "../PostService";

export default {
  name: "PostComponent",
  props: {
    course: "",
  },
  data() {
    return {
      courses: [],
      error: "",
      title: "",
      body: "",
      type: "",
      courseID: this.$props.course,
      dueDate: Date,
      dueTime: "",
      modalID: "",
    };
  },
  async mounted() {
    try {
      this.courses = await CourseService.getCourses();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async addPost() {
      if (
        this.title == "" ||
        this.body == "" ||
        this.type == "Please select one" ||
        document.querySelector("#postCourse") == "Please select one"
      ) {
        document.querySelector("#msg").classList.add("text-danger");
        document.querySelector("#msg").innerHTML =
          "Must fill all input fields.";
        setTimeout(() => {
          document.querySelector("#msg").innerHTML = "";
          document.querySelector("#msg").classList.remove("text-danger");
        }, 3000);
      } else {
        this.modalID = this.makeID(6);
        console.log(this.modalID);

        await PostService.insertPost(
          this.title,
          this.body,
          this.type,
          this.courseID,
          this.dueDate,
          this.dueTime,
          this.modalID
        );

        document.querySelector("#msg").classList.add("text-success");
        document.querySelector("#msg").innerHTML = `Post Added`;
        setTimeout(() => {
          document.querySelector("#msg").innerHTML = "";
          document.querySelector("#msg").classList.remove("text-success");
        }, 1000);

        this.$emit("re-render-posts", this.courseID);

        document.querySelector("#postTitle").value = "";
        document.querySelector("#postBody").value = "";
        document.querySelector("#postType").value = "Please select one";
      }
    },
    makeID(length) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
};
</script>

<style scoped>

button{
   color: white;
   background: rgb(1, 81, 52);
   font-size: 20px;
   transition: 0.3s;
}

button:hover{
    color: white;
    font-size: 25px;
}

.card{
   background: rgba(243, 255, 237, 0.25);
   border-radius: 20px;
   border: none;
}

input, textarea, select{
  border-radius: 15px;
  border: none;
  background: rgba(255, 255, 255, 0.8);
}

input:hover, textarea:hover, select:hover{
  border: white 1px solid;
  background: rgba(200, 200, 200, 0.8)
}

</style>
