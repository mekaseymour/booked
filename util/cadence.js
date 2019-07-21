export const DAY = 'day';
export const WEEK = 'week';
export const MONTH = 'month';
export const YEAR = 'year';

// do not change this or the ordering
export const CADENCE_UNITS = [DAY, WEEK, MONTH, YEAR];

export const cadenceUnitsToDaysMapping = {
  [DAY]: 1,
  [WEEK]: 7,
  [MONTH]: 30,
  [YEAR]: 365,
};
