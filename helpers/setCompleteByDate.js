import { AsyncStorage } from 'react-native';

const getWeekFromTodayDate = () => {
  const date = new Date();
  return date.setDate(date.getDate() + 7);
};

const getMonthFromTodayDate = () => {
  const date = new Date();
  return date.setMonth(date.getMonth() + 1);
};

const getYearFromTodayDate = () => {
  const date = new Date();
  return date.setFullYear(date.getFullYear() + 1);
};

const setCompleteByDate = () => {
  AsyncStorage.getItem('goal').then(data => {
    const goalData = JSON.parse(data);
    const cadence = goalData.cadence;

    switch (cadence) {
      case 'weekly':
        goalData.completeBy = getWeekFromTodayDate();
        AsyncStorage.setItem('goal', JSON.stringify(goalData));
        break;
      case 'monthly':
        goalData.completeBy = getMonthFromTodayDate();
        AsyncStorage.setItem('goal', JSON.stringify(goalData));
        break;
      case 'yearly':
        goalData.completeBy = getYearFromTodayDate();
        AsyncStorage.setItem('goal', JSON.stringify(goalData));
        break;
      default:
        console.err('Incorrectly set async storage cadence');
    }
  });
};

export default setCompleteByDate;
