import { AsyncStorage } from 'react-native';
import * as Cadence from '../util/cadence';

const getCompleteByDate = async providedGoal => {
  const goal = providedGoal || (await AsyncStorage.getItem('goal'));
  const parsedGoal = JSON.parse(goal);

  const todaysDate = new Date();

  if (parsedGoal.cadenceUnit === Cadence.DAY) {
    const futureDate = new Date(todaysDate.setDate(todaysDate.getDate() + parsedGoal.cadenceMultiplier));
    return Promise.resolve(futureDate.toLocaleDateString());
  } else {
    const futureDate = new Date(
      todaysDate.setDate(
        todaysDate.getDate() + Cadence.cadenceUnitsToDaysMapping[parsedGoal.cadenceUnit] * parsedGoal.cadenceMultiplier
      )
    );
    return Promise.resolve(futureDate.toLocaleDateString());
  }
};

export default getCompleteByDate;
