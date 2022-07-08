<template>
  <q-page class="flex">
    <q-page-container class="full-width q-px-lg">
      <login-form />

      <q-card class="q-mt-lg">
        <q-card-section>
          {{ t('no-account') + '?' }}
          <router-link :to="{ name: $constants.routeNames.register }">
            {{ t('register') }}
          </router-link>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import LoginForm from 'components/login-form.vue';
import { routeNames } from 'src/constants';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: routeNames.login,
  components: {
    LoginForm,
  },
  setup() {
    const { t } = useI18n();

    return { t };
  },
});
</script>
