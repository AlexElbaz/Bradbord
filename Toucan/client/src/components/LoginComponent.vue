<template>
<div>
  <div class="container in" id="idk">
    <div class="row justify-content-center mb-5">
      <img class="logo" src="../assets/toucan.png" />
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <h2 class="title mb-5"><strong> Login to Toucan! </strong></h2>
            <form action="#" class="sign_in">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  required=""
                />
              </div>
              <div class="form-group" style="position: relative">
                <input
                  id="password"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  required=""
                />
                <span
                  id="icon"
                  v-on:click="togglePassword"
                  class="bi bi-eye-slash"
                ></span>
              </div>
              <div class="form-group">
                <button
                  type="submit"
                  class="form-control btn btn-primary submit px-3"
                >
                  Sign In
                </button>
              </div>
            </form>
            <a class="create-account" v-on:click="toggleCreateAccount" href="#"> Create an Account </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container d-none in" id="create">
    <div class="row justify-content-center mb-5">
      <img class="logo" src="../assets/toucan.png" />
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <h2 class="title mb-5"><strong> Create an Account!</strong></h2>
            <form action="#" class="sign_in">
            <div class="row">
              <div class="col form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                  required=""
                />
              </div>
              <div class="col form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                  required=""
                />
              </div>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  required=""
                />
                </div>
              <div class="form-group" style="position: relative">
                <input
                  id="password2"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  required=""
                />
                <span
                  id="icon2"
                  v-on:click="togglePassword2"
                  class="bi bi-eye-slash"
                ></span>
              </div>
              <div class="form-group">
                <button
                  type="submit"
                  class="form-control btn btn-primary submit px-3"
                >
                    Create Account
                </button>
              </div>
            </form>
            <a class="login-page" v-on:click="toggleLoginPage" href="#"> Login Page </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
    />
</div>
</template>

<script>
export default {
  name: "LoginComponent",
  methods: {
    togglePassword() {

      const password = document.querySelector("#password");
      const icon = document.querySelector("#icon");

      // toggle the type attribute
      const type = password.getAttribute("type") === "password" ? "text" : "password";
      password.setAttribute("type", type);

      // toggle the icon
      icon.classList.toggle("bi-eye");
    },
    togglePassword2(){
        const password = document.querySelector("#password2");
      const icon = document.querySelector("#icon2");

      // toggle the type attribute
      const type = password.getAttribute("type") === "password" ? "text" : "password";
      password.setAttribute("type", type);

      // toggle the icon
      icon.classList.toggle("bi-eye");
    },
    toggleCreateAccount(){
        let element = document.getElementById("idk");
        element.classList.remove("in");
        element.classList.add("out");


        setTimeout(function(){
            element.classList.add("d-none");

            let element2 = document.getElementById("create");
            element2.classList.remove("d-none");
            element2.classList.add("in");
        } , 900);
    },
     toggleLoginPage(){
        let element = document.getElementById("create");
        element.classList.remove("in");
        element.classList.add("out");

        setTimeout(function(){
            element.classList.add("d-none");

            let element2 = document.getElementById("idk");
            element2.classList.remove("d-none");
            element2.classList.add("in");
        } , 900);
    },
  },
};
</script>

<style scoped>

 #idk.out, #create.out{
  animation: fadeOutAnimation 1s;
  animation-timing-function: cubic-bezier(0.1, 1, 0.1);
} 


@keyframes fadeOutAnimation {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

#idk.in, #create.in {
  animation: fadeInAnimation 2s, slideInAnimation 2s;
  animation-timing-function: cubic-bezier(0.1, 1, 0.1);
}

@keyframes fadeInAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInAnimation {
  from {
    margin-top: 10%;
  }
  to {
    margin-top: 4.25%;
  }
}


.create-account, .login-page{
    color: white;
    text-decoration: underline;
}

.card {
  background: rgba(50, 50, 50, 0.25);
  border-style: none;
  border-radius: 40px;
}

h2.title {
  color: white;
}

img.logo {
  height: 178px;
  width: 216px;
}

.form-group {
  margin-bottom: 2rem;
}

.form-control {
  border: 1px solid transparent;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.2);
}

.form-control:hover {
  border: white 1px solid;
  background: rgba(0, 0, 0, 0.2);
}

input {
  color: white;
}

input:focus {
  color: white;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}

button {
  background: rgb(1, 81, 52) !important;
}

#icon, #icon2 {
  color: white;
  position: absolute;
  top: 20%;
  right: 15px;
}

.container {
  padding-top: 1.5em;
}
</style>
