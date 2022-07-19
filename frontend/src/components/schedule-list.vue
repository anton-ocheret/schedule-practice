<template>
  <q-inner-loading :showing="practices.loading">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
  <q-list
    v-if="practices.data.length"
    bordered
    class="q-mt-lg"
  >
    <tempalte
      v-for="(value, key, index) in practicesByDate"
      :key="key"
    >
      <q-expansion-item
        group="days"
        :label="key"
        :default-opened="index === 0"
      >
        <q-card>
          <q-separator />
          <q-card-section>
            <q-list>
              <q-item
                v-for="(val, key) in value"
                :key="key"
              >
                <q-item-section>
                  <p :style="{ color: val.user.color }">{{ val.user.name }}</p>
                </q-item-section>
                <q-item-section side>
                  {{ val.from.getHours() }}:{{
                    val.from.getMinutes() >= 10
                      ? val.from.getMinutes() : `0${val.from.getMinutes()}`
                  }} -
                  {{ val.to.getHours() }}:{{
                    val.to.getMinutes() >= 10
                      ? val.to.getMinutes() : `0${val.to.getMinutes()}`
                  }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />
    </tempalte>
  </q-list>
</template>

<script>
import { defineComponent } from 'vue';
import { usePractices } from 'src/hooks/use-practices';

export default defineComponent({
  name: 'schedule-list',
  setup() {
    const { practices, getPractices, practicesByDate } = usePractices();
    getPractices();
    return { practices, getPractices, practicesByDate };
  },
});
</script>
