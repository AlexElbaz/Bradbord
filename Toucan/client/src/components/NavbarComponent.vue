<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark">
      <div class="container">
        <a href="#">
          <img
            class="logo ms-2"
            src="../assets/toucan.png"
          />
        </a>
        <button
          class="navbar-toggler push-left"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-md-center"
          id="navmenu"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <div  v-if="currentUser" class="d-inline-block"> 
              <router-link
                to="/calendar"
                class="active icon d-inline-block"
                ><i class="bi bi-calendar2-week-fill"></i
              ></router-link>
              </div>
               <div v-if="showAdminBoard" class="d-inline-block"> 
              <router-link  to="/admin" class="active icon d-inline-block"
                ><i class="bi bi-house-fill"></i></router-link
              >
              </div>
               <div v-if="showModeratorBoard" class="d-inline-block"> 
              <router-link to="/mod" class="active icon d-inline-block"
                ><i class="bi bi-house-fill"></i></router-link
              >
              </div>
               <div v-if="currentUser" class="d-inline-block"> 
              <router-link to="/user" class="active icon d-inline-block"
                ><i class="bi bi-house-fill"></i></router-link
              >
              </div>
               <div  v-if="currentUser" class="d-inline-block"> 
              <a class="nav-link active icon d-inline-block" @click.prevent="logOut">
                <i class="bi bi-box-arrow-in-right"></i>
              </a>
              </div>
              </li>
                </ul>
              <router-link to="/profile" id="profile" class=" active icon">
                <font-awesome-icon icon="user" class="me-1" />
                {{ currentUser.username }}
              </router-link>
        </div>
      </div>
    </nav>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
    />
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
  mounted() {
    console.log(window.location.pathname);
    if (window.location.pathname == "/") {
      //document.getElementById("home").classList.add("unactivated");
    } else if (window.location.pathname == "/calendar") {
      //document.getElementById("calendar").classList.add("unactivated");
    }
  },
  computed: {
    // everything here just uses vuex so technically we could put this all in navbarcomponent if we want, but then we need a way to go to /register in the login page
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_MODERATOR");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.navbar {
  background: #4ba243;
  border-radius: 40px;
  margin-top: 50px;
  padding-bottom: 5px;
  position: relative;
}

.icon {
  padding-left: 1em;
  padding-right: 1em;
  font-size: 20px;
  color: #fff;
  transition: 0.3s;
  text-shadow: 2px 2px 8px #555;
}

.icon:hover {
  font-size: 25px;
}

.logo {
  position: absolute;
  top: -46px;
  left: 15px;
  width: 85px;
  height: 78px;

  filter: drop-shadow(2px 2px 8px #aaa);
}

.unactivated {
  color: #ddd;
  pointer-events: none;
}

@media (max-width: 768px) {
  li {
    margin-top: 1em;
  }
}

#profile{
  text-decoration: none;
}
</style>
