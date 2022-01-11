<template>
  <div class="container">
    <div class="row justify-content-center mb-5">
        <img class="logo" src='../assets/toucan.png'>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
            <h2 class="title mb-5"><strong> Login to Toucan! </strong></h2>
            <form action="#" class="sign_in">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Username" required="">
                </div>
                <div class="form-group" style="position: relative">
                    <input id="password" type="password" class="form-control" placeholder="Password" required="">
                    <span id="icon" v-on:click="togglePassword" class="bi bi-eye-slash"></span>
                </div>
                <div class="form-group">
                    <button type="submit" class="form-control btn btn-primary submit px-3">Sign In</button>
                </div>
            </form>
        </div>
    </div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
  </div>
</template>

<script>

export default {
  name: 'LoginComponent',
  methods: {
      togglePassword(){
        console.log("Hello");

        const password = document.querySelector("#password");
        const icon = document.querySelector("#icon");

        // toggle the type attribute
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
            
        // toggle the icon
        icon.classList.toggle("bi-eye");
      }
  }
}
</script>

<style scoped>

h2.title{
    color: white;
}

img.logo{
    height: 20%;
    width: 20%;
}

.form-group {
  margin-bottom: 2rem;
}

.form-control{
    border: 1px solid transparent;
    border-radius: 40px;
    background: rgba(255,255,255,0.2);
}

.form-control:hover{
    border: white 1px solid;
    background: rgba(0, 0, 0, 0.2);
}

input{
    color: white;
}

 input:focus{
    color: white;
} 

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}

button{
    background: rgb(1,81,52)!important;
}

#icon{
    color: white;
    position: absolute;
    top: 20%;
    right: 15px;
}

.container{
    padding-top: 1.5em;
} 


.container {
    animation: fadeInAnimation 2s, slideInAnimation 2s;
    animation-timing-function: cubic-bezier(0.1, 1, 0.1);
    animation-iteration-count: 1;
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
    from{
        margin-top: 20%;
    }
    to{
        margin-top: 4%;
    }
}

</style>
