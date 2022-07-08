import { ref, reactive, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  requestLogin,
  requestLogout,
  requestRegister,
  removeAuth,
  getUser,
} from 'src/api/auth';

const user = ref(null);

export function useAuth() {
  const { t } = useI18n();

  const updateUser = () => {
    user.value = getUser();
  };

  const authTranslations = reactive({
    loginBadRequest: t('login-400-error'),
  });

  const login = ({ email, password }) => new Promise((resolve, reject) => {
    requestLogin({ email, password }, {
      errorMessages: {
        400: authTranslations.loginBadRequest,
      },
    })
      .then((response) => {
        updateUser();
        resolve(response);
      })
      .catch((error) => reject(error));
  });

  const logout = () => new Promise((resolve, reject) => {
    requestLogout({ userId: user.value.id })
      .then((response) => {
        removeAuth();
        updateUser();
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const register = ({
    name,
    email,
    password,
    color,
  }) => new Promise((resolve, reject) => {
    requestRegister({
      name,
      email,
      password,
      color,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  onBeforeMount(() => {
    if (user.value) return;
    updateUser();
  });

  return {
    register,
    logout,
    login,
    user,
  };
}
