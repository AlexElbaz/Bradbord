<template>
  <div id="login">
    <LoginComponent /> 
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue'

export default {
  name: 'Login',
  components: {
    LoginComponent
  }
}
</script>

<style>

body:before {
  content: '';
  z-index: -1;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(../assets/loginbg.png) no-repeat;
  background-size: cover;
}

</style>
