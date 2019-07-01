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

const setCompleteByDate = goal => {
  switch (goal.cadence) {
    case 'weekly':
      goal.completeBy = getWeekFromTodayDate().toLocaleDateString();
      return goal;
    case 'monthly':
      goal.completeBy = getMonthFromTodayDate().toLocaleDateString();
      return goal;
    case 'yearly':
      goal.completeBy = getYearFromTodayDate().toLocaleDateString();
      return goal;
    default:
      console.err('No cadence set for goal');
  }
};

export default setCompleteByDate;
