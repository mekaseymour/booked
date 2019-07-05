import { AsyncStorage } from 'react-native';

const getWeekFromTodayDate = () => {
  const date = new Date();
  return new Date(date.setDate(date.getDate() + 7));
};

const getMonthFromTodayDate = () => {
  const date = new Date();
  return new Date(date.setMonth(date.getMonth() + 1));
};

const getYearFromTodayDate = () => {
  const date = new Date();
  return new Date(date.setFullYear(date.getFullYear() + 1));
};

const getCompleteByDate = () => {
  return AsyncStorage.getItem('goal').then(goal => {
    const parsedGoal = JSON.parse(goal);

    switch (parsedGoal.cadence) {
      case 'weekly':
        return Promise.resolve(getWeekFromTodayDate().toLocaleDateString());
      case 'monthly':
        return Promise.resolve(getMonthFromTodayDate().toLocaleDateString());
      case 'yearly':
        return Promise.resolve(getYearFromTodayDate().toLocaleDateString());
      default:
        return Promise.reject('No cadence set for goal');
    }
  });
};

export default getCompleteByDate;
