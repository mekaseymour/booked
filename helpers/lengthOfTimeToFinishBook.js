import moment from 'moment';

const timeBetweenPastBookStartAndEnd = pastBook => {
  const dateStarted = moment(new Date(pastBook.startDate));
  const dateCompleted = moment(new Date(pastBook.completedDate));

  return dateCompleted.diff(dateStarted, 'days');
};

const timeBetweenBookStartAndEnd = book => {
  const dateStarted = moment(new Date(book.startDate));
  const dateCompleted = moment(new Date());

  return dateCompleted.diff(dateStarted, 'days');
};

export { timeBetweenBookStartAndEnd, timeBetweenPastBookStartAndEnd };
