import {
  format as dateFnsFormat,
  add,
  isBefore,
  isEqual,
} from 'date-fns';

export function format(date) {
  return dateFnsFormat(date, 'yyyy/MM/dd');
}

const getMonday = () => {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(now.setDate(diff));
};

export function getAvailableDates() {
  const availableDates = [];
  const lastAvailableDate = add(getMonday(), { days: 6 });
  let currentDate = new Date();

  while (isBefore(currentDate, lastAvailableDate) || isEqual(currentDate, lastAvailableDate)) {
    availableDates.push(format(currentDate));
    currentDate = add(currentDate, { days: 1 });
  }

  return availableDates;
}

export function getMinYearMonth() {
  const availableDates = getAvailableDates();
  const [year, month] = availableDates[0].split('/');
  return `${year}/${month}`;
}

export function getMaxYearMonth() {
  const availableDates = getAvailableDates();
  const [year, month] = availableDates[availableDates.length - 1].split('/');
  return `${year}/${month}`;
}

export function getIsDateStringValid(date) {
  const availableDates = getAvailableDates();
  return availableDates.includes(date);
}

export function getIsTimeStringValid(timeString) {
  return /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(timeString);
}

export const localeUa = {
  days: 'Неділя_Понеділок_Вівторок_Середа_Четвер_П’ятниця_Субота'.split('_'),
  daysShort: 'Нд_Пн_Вт_Сер_Четв_Пт_Сб'.split('_'),
  months: 'Січень_Лютий_Березень_Квітень_Травень_Червень_Липень_Серпень_Вересень_Жовтень_Листопад_Грудень'.split('_'),
  monthsShort: 'Сiч_Лют_Берез_Квiт_Трав_Черв_Лип_Серп_Вер_Oct_Лист_Груд.'.split('_'),
  firstDayOfWeek: 1,
  format24h: true,
  pluralDay: 'Дні',
};
