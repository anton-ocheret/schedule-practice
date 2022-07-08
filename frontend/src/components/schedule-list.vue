<template>
  Schedule list
</template>

<script>
import { defineComponent } from 'vue';
import { usePractices } from 'src/hooks/use-practices';

export default defineComponent({
  name: 'schedule-list',
  setup() {
    const { practices } = usePractices();
    return { practices };
  },
});
</script>
