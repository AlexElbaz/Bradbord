<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <a href="#">
          <img class="logo ms-2" src="../assets/toucan.png" width="85px" height="78px"/>
        </a>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="active icon" aria-current="page" href="#"><i class="bi bi-calendar2-week-fill"></i></a>
            </li>
            <li class="nav-item">
              <a class="active icon" href="#"><i class="bi bi-gear-fill"></i></a>
            </li>
            <li class="nav-item">
              <a class="active icon" href="#"><i class="bi bi-plus-circle-fill"></i></a>
            </li>
            <li class="nav-item">
              <a class="active icon" href="#" ><i class="bi bi-arrow-right-square-fill"></i></a>
            </li>
          </ul>
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
  position: relative;
}

.icon {
    padding-top: none;
    padding-bottom: none;
    padding-left: 1em;
    padding-right: 1em;
    font-size: 20px;
    color: #fff;
}

i{
   text-shadow: 2px 3px 8px #555;
}

.logo {
  position: absolute;
  top: -46px;
  left: 15px;
}
</style>
