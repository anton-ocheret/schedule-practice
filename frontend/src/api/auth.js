import { isEmpty } from 'ramda';
import { http } from 'src/boot/axios';
import { endpoints, authStorageKey } from 'src/constants';

export const requestLogin = ({ email, password }, { errorMessages } = {}) => (
  http({
    url: endpoints.login,
    method: 'POST',
    data: { email, password },
    errorMessages,
  })
);

export const setAuth = (data) => {
  localStorage.setItem(authStorageKey, JSON.stringify(data));
};

export const getTokens = () => {
  const auth = localStorage.getItem(authStorageKey);

  if (auth) {
    return JSON.parse(auth).tokens;
  }

  return {};
};

export const getUser = () => {
  const auth = localStorage.getItem(authStorageKey);

  if (auth) {
    return JSON.parse(auth).user;
  }

  return null;
};

export const removeAuth = () => {
  localStorage.removeItem(authStorageKey);
};

export const getIsAuthorized = () => !isEmpty(getTokens());

export const requestLogout = ({ userId }) => (
  http({
    url: endpoints.logout,
    method: 'POST',
    data: { userId },
  })
);

export const requestRegister = ({
  name,
  email,
  password,
  color,
}) => (
  http({
    url: endpoints.register,
    method: 'POST',
    data: {
      name,
      email,
      password,
      color,
    },
  })
);
