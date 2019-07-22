export const textInputIsValid = input => {
  // string contains at least one non-empty character
  const inputArr = input.split('');

  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i] !== ' ') return true;
  }

  return false;
};
