import { reactive } from 'vue';
import { requestPractices, createPractice } from 'src/api/practices';
import { computed } from '@vue/reactivity';
import { format } from 'src/utils';
import { useI18n } from 'vue-i18n';

const practices = reactive({
  loading: false,
  error: null,
  data: [],
});

const practicesSorted = computed(
  () => [...practices.data].sort((a, b) => a.from - b.from),
);

export function usePractices() {
  const { t } = useI18n();

  const resetPracticesData = () => {
    practices.loading = false;
    practices.error = null;
    practices.data = [];
  };

  const getPractices = async () => {
    resetPracticesData();
    practices.loading = true;
    try {
      const { data } = await requestPractices();
      practices.data = data.map((d) => ({
        ...d,
        from: new Date(d.from),
        to: new Date(d.to),
      }));
    } catch (error) {
      console.error(error);
    } finally {
      practices.loading = false;
    }
  };

  const create = async ({ from, to }) => {
    practices.loading = true;
    try {
      await createPractice({ from, to });
      const { data } = await requestPractices();
      practices.data = data.map((d) => ({
        ...d,
        from: new Date(d.from),
        to: new Date(d.to),
      }));
    } catch (error) {
      console.error(error);
    } finally {
      practices.loading = false;
    }
  };

  const practicesByDate = computed(() => practicesSorted.value.reduce((result, item) => {
    const today = t(format(item.from, 'EEEE').toLowerCase());

    return {
      ...result,
      [today]: {
        ...result[today],
        [item.from]: item,
      },
    };
  }, {}));

  return {
    practices,
    create,
    practicesByDate,
    getPractices,
  };
}
