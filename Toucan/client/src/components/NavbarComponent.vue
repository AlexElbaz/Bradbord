<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark">
      <div class="container">
        <a href="/">
          <img class="logo ms-2" src="../assets/toucan.png" width="85px" height="78px"/>
        </a>
         <button 
            class="navbar-toggler push-left" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navmenu"
        >
            <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse justify-content-md-center" id="navmenu">
          <ul class="navbar-nav">
            <li class="nav-item">
              <div id="invis"></div>
              <a class="active icon" href="/"><i class="bi bi-house-fill"></i></a>
              <a class="active icon" href="/calendar"><i class="bi bi-calendar2-week-fill"></i></a>
              <a class="active icon" href="#"><i class="bi bi-gear-fill"></i></a>
              <a class="active icon" href="#"><i class="bi bi-plus-circle-fill"></i></a>
              <a class="active icon" href="#" ><i class="bi bi-arrow-right-square-fill"></i></a>
            </li>
          </ul>
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

.icon:hover{
    font-size: 25px;
}

.logo {
  position: absolute;
  top: -46px;
  left: 15px;
  
  filter: drop-shadow(2px 2px 8px #AAA);
}

[aria-current] {
    color: #DDD;
    pointer-events: none;
  }

</style>
