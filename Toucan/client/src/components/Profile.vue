<template>
  <div>
    <div class="container">
      <NavbarComponent />
      <div class="row justify-content-center">
      <div class="col-md-6">
      <div class="card mt-3 justify-content-center">
         <img class="mt-3 logo mx-auto" src="../assets/toucan.png"/>
      <header class="jumbotron mt-3">
        <h3>
          <strong>{{ currentUser.username +"'s  Profile" }}</strong> 
        </h3>
      </header>
      <p> Here is your information: </p>
      <p>
        <strong>Email:</strong>
        {{ currentUser.email }}
      </p>
      <strong>Authorities:</strong>
        <p class="mt-3" v-for="role in currentUser.roles" :key="role">{{ role }}</p>
        </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";

export default {
  name: "Profile",
  components: {
    NavbarComponent,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.card{
  background: #f3ffed;
  border-radius: 20px;
}

.logo{
  width: 120px;
}
</style>