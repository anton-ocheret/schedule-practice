<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <router-link :to="{ name: $constants.routeNames.schedule }">
            <q-avatar>
              <img class="flex" src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
            </q-avatar>
          </router-link>
          App
        </q-toolbar-title>

        <q-btn-dropdown
          v-if="user"
          :label="user.name"
          rounded
          unelevated
          fab-mini
          icon="account_circle"
        >
          <q-list>
            <q-item clickable v-close-popup @click="handleLogoutClick">
              <q-item-section>
                <q-item-label>{{ t('logout') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      behavior="mobile"
      elevated
    />

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAuth } from 'src/hooks/use-auth';
import { routeNames } from 'src/constants';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const rightDrawerOpen = ref(false);
    const { t } = useI18n();
    const $router = useRouter();
    const { logout, user } = useAuth();
    const handleLogoutClick = () => {
      logout().then(() => {
        $router.push({ name: routeNames.login });
      });
    };

    return {
      t,
      user,
      handleLogoutClick,
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>
