<template>
  <div class="container">
    <div class="row">
      <div class="card mt-3">
        <div class="card-body">
          <h3 class="d-inline card-title">Classes</h3>
          <i
            class="d-inline mx-2 bi bi-plus-square-fill"
            data-bs-toggle="modal"
            data-bs-target="#modal"
          ></i>
          <!-- div class="add-course">
          <input type="text" name="courseName" v-model="text" placeholder="Add Course">
          <button v-on:click="addCourse">Add</button>
        </div> -->
        </div>
      </div>
      <hr />
      <div class="courses-container"></div>
    </div>

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
          <div class="modal-body"><p class="lead">Fill out this form to sign up!</p>
            <form>
              <div class="mb-3">
                <label for="name" class="col-form-label">
                  Name of Class:
                </label>
                <input type="text" class="form-control" id="name" v-model="name"/>
              </div>
              <div class="mb-3">
                <label for="code" class="col-form-label">Course Code:</label>
                <input type="text" class="form-control" id="code" v-model="courseCode"/>
              </div>
              <div class="mb-3">
                <label for="teacher" class="col-form-label">Teacher Name:</label>
                <input type="text" class="form-control" id="code" v-model="teacher"/>
              </div>
              <div class="mb-3">
                <label for="members" class="col-form-label">Add Members:</label>
                <input type="text" class="form-control" id="members" v-model="members"/>
              </div>
              <div class="mb-3">
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
        img: this.img
        //posts: ["post1", "post2",], // change this back to empty array after testing
      };

      this.$emit("add-course", newCourse);

      this.name = "";
      this.courseCode = "";
      this.teacher = "";
      this.members = "";
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
/*
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
} */
</style>
