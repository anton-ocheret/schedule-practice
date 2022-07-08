import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { Notify } from 'quasar';
import { endpoints } from 'src/constants';
import { getTokens, setAuth } from 'src/api/auth';

const configureRequest = (config) => {
  const { url } = config;
  const isLoginRequest = url === endpoints.login;
  if (!isLoginRequest) {
    const { access } = getTokens();
    config.headers.Authorization = `Bearer ${access}`;
  }

  return config;
};

const handleSuccess = (response) => {
  if (response.data.tokens) {
    setAuth(response.data);
  }

  return Promise.resolve(response);
};

const handleError = (error) => {
  const { status } = error.response;
  const { errorMessages } = error.response.config;

  if (Object.keys(errorMessages).length) {
    Notify.create({
      progress: true,
      message: errorMessages[status],
      color: 'negative',
      icon: 'report_problem',
      position: 'bottom-right',
    });
  }
  return Promise.reject(error);
};

const http = axios.create({
  baseURL: process.env.VITE_API_URL,
  errorMessages: {},
});

http.interceptors.request.use(configureRequest);
http.interceptors.response.use(handleSuccess, handleError);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$http = http;
});

export { http };
