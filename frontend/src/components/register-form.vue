<template>
  <q-card>
    <q-card-section>
      <q-form
        class="q-gutter-sm column"
        :ref="bindRef"
        @submit="submit"
      >
        <q-input
          lazy-rules
          outlined
          v-model="formValues.name"
          :label="formTranslations.name"
          :rules="formRules.name"
        />

        <q-input
          lazy-rules
          outlined
          v-model="formValues.email"
          :label="formTranslations.email"
          :rules="formRules.email"
        />

        <q-input
          lazy-rules
          outlined
          type="password"
          v-model="formValues.password"
          :label="formTranslations.password"
          :rules="formRules.password"
        />

        <q-input
          lazy-rules
          outlined
          v-model="formValues.color"
          :label="formTranslations.color"
          :rules="['anyColor']"
        >
          <template v-slot:append>
            <q-icon name="colorize" :style="{ color: formValues.color }" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-color v-model="formValues.color" no-header-tabs no-footer />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-btn
          class="self-center"
          type="submit"
          color="primary"
          :loading="formRequestState.loading"
        >
          <span class="flex self-center">{{ formTranslations.register }}</span>
          <q-icon class="q-ml-sm flex self-center" size="xs" name="how_to_reg" />
        </q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { useRegisterForm } from 'src/hooks/use-register-form';

export default defineComponent({
  name: 'register-form',
  setup() {
    const {
      formRequestState,
      formTranslations,
      formValues,
      formRules,
      bindRef,
      submit,
    } = useRegisterForm();

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
