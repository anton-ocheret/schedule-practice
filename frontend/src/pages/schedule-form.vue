<template>
  <q-page class="flex flex-center">
    <q-page-container class="full-width q-px-lg">
      <q-form
        ref="formRef"
        class="q-gutter-md full-width"
      >
        <q-input
          filled
          class="full-width"
          :label="t('date')"
          v-model="date"
          :rules="[(value) => !value || getIsDateStringValid(value)]"
          mask="date"
          :hint="t('date-hint')"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date
                  today-btn
                  no-unset
                  v-model="date"
                  :options="getAvailableDates()"
                  :navigation-min-year-month="getMinYearMonth()"
                  :navigation-max-year-month="getMaxYearMonth()"
                  :locale="localeUa"
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      :label="t('choose')"
                      color="primary"
                      flat
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          class="full-width"
          :label="t('from')"
          filled
          v-model="timeStart"
          :disable="timeStarthInputDisabled"
          :hint="timeStarthInputDisabled ? t('time-start-hint') : ''"
          :rules="[
            (value) => !value || getIsTimeStringValid(value),
            (value) => !value || getTimeStartOptions(...value.split(':'))
          ]"
          mask="time"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
                @update:model-value="handleTimeStartModalOpen"
              >
                <q-time
                  format24h
                  v-model="timeStart"
                  :options="getTimeStartOptions"
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      :label="t('choose')"
                      color="primary"
                      flat
                    />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          class="full-width"
          :label="t('to')"
          filled
          v-model="timeFinish"
          mask="time"
          :rules="[
            (value) => !value || getIsTimeStringValid(value),
            (value) => !value || getTimeFinishOptions(...value.split(':'))
          ]"
          :disable="timeFinishInputDisabled"
          :hint="timeFinishInputDisabled ? t('time-finish-hint') : ''"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time
                  format24h
                  v-model="timeFinish"
                  :options="getTimeFinishOptions"
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      :label="t('choose')"
                      color="primary"
                      flat
                    />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-form>

      <q-btn
        class="q-mt-lg"
        color="primary"
        @click="addScheduledPractice"
      >
        {{ t('submit-practice-form') }}
      </q-btn>
    </q-page-container>
  </q-page>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { allPass } from 'ramda';
import {
  add,
  getHours,
  getMinutes,
  isAfter,
  isEqual,
} from 'date-fns';
import {
  getIsDateStringValid,
  getIsTimeStringValid,
  localeUa,
  getAvailableDates,
  format,
  getMinYearMonth,
  getMaxYearMonth,
} from 'src/utils';

export default defineComponent({
  name: 'ScheduleForm',

  setup() {
    const { t } = useI18n();
    const formRef = ref();

    const scheduled = ref([
      {
        from: new Date('Sun Jun 20 2022 15:20:00 GMT+0300 (Eastern European Summer Time)'),
        to: new Date('Sun Jun 20 2022 17:25:00 GMT+0300 (Eastern European Summer Time)'),
      },
      {
        from: new Date('Sun Jun 20 2022 18:20:00 GMT+0300 (Eastern European Summer Time)'),
        to: new Date('Sun Jun 20 2022 19:25:00 GMT+0300 (Eastern European Summer Time)'),
      },
      {
        from: new Date('Sun Jun 20 2022 10:20:00 GMT+0300 (Eastern European Summer Time)'),
        to: new Date('Sun Jun 20 2022 11:25:00 GMT+0300 (Eastern European Summer Time)'),
      },
      {
        from: new Date('Sun Jun 20 2022 11:25:00 GMT+0300 (Eastern European Summer Time)'),
        to: new Date('Sun Jun 20 2022 11:40:00 GMT+0300 (Eastern European Summer Time)'),
      },
    ]);

    const scheduledSorted = computed(
      () => [...scheduled.value].sort((a, b) => a.from - b.from),
    );

    const scheduledTime = computed(() => {
      const time = {};
      scheduledSorted.value.forEach(({ from, to }) => {
        let dateFromToCheck = from;
        let formattedFrom = format(dateFromToCheck);
        while (isAfter(to, dateFromToCheck) || isEqual(to, dateFromToCheck)) {
          const hours = getHours(dateFromToCheck);
          const minutes = getMinutes(dateFromToCheck);
          if (!time[formattedFrom]) time[formattedFrom] = {};
          if (!time[formattedFrom][hours]) time[formattedFrom][hours] = new Set();
          time[formattedFrom][hours].add(minutes);
          dateFromToCheck = add(dateFromToCheck, { minutes: 1 });
          formattedFrom = format(dateFromToCheck);
        }
      });

      return time;
    });

    const date = ref(format(new Date()));
    const timeStart = ref('');
    const timeFinish = ref('');

    const timeStarthInputDisabled = computed(() => !getIsDateStringValid(date.value));
    const timeFinishInputDisabled = computed(() => !getIsTimeStringValid(timeStart.value));

    const getIsHourHasAvailableMinutes = ({ hours }) => (
      scheduledTime.value?.[date.value]?.[hours]?.size !== 60
    );

    const getIsHourInSchedule = ({ hours }) => hours > 8 && hours < 21;

    const getIsMinuteNotScheduled = ({ hours, minutes }) => {
      if (typeof (minutes) !== 'number') return true;
      const scheduledMinutesInHour = scheduledTime.value?.[date.value]?.[hours];
      if (!scheduledMinutesInHour) return true;

      return !scheduledTime.value[date.value][hours].has(minutes);
    };

    const getIsDateAfterStart = ({ hours, minutes }) => {
      const hasMinutes = typeof (minutes) === 'number';
      const [shours, sminutes] = timeStart.value.split(':');
      const dateStart = add(
        new Date(date.value),
        {
          hours: shours,
          minutes: hasMinutes && sminutes,
        },
      );

      const dateToCheck = add(new Date(date.value), { hours, minutes });
      const after = isAfter(dateToCheck, dateStart);
      const equal = isEqual(dateToCheck, dateStart);
      return hasMinutes ? after : (after || equal);
    };

    const getIsDateBeforeClosestFrom = ({ hours, minutes }) => {
      const hasMinutes = typeof (minutes) === 'number';
      const [shours, sminutes] = timeStart.value.split(':');
      const dateStart = add(
        new Date(date.value),
        {
          hours: shours,
          minutes: hasMinutes && sminutes,
        },
      );
      const todayScheduled = scheduledSorted.value.filter(
        ({ from }) => format(from) === date.value,
      );
      if (todayScheduled.length === 0) return true;
      const [closestScheduled] = todayScheduled.filter(
        ({ from }) => isAfter(new Date(from), dateStart),
      );
      const closestFrom = closestScheduled?.from;
      if (!closestFrom) return true;
      const dateToCheck = add(new Date(date.value), { hours, minutes });
      const after = isAfter(closestFrom, dateToCheck);
      const equal = isEqual(closestFrom, dateToCheck);
      return hasMinutes ? after : (after || equal);
    };

    function getTimeStartOptions(hours, minutes) {
      const hrs = hours === null ? hours : Number(hours);
      const mins = minutes === null ? minutes : Number(minutes);

      return allPass([
        getIsHourInSchedule,
        getIsHourHasAvailableMinutes,
        getIsMinuteNotScheduled,
      ])({ hours: hrs, minutes: mins });
    }

    function getTimeFinishOptions(hours, minutes) {
      const hrs = hours === null ? hours : Number(hours);
      const mins = minutes === null ? minutes : Number(minutes);

      return allPass([
        getIsHourInSchedule,
        getIsHourHasAvailableMinutes,
        getIsMinuteNotScheduled,
        getIsDateAfterStart,
        getIsDateBeforeClosestFrom,
      ])({ hours: hrs, minutes: mins });
    }

    function addScheduledPractice() {
      formRef.value.validate().then((success) => {
        if (success) {
          const [sh, sm] = timeStart.value.split(':');
          const [fh, fm] = timeFinish.value.split(':');
          scheduled.value.push({
            from: add(new Date(date.value), { hours: sh, minutes: sm }),
            to: add(new Date(date.value), { hours: fh, minutes: fm }),
          });
        }
      });
    }

    watch(() => timeStart.value, () => {
      timeFinish.value = '';
    });

    watch(() => date.value, () => {
      timeStart.value = '';
    });

    function handleTimeStartModalOpen(opened) {
      if (opened) {
        timeFinish.value = '';
      }
    }

    return {
      t,
      getIsTimeStringValid,
      getIsDateStringValid,
      addScheduledPractice,
      handleTimeStartModalOpen,
      getAvailableDates,
      getMinYearMonth,
      getMaxYearMonth,
      localeUa,
      formRef,

      date,
      timeStart,
      timeFinish,

      getTimeStartOptions,
      getTimeFinishOptions,

      scheduled,
      scheduledSorted,
      scheduledTime,

      timeStarthInputDisabled,
      timeFinishInputDisabled,
    };
  },
});
</script>
