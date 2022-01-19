<template>
  <div class="text-center section">
    <h2 class="h2">Custom Calendars</h2>
    <p class="text-lg font-medium text-gray-600 mb-6">
      Roll your own calendars using scoped slots
    </p>
    <div class="row">
      <div class="col-2 card">
        <h3>Courses</h3>
        <div :key="course._id" v-for="(course, index) in courses">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheck"
              v-model="coursesChecked[index]"
              @click="isChecked"
            />
            <label class="form-check-label" for="flexCheck">
              {{ course.name }}
            </label>
          </div>
        </div>
        <h3>Type</h3>
        <div :key="index" v-for="(type, index) in postTypes">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheck"
              v-model="typesChecked[index]"
              @click="isChecked"
            />
            <label class="form-check-label" for="flexCheck">
              {{ type }}
            </label>
          </div>
        </div>
      </div>
      <div class="col-10">
        <v-calendar
          class="custom-calendar max-w-full"
          :masks="masks"
          :attributes="attributes"
          disable-page-swipe
          is-expanded
        >
          <template v-slot:day-content="{ day, attributes }">
            <div class="flex flex-col h-full z-10 overflow-hidden">
              <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
              <div class="flex-grow overflow-y-auto overflow-x-auto">
                <p
                  v-for="attr in attributes"
                  :key="attr.key"
                  class="
                    text-xs
                    leading-tight
                    rounded-sm
                    p-1
                    mt-0
                    mb-1
                    bg-primary
                    text-black
                  "
                  :class="attr.customData.class"
                >
                  {{ attr.customData.title }}
                </p>
              </div>
            </div>
          </template>
        </v-calendar>
      </div>
    </div>
  </div>
</template>

<script>
import CourseService from "../CourseService";
import PostService from "../PostService";

export default {
  data() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      masks: {
        weekdays: "WWW",
      },
      attributes: [
        
      ],
      posts: [],
      courses: [],
      //courseChecked: false,
      totalCourses: Number,
      coursesChecked: [],
      postTypes: [],
      typesChecked: []
    };
  },
  methods: {
    async getDatePosts() {
      let datePosts = [];
      this.posts = await PostService.getPosts();
      datePosts = JSON.parse(
        JSON.stringify(
          this.posts.filter(
            (post) => post.dueDate !== null && post.dueDate !== undefined
          )
        )
      );
      /*this.posts.forEach((post) => {
            if (post.type === 'Test') {
                datePosts.push(post);
            }
        })*/
      return datePosts;
    },
    async postsToAttributes() {
      let temp = await this.getDatePosts();
      temp.forEach((post) => {
        let bgColour = "bg-dark";
        if (post.type === "Test") bgColour = "bg-danger";
        else if (post.type === "Assignment") bgColour = "bg-warning";
        else if (post.type === "Homework") bgColour = "bg-primary";
        else if (post.type === "Announcement") bgColour = "bg-success";

        let dueDate = post.dueDate;
        const newAttr = {
          customData: {
            title: `${post.dueTime} ${post.title}`,
            class: `${bgColour} text-white`,
            courseID: post.courseID,
            type: post.type
          },
          dates: new Date(
            parseInt(dueDate.substring(0, 4)),
            parseInt(dueDate.substring(5, 7) - 1),
            parseInt(dueDate.substring(8))
          ),
        };
        console.log(newAttr);
        this.attributes.push(newAttr);
      });
    },
    async filterAttributes() {
      this.attributes = [];
      await this.postsToAttributes();
      let temp = [];
      let allUnchecked = true;
      this.coursesChecked.forEach((courseChecked) => {
        if (courseChecked !== null && courseChecked !== false) {
          console.log(courseChecked);
          allUnchecked = false;
        }
      })
      console.log(allUnchecked);
      console.log(this.attributes);
      if (!allUnchecked) {
        this.courses.forEach((course, index) => {
          if (this.coursesChecked[index] === true) {
            console.log(this.attributes);
            temp.push.apply(temp, JSON.parse( // for some reason, this.attributes here is blank
              JSON.stringify(
                this.attributes.filter(
                  (attr) => attr.customData.courseID === course._id
                )
              )
            ));
            console.log(this.attributes);
            console.log(temp);
          }
        })
        this.attributes = temp;
        console.log(this.attributes);
      }

      let allTypeUnchecked = true;
      let temp2 = [];
      this.typesChecked.forEach((typeChecked) => {
        if (typeChecked !== null && typeChecked !== false) {
          console.log(typeChecked);
          allTypeUnchecked = false;
        }
      })
      if(!allTypeUnchecked) {
        this.postTypes.forEach((type, index) => {
          if (this.typesChecked[index] === true) {
            console.log(type);
            temp2.push.apply(temp2, JSON.parse(
              JSON.stringify(
                this.attributes.filter(
                  (attr) => attr.customData.type === type
                )
              )
            ));
            console.log(temp2);
          }
        })
        this.attributes = temp2;
      }
    },
    async isChecked() {
      console.log(this.coursesChecked); // for some reason, coursesChecked is always one step behind
      await this.filterAttributes();
    },
    getPostTypes() {
      console.log(this.attributes);
      this.attributes.forEach((attr) => {
        if (!this.postTypes.includes(attr.customData.type)) {
          console.log('test');
          this.postTypes.push(attr.customData.type);
        }
      })
    }
  },
  async created() {
    await this.postsToAttributes();
    this.courses = await CourseService.getCourses();
    this.totalCourses = this.courses.length;
    this.coursesChecked.length = this.courses.length;
    console.log(JSON.parse(JSON.stringify(this.coursesChecked))); 
    this.getPostTypes();
    console.log(this.postTypes);
  },
};
</script>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
}

// .vc-day style here does not apply
.vc-day {
  padding: 0 5px 3px 5px;
  text-align: left;
  height: var(--day-height);
  min-width: var(--day-width);
  background-color: white;
  border: 1px solid black;
}

:deep(.custom-calendar.vc-container) {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;

  border-radius: 0;
  width: 100%;

  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>