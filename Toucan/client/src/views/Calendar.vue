<template>
  <div class="calendar">
    <NavbarComponent />
    <CalendarComponent />
  </div>
</template>

<script>
import CalendarComponent from '@/components/CalendarComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'

export default {
  name: 'Calendar',
  components: {
    CalendarComponent,
    NavbarComponent
  }
}
</script>
