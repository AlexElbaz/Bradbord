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
            <button @click="addCourse" type="button" class="btn">Save changes</button>
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
      img: "",
      defaultImage: "https://64.media.tumblr.com/1e402d863236d5960410c0c452701173/443dd26d691ed309-8e/s1280x1920/d7cfc0e63b526ff78f329916459aff5a0fafd54f.jpg",
      modalID: "",
    };
  },
  methods: {
    async addCourse() {
      let isValidImage = await this.isImgLink(this.img);

        if(isValidImage){
        this.img = this.img;
        } else {
        this.img = this.defaultImage;
      }

      this.modalID = this.makeID(6);

      const newCourse = {
        name: this.name,
        courseCode: this.courseCode,
        teacher: this.teacher,
        members: this.members,
        time: this.time,
        img: this.img,
        modalID: this.modalID
      }

      console.log(newCourse);


      this.$emit("add-course", newCourse);

      this.name = "";
      this.courseCode = "";
      this.teacher = "";
      this.members = "";
      this.time = "";
      this.img = "";

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


         /* if(this.checkImage(this.img)){
          this.img = this.img;
         } else {
          console.log("Hello");
          this.img = this.defaultImage;
        } */

    

    
      //this.posts = [];
     /*  checkImage(url) {
            let isValidImage;
            var image = new Image();
            image.src = url;
            image.onload = function() {
              
                if (this.width > 0) {
                    console.log(this.width);
                    console.log("true");
                    isValidImage = true;
              } 
            }

            image.onerror = function() {
              console.log("false");
              isValidIamge = false;
            }
           

           return 
        } */

      isImgLink(url){
  if (typeof url !== 'string') {
    return false;
  }
  return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null);
  },

    async checkImage(url){
     
     const res = await fetch(url);
     const buff = await res.blob();
    
     return buff.type.startsWith('image/')

}
  /* async checkImage(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  request.onload = function() {
    status = request.status;
    if (request.status == 200) //if(statusText == OK)
    {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  } 
} */
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

.btn{
    color: white;
    background: rgb(1, 141, 90);
    transition: font-size 0.3s;
    transition-timing-function: cubic-bezier(0.1, 1, 0.1);
}


.btn:hover{
    color: white;
    font-size: 20px;
}

hr{
    border-top: 1px dashed grey;
}

.modal-content{
    background: #f3ffed;
    border-radius: 30px;
}

.form-control {
  border: 1px solid transparent;
  border-radius: 40px;
  background: rgba(200, 200, 200, 0.25);
}

.form-control:hover {
  border: white 1px solid;
  background: rgba(200, 200, 200, 0.8);
}

input {
  color:  black;
}

input:focus {
  color: black;
}


</style>