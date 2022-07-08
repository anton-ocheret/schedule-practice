import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { routeNames } from 'src/constants';

import {
  validateEmail,
  validateRequired,
} from 'src/utils';
import { useAuth } from 'src/hooks/use-auth';

export function useLoginForm() {
  const { t } = useI18n();
  const formRef = ref();
  const $router = useRouter();
  const { login } = useAuth();

  const formTranslations = reactive({
    login: t('login'),
    email: t('email'),
    password: t('password'),
    requiredError: t('required-error'),
    invalidError: t('invalid-error'),
  });

  const formValues = reactive({
    email: '',
    password: '',
  });

  const formRequestState = reactive({
    loading: false,
    error: false,
  });

  const getIsRequired = (value) => validateRequired(value) || formTranslations.requiredError;
  const getIsInvalid = (value) => validateEmail(value) || formTranslations.invalidError;

  const formRules = {
    email: [getIsRequired, getIsInvalid],
    password: [getIsRequired],
  };

  const bindRef = (el) => {
    formRef.value = el;
  };

  const submit = async () => {
    const isValid = await formRef.value.validate();
    if (isValid) {
      const { email, password } = formValues;
      formRequestState.loading = true;
      login({ email, password }).then(() => {
        $router.push({ name: routeNames.schedule });
      }).catch(() => {
        formRequestState.error = true;
      }).finally(() => {
        formRequestState.loading = false;
      });
    }
  };

  return {
    formRequestState,
    formTranslations,
    formValues,
    formRules,
    bindRef,
    submit,
  };
}
