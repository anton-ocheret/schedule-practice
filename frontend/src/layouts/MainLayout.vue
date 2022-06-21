<template>
  <q-layout view="hHh lpR fFf">

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" elevated>
      {{ appName }}
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const rightDrawerOpen = ref(false);
    const { t } = useI18n();
    const appName = t(process.env.VITE_APP_NAME_TRANSLATION_KEY);

    return {
      appName,
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>
