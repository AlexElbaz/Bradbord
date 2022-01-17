<template>
  <div class="container">
    <!-- Modal -->
    <div
      class="modal fade"
      id="modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <img class="logo" src='../assets/toucan.png'>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title ms-auto" id="exampleModalLabel">Add a New Class!</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-2">
                <label for="name" class="col-form-label">
                  Name of Class:
                </label>
                <input type="text" class="form-control" id="name" v-model="name"/>
              </div>
              <div class="mb-2">
                <label for="code" class="col-form-label">Course Code:</label>
                <input type="text" class="form-control" id="code" v-model="courseCode"/>
              </div>
              <div class="mb-2">
                <label for="members" class="col-form-label">Add Members:</label>
                <input type="text" class="form-control" id="members" v-model="members"/>
              </div>
              <div class="mb-2">
                <label for="time" class="col-form-label">Class Time:</label>
                <input type="text" class="form-control" id="time" v-model="time"/>
              </div>
              <div class="mb-2">
                <label for="img" class="col-form-label">Add Image:</label>
                <input type="text" class="form-control" id="img" v-model="img"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button v-on:click="addCourse" type="button" class="btn btn-primary">Save changes</button>
        </div>
          </div>
      </div>
    </div>
  </div>
</template>

<!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> -->

<!-- Modal -->


<script>
export default {
  name: "AddCourse",
  data() {
    return {
      name: "",
      courseCode: "",
      teacher: "",
      members: "",
      time: "",
      img: ""
    };
  },
  methods: {
    addCourse() {
      //this.name = document.querySelector("#name").value;
      console.log(this.name);
      const newCourse = {
        name: this.name,
        courseCode: this.courseCode,
        teacher: this.teacher,
        members: this.members,
        time: this.time,
        img: this.img
        //posts: ["post1", "post2",], // change this back to empty array after testing
      };

      this.$emit("add-course", newCourse);

      this.name = "";
      this.courseCode = "";
      this.teacher = "";
      this.members = "";
      this.time = "";
      this.img = "";
      //this.posts = [];
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
