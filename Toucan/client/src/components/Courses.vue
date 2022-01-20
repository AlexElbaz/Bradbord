<template>
<div>
<div>
    <nav class="navbar navbar-dark mt-3">
      <div class="container justify-content-md-center">
        <h4 class="d-inline mx-2 mb-0 text-white">Courses</h4>
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
            <div class="card btn-course text-light mt-3" id="feed" @click="$emit('show-all-posts'); selectFeed()">
                <h5 class="card-title">Feed</h5>
            </div>
            <ul class="navbar-nav mt-3">
            
                <div :key="course._id" v-for="course in courses" :id="course._id" class="course-holder">
                    <li class="nav-item">
                        <Course
                        @delete-course="$emit('delete-course', course._id)"
                        @show-posts="$emit('show-posts', course._id)"
                        :course="course"
                        :canEdit="canEdit"
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
        courses: [],
        canEdit: Boolean,
    },
    components: {
        Course,
        AddCourse
    },
    methods: {
      selectFeed(){
        let elements = document.getElementsByClassName("selected");
        for (let i = 0; i < elements.length; i++) {
            document.getElementsByClassName("selected")[i].classList.remove("selected");
        }

        document.getElementById("feed").classList.add("selected");
      },
    },
    emits: ['delete-course', 'show-posts', 'show-all-posts']
    
}
</script>

<style scoped>
.btn-course{
    background: rgba(100, 100, 100, 0.5);
    border-radius: 30px;
}

.btn-course:hover{
    border: white 1px solid;
    background: rgba(0, 0, 0, 0.2);
}

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
    font-size: 20px;
    transition: 0.3s;
}

i:hover{
    font-size: 25px;
}

.card{
    background: rgba(100, 100, 100, 0.5);
    border-radius: 30px;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
}

.card:hover{
    border: white 1px solid;
    background: rgba(0, 0, 0, 0.2);
}

</style>