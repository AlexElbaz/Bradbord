<template>
    <div @dblclick="$emit('delete-course', course._id)"
     @click="this.$emit('show-posts', this.course._id); selectCourse();"
     class="card mb-3 text-white">
        <div class="row">
                <div class="col-lg-3 my-auto">
                    <img :src="course.img"> 
                </div>
            <div class="col p-0">
        <div class="card-title p-0 m-0">
            <h5>{{ course.name }}</h5>
        </div>
        <div class="card-body p-0">
            <p class="mb-0">{{course.courseCode}}</p>
            <p class="d-inline mx-1">{{ course.teacher }}</p>
            <p class="d-inline mx-1">{{ course.time }}</p>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'Course',
    props: {
        course: Object,
    },
    data() {
    return {
      
    };
    },
    methods: {
        selectCourse(){
            console.log("hello");

            document.getElementById(this.course._id).classList.add("selected");

            let current = document.getElementById(this.course._id);
            let next = current.nextElementSibling;
            let isLater = false;

            while(next){
                
                console.log("bye");
                if(next.classList.contains("selected"))
                    isLater = true;
                
                next = next.nextElementSibling;
            }

            if(isLater){
                document.getElementsByClassName('selected')[1].classList.remove('selected');
            } else {
                document.getElementsByClassName('selected')[0].classList.remove('selected');
            }

            
        }
    },
    mounted(){
        document.querySelector(".course-holder").classList.add("selected");
    }
}
</script>

<style scoped>

.card{
    background: rgba(100, 100, 100, 0.5);
    border-radius: 30px;
    border-style: none;
}

.card:hover{
    border: white 1px solid;
    background: rgba(0, 0, 0, 0.2);
}

.selected{
    border: white 1px solid;
    background: rgba(0, 0, 0, 0.2);
}

img{
    width: 60px;
    height: 60px;
    border-radius: 50px;
    margin-left: 10px;
}

</style>