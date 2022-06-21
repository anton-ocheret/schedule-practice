<template>
  <q-page class="flex flex-center">
    <q-page-container class="full-width q-px-lg">
      <q-form
        ref="formRef"
        class="q-gutter-md full-width"
      >
        <q-input
          class="full-width"
          :label="t('date')"
          filled
          v-model="modelDate"
          disabled mask="date"
          :hint="t('date-hint')"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date
                  today-btn
                  no-unset
                  v-model="modelDate"
                  :options="getAvailableDates"
                  :locale="myLocale"
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
          v-model="modelTimeStart"
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
                  v-model="modelTimeStart"
                  :options="modelTimeStartOptionsGetter"
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
          v-model="modelTimeFinish"
          mask="time"
          :rules="['time']"
          :disable="modelTimeFinishInputDisabled"
          :hint="modelTimeFinishInputDisabled ? t('time-finish-hint') : ''"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time
                  format24h
                  v-model="modelTimeFinish"
                  :options="modelTimeFinishOptionsGetter"
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
  watch,
} from 'vue';
import {
  format,
  add,
  formatISO,
  // compareAsc,
  isAfter,
  isEqual,
  // eslint-disable-next-line no-unused-vars
  isBefore,
} from 'date-fns';
import { useI18n } from 'vue-i18n';
import { computed } from '@vue/reactivity';

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const { t } = useI18n();
    const formRef = ref();
    const modelDate = ref(format(new Date(), 'yyyy/MM/dd'));
    const modelTimeStart = ref();
    const modelTimeFinish = ref();

    const scheduledPractices = ref([
      {
        from: new Date('Fri Jun 17 2022 12:20:00 GMT+0300 (Eastern European Summer Time)'),
        to: new Date('Fri Jun 17 2022 13:13:00 GMT+0300 (Eastern European Summer Time)'),
      },
      {
        from: formatISO(new Date('Fri Jun 17 2022 13:13:00 GMT+0300 (Eastern European Summer Time)')),
        to: formatISO(new Date('Fri Jun 17 2022 15:10 GMT+0300 (Eastern European Summer Time)')),
      },
      {
        from: formatISO(new Date('Fri Jun 18 2022 13:13:00 GMT+0300 (Eastern European Summer Time)')),
        to: formatISO(new Date('Fri Jun 18 2022 15:10 GMT+0300 (Eastern European Summer Time)')),
      },
    ]);

    const scheduledPracticesSortedByFrom = computed(() => {
      const practices = [...scheduledPractices.value];
      return practices.sort((a, b) => +new Date(a.from) - +new Date(b.from));
    });

    const scheduledPracticesForToday = computed(() => (
      scheduledPracticesSortedByFrom.value.filter(
        (practice) => format(new Date(practice.from), 'yyyy/MM/dd') === modelDate.value,
      )
    ));

    const modelTimeStartHours = computed(() => {
      const [hours] = modelTimeStart.value ? modelTimeStart.value.split(':') : [undefined, undefined];
      return Number(hours) || undefined;
    });

    const modelTimeStartMinutes = computed(() => {
      const [, minutes] = modelTimeStart.value ? modelTimeStart.value.split(':').filter(Boolean) : [];
      return Number.isNaN(Number(minutes)) ? undefined : Number(minutes);
    });

    const modelTimeFinishHours = computed(() => {
      const [hours] = modelTimeFinish.value ? modelTimeFinish.value.split(':').filter(Boolean) : [undefined, undefined];
      return Number(hours) || undefined;
    });

    const modelTimeFinishMinutes = computed(() => {
      const [, minutes] = modelTimeFinish.value ? modelTimeFinish.value.split(':').filter(Boolean) : [undefined, undefined];
      return Number.isNaN(Number(minutes)) ? undefined : Number(minutes);
    });

    const modelTimeFinishInputDisabled = computed(() => {
      const isModelStartTimeInvalid = ref(false);

      if (formRef.value) {
        isModelStartTimeInvalid.value = formRef?.value
          .getValidationComponents()
          .find(({ modelValue }) => modelValue === modelTimeStart.value)?.hasError;
      }

      return !modelTimeStartHours.value
        || Number.isNaN(Number(modelTimeStartMinutes.value))
        || isModelStartTimeInvalid.value;
    });

    watch(() => modelTimeStart.value, () => {
      modelTimeFinish.value = undefined;
    });

    const getMonday = () => {
      const now = new Date();
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(now.setDate(diff));
    };

    const getAvailableDates = (date) => date >= format(new Date(), 'yyyy/MM/dd') && date <= format(add(getMonday(), { days: 6 }), 'yyyy/MM/dd');

    const myLocale = {
      days: 'Неділя_Понеділок_Вівторок_Середа_Четвер_П’ятниця_Субота'.split('_'),
      daysShort: 'Нд_Пн_Вт_Сер_Четв_Пт_Сб'.split('_'),
      months: 'Січень_Лютий_Березень_Квітень_Травень_Червень_Липень_Серпень_Вересень_Жовтень_Листопад_Грудень'.split('_'),
      monthsShort: 'Сiч_Лют_Берез_Квiт_Трав_Черв_Лип_Серп_Вер_Oct_Лист_Груд.'.split('_'),
      firstDayOfWeek: 1,
      format24h: true,
      pluralDay: 'Дні',
    };

    const addScheduledPractice = () => {
      formRef.value.validate().then((success) => {
        if (success) {
          const practice = {
            from: add(
              new Date(modelDate.value),
              {
                hours: modelTimeStartHours.value,
                minutes: modelTimeStartMinutes.value,
              },
            ),
            to: add(
              new Date(modelDate.value),
              {
                hours: modelTimeFinishHours.value,
                minutes: modelTimeFinishMinutes.value,
              },
            ),
          };

          scheduledPractices.value.push(practice);
        }
      });
    };

    const modelTimeStartOptionsGetter = (hours, minutes) => {
      const hasMinutes = minutes || minutes === 0;
      if (hours < 9 || hours > 20) return false;
      const getPretendentDate = () => (
        formatISO((add(new Date(modelDate.value), { hours, minutes })))
      );
      let pretendentDate = getPretendentDate();

      const timeInUse = {};

      scheduledPracticesForToday.value.forEach(({ from, to }) => {
        let copyFrom = new Date(from);
        while (isAfter(new Date(to), new Date(copyFrom))) {
          const h = new Date(copyFrom).getHours();
          const m = new Date(copyFrom).getMinutes();
          if (timeInUse[h]) {
            timeInUse[h].push(m);
          } else {
            timeInUse[h] = [m];
          }
          copyFrom = add(new Date(copyFrom), { minutes: 1 });
        }
      });

      if (timeInUse[hours]?.length >= 60) {
        return false;
      }

      if (hasMinutes) {
        pretendentDate = getPretendentDate();
        const m = new Date(pretendentDate).getMinutes();
        const h = new Date(pretendentDate).getHours();

        if (timeInUse[h]?.includes(m)) return false;
      }
      return true;
    };

    const modelTimeFinishOptionsGetter = (hours, minutes) => {
      const getPretendentDate = () => (
        add(new Date(modelDate.value), { hours, minutes })
      );
      let pretendentDate = getPretendentDate();
      const hasMinutes = minutes || minutes === 0;
      if (hasMinutes) {
        console.log(hasMinutes, { hours, minutes });
        pretendentDate = getPretendentDate();
        const startDate = add(
          new Date(modelDate.value),
          {
            hours: modelTimeStartHours.value,
            minutes: modelTimeStartMinutes.value,
          },
        );

        console.log({
          pretendentDate,
          startDate,
        });

        // if (isBefore(pretendentDate, startDate)) return false;
      }
      if (hours < 9 || hours > 20) return false;

      const startDateWithHours = add(
        new Date(modelDate.value),
        {
          hours: modelTimeStartHours.value,
        },
      );

      if (
        isBefore(pretendentDate, startDateWithHours)
        && !isEqual(pretendentDate, startDateWithHours)
      ) return false;

      const closestFrom = scheduledPracticesForToday.value.filter(({ from }) => {
        const dateFrom = new Date(from);
        return isAfter(dateFrom, startDateWithHours);
      })?.[0]?.from;

      if (
        closestFrom
        && isAfter(pretendentDate, startDateWithHours)
        && isAfter(pretendentDate, new Date(closestFrom))
      ) return false;

      // const getPretendentDate = () => (
      //   formatISO((add(new Date(modelDate.value), { hours, minutes })))
      // );
      // const pretendentDate = getPretendentDate();
      // console.log(pretendentDate, add(new Date(modelDate.value), { hours, minutes }));
      // if (
      //   isBefore(
      //     add(formatISO((new Date(modelDate.value)), { hours, minutes })),
      //     new Date(pretendentDate),
      //   )
      // ) return false;

      return true;
      // const hasMinutes = minutes || minutes === 0;
      // const isSameHourAsStart = hours === modelTimeStartHours.value;

      // if (hours < 6 || hours > 20) return false;

      // if (hours < modelTimeStartHours.value) return false;

      // const isMinuteEmploy = scheduledPractices.value.find(({ from }) => {
      //   const choosenDateWithTime = add(new Date(modelDate.value), { hours, minutes });
      //   const afterFrom = compareAsc(choosenDateWithTime, from);
      //   const isChoosenAfterFrom = afterFrom === 1 || afterFrom === 0;
      //   return isChoosenAfterFrom;
      // });

      // if (isMinuteEmploy) return false;

      // if (isSameHourAsStart && hasMinutes) {
      //   if (minutes <= modelTimeStartMinutes.value + 1) return false;
      // }

      // if (hasMinutes) {
      //   const isMinuteEmployed = scheduledPractices.value.find(({ from }) => {
      //     // eslint-disable-next-line max-len
      // eslint-disable-next-line max-len
      //     const choosenDateWithTime = add(new Date(modelDate.value), { hours, minutes: minutes - 1 });
      //     const afterFrom = compareAsc(choosenDateWithTime, from);
      //     const isChoosenAfterFrom = afterFrom === 1;

      //     return isChoosenAfterFrom;
      //   });

      //   return !isMinuteEmployed;
      // }

      // return true;
    };

    const handleTimeStartModalOpen = (opened) => {
      if (opened) {
        modelTimeStart.value = '';
      }
    };

    return {
      handleTimeStartModalOpen,

      modelTimeStartOptionsGetter,
      modelTimeFinishOptionsGetter,

      t,
      myLocale,
      formRef,
      modelDate,
      modelTimeStart,
      modelTimeFinish,
      getAvailableDates,

      modelTimeStartHours,
      modelTimeStartMinutes,

      modelTimeFinishHours,
      modelTimeFinishMinutes,

      modelTimeFinishInputDisabled,

      addScheduledPractice,

      scheduledPractices,
      scheduledPracticesSortedByFrom,
      scheduledPracticesForToday,
    };
  },
});
</script>
