<template>
    <div class="container">
        <div class="card">
            <ul>
                <li :key="member.key" v-for="member in members">
                    <h5>{{ member }}</h5>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "Members",
    props: {
        members: [],
    }
}
</script>

<style scoped>

ul {
    list-style-type: none;
    padding: 0;
    padding-top: 20px;
}

li {
    padding: 2;
}

button{
   color: white;
   background: rgb(1, 81, 52);
   font-size: 20px;
   transition: 0.3s;
}

button:hover{
    color: white;
    font-size: 25px;
}

.card{
   background: rgba(243, 255, 237, 0.25);
   border-radius: 20px;
   border: none;
}

input, textarea, select{
  border-radius: 15px;
  border: none;
  background: rgba(255, 255, 255, 0.8);
}

input:hover, textarea:hover, select:hover{
  border: white 1px solid;
  background: rgba(200, 200, 200, 0.8)
}

</style>