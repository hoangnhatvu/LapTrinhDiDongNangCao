import moment from 'moment';

export function formatDate(inputDate) {
  const dateObject = new Date(inputDate);

  const formattedDate = moment(dateObject).format('YYYY-MM-DD');

  return formattedDate;
}
