<template>
  <q-page class="flex flex-column">
    <q-page-container class="full-width column q-px-lg">
      <q-btn
        color="primary"
        :to="{ name: $constants.routeNames.createSchedule }"
      >
        {{ t('schedule-practice') }}
      </q-btn>

      <schedule-list />
    </q-page-container>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import ScheduleList from 'src/components/schedule-list.vue';
import { routeNames } from 'src/constants';

export default defineComponent({
  name: routeNames.schedule,
  components: {
    ScheduleList,
  },
  setup() {
    const { t } = useI18n();

    return { t, routeNames };
  },
});
</script>
