<template>
  <div class="text-center section">
    <h2 class="h2">Custom Calendars</h2>
    <p class="text-lg font-medium text-gray-600 mb-6">
      Roll your own calendars using scoped slots
    </p>
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
              class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1 bg-primary text-black"
              :class="attr.customData.class"
            >
              {{ attr.customData.title }}
            </p>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
import CourseService from '../CourseService';
import PostService from '../PostService';

export default {
  data() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      masks: {
        weekdays: "WWW",
      },
      attributes: [
        {
          key: 1,
          customData: {
            title: "Lunch with mom.",
            class: "bg-primary text-white",
          },
          dates: new Date(year, month, 1),
        },
        {
          key: 2,
          customData: {
            title: "Take Noah to basketball practice",
            class: "bg-primary text-white",
          },
          dates: new Date(year, month, 2),
        },
        {
          key: 3,
          customData: {
            title: "Noah's basketball game.",
            class: "bg-primary text-white",
          },
          dates: new Date(year, month, 5),
        },
        {
          key: 4,
          customData: {
            title: "Take car to the shop",
            class: "bg-primary text-white",
          },
          dates: new Date(year, month, 5),
        },
        {
          key: 4,
          customData: {
            title: "Meeting with new client.",
            class: "bg-primary text-white",
          },
          dates: new Date(year, month, 7),
        },
        {
          key: 5,
          customData: {
            title: "Mia's gymnastics practice.",
            class: "bg-primary text-white",
          },
          dates: new Date(year, month, 11),
        },
        {
          key: 6,
          customData: {
            title: "Cookout with friends.",
            class: "bg-primary text-white",
          },
          dates: { months: 5, ordinalWeekdays: { 2: 1 } },
        },
        {
          key: 7,
          customData: {
            title: "Mia's gymnastics recital.",
            class: "bg-primary text-white",
          },
          dates: new Date(year, month, 22),
        },
        {
          key: 8,
          customData: {
            title: "Visit great grandma.",
            class: "bg-primary text-white",
          },
          dates: new Date(year, month, 25),
        },
      ],
      posts: [],
    };
  },
  methods: {
    async getDatePosts() {
        let datePosts = [];
        this.posts = await PostService.getPosts();
        datePosts = (JSON.parse(JSON.stringify(this.posts.filter(post => (post.dueDate !== null && post.dueDate !== undefined)))));
        /*this.posts.forEach((post) => {
            if (post.type === 'Test') {
                datePosts.push(post);
            }
        })*/
        console.log(datePosts);
        return datePosts;
    },
    async postsToAttributes() {
        let temp = await this.getDatePosts();
        temp.forEach((post) => {
            let bgColour = 'bg-dark';
            if (post.type === 'Test')
                bgColour = 'bg-danger'
            else if (post.type === 'Assignment')
                bgColour = 'bg-warning'
            else if(post.type === 'Homework')
                bgColour = 'bg-primary'
            else if(post.type === 'Announcement')
                bgColour = 'bg-success'

            let dueDate = post.dueDate;
            const newAttr = {
                customData: {
                    title: `${post.dueTime} ${post.title}`,
                    class: `${bgColour} text-white`
                },
                dates: new Date(parseInt(dueDate.substring(0, 4)), parseInt(dueDate.substring(5, 7) - 1), parseInt(dueDate.substring(8)))
            }

            this.attributes.push(newAttr);
        })
        console.log(this.attributes);
    }
  },
  async created() {
    this.postsToAttributes();
  },
};
</script>

<style lang="postcss" scoped>
.section {
    width: 80%;
    margin: 0 auto;
}
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
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