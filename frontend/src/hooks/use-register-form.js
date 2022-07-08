import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  validateEmail,
  validateRequired,
} from 'src/utils';

import { useAuth } from 'src/hooks/use-auth';
import { routeNames } from 'src/constants';
import { useRouter } from 'vue-router';

export function useRegisterForm() {
  const formRef = ref();
  const { t } = useI18n();
  const $router = useRouter();
  const { register } = useAuth();

  const bindRef = ($el) => {
    formRef.value = $el;
  };

  const formValues = reactive({
    name: '',
    email: '',
    password: '',
    color: '',
  });

  const formTranslations = reactive({
    name: t('name'),
    email: t('email'),
    password: t('password'),
    color: t('color'),
    register: t('register'),
    requiredError: t('required-error'),
    invalidError: t('invalid-error'),
  });

  const getIsRequired = (value) => validateRequired(value) || formTranslations.requiredError;
  const getIsInvalid = (value) => validateEmail(value) || formTranslations.invalidError;

  const formRules = {
    name: [getIsRequired],
    email: [getIsRequired, getIsInvalid],
    password: [getIsRequired],
  };

  const formRequestState = reactive({
    loading: false,
    error: false,
  });

  const submit = async () => {
    const isValid = await formRef.value.validate();
    if (isValid) {
      const {
        name,
        email,
        password,
        color,
      } = formValues;
      formRequestState.loading = true;
      register({
        name,
        email,
        password,
        color,
      }).then(() => {
        $router.push({ name: routeNames.login });
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
