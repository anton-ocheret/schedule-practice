<template>
  <q-card>
    <q-card-section>
      <q-form
        :ref="bindRef"
        class="q-gutter-sm column"
        @submit="submit"
      >
        <q-input
          lazy-rules
          outlined
          :disable="formRequestState.loading"
          :label="formTranslations.email"
          v-model="formValues.email"
          :rules="formRules.email"
        />

        <q-input
          lazy-rules
          outlined
          type="password"
          :disable="formRequestState.loading"
          :label="formTranslations.password"
          v-model="formValues.password"
          :rules="formRules.password"
        />

        <q-btn
          :loading="formRequestState.loading"
          class="flex self-center"
          type="submit"
          color="primary"
        >
          <span class="flex self-center">{{ formTranslations.login }}</span>
          <q-icon class="q-ml-sm flex self-center" size="xs" name="login" />
        </q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { useLoginForm } from 'src/hooks/use-login-form';

export default defineComponent({
  name: 'login-form',
  setup() {
    const {
      formRequestState,
      formTranslations,
      formValues,
      formRules,
      bindRef,
      submit,
    } = useLoginForm();

    return {
      formRequestState,
      formTranslations,
      formValues,
      formRules,
      bindRef,
      submit,
    };
  },
});
</script>
