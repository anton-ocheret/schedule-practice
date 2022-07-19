import { http } from 'src/boot/axios';
import { endpoints } from 'src/constants';

export const requestPractices = () => http({
  url: endpoints.practices,
  method: 'GET',
});

export const createPractice = ({ from, to }) => http({
  url: endpoints.practices,
  method: 'POST',
  data: {
    from,
    to,
  },
});
