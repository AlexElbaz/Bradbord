<template>
  <div class="container">
    <div class="row">
        <h1>Classes</h1>
        <div class="add-course">
          <input type="text" name="courseName" v-model="text" placeholder="Add Course">
          <button v-on:click="addCourse">Add</button>
        </div>
        <hr>
        <div class="courses-container">
          
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddCourse',
  data() {
    return {
      text: '',
    }
  },
  methods: {
    addCourse() {
        if (!this.text) {
            alert('Please add a task')
            return
        }
        
        const newCourse = {
          text: this.text,
        }

        this.$emit('add-course', newCourse);

        this.text = '';
    },
  }
}
</script>

<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}
 
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding:  10px;
  margin-bottom: 15px;
}
 
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color:  #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
 
div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
 
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
