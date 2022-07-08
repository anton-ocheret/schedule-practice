<template>
  <q-page class="flex">
    <q-page-container class="full-width q-px-lg">
      <schedule-list />
    </q-page-container>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import ScheduleList from 'src/components/schedule-list.vue';
import { routeNames } from 'src/constants';

export default defineComponent({
  name: routeNames.schedule,
  components: {
    ScheduleList,
  },
});
</script>
