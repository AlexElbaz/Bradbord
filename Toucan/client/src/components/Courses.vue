<template>
<div>
<div>
    <nav class="navbar navbar-dark mt-3">
      <div class="container justify-content-md-center">
        <h3 class="d-inline mx-3 mb-0 text-white">Courses</h3>
         <button 
            class="navbar-toggler push-left" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#classList"
        >
         <span><i class="bi bi-list-ul"></i></span>
         </button>
         <i
            class="d-inline mx-2 bi bi-plus-square-fill"
            data-bs-toggle="modal"
            data-bs-target="#modal"
        ></i>
         <div class="collapse show navbar-collapse justify-content-md-center" id="classList">
          <ul class="navbar-nav mt-3">
            
                <div :key="course._id" v-for="course in courses" :id="course._id" class="course-holder">
                    <li class="nav-item">
                     <Course
                     @delete-course="$emit('delete-course', course._id)"
                    @show-posts="$emit('show-posts', course._id)"
                    :course="course"
                 />
                 </li>
            </div>
          </ul>
        </div>
    </div>
    </nav>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
    />

</div>
<AddCourse/>
</div>
</template>

<script>
import Course from './Course.vue'
import AddCourse from './AddCourse.vue'

export default {
    name: "Courses",
    props: {
        courses: []
    },
    components: {
        Course,
        AddCourse
    },
    methods: {
      
    },
    emits: ['delete-course', 'show-posts']
    
}
</script>

<style scoped>

.selected{
    border-top: white 2px solid;
    border-top-color: white;
}

.course-holder{
    border-radius: 30px;
}

nav{
    border-radius: 40px;
    background: rgb(1, 128, 81);
    padding: none;
}

i {
    color: white;
    font-size: 30px;
}

</style>