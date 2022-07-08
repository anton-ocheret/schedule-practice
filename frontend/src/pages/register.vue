<template>
  <q-page class="flexS">
    <q-page-container class="full-width q-px-lg">
      <register-form />

      <q-card class="q-mt-lg">
        <q-card-section>
          {{ t('has-account') + '?' }}
          <router-link :to="{ name: $constants.routeNames.login }">
            {{ t('login') }}
          </router-link>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

import RegisterForm from 'components/register-form.vue';
import { routeNames } from 'src/constants';

export default defineComponent({
  name: routeNames.register,
  components: {
    RegisterForm,
  },
  setup() {
    const { t } = useI18n();

    return { t };
  },
});
</script>
