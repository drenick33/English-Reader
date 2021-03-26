export const phonePattern = {
  pattern: new RegExp(/^\d+$/),
  message: 'Phone must only contain numbers.',
};

export const passwordWhitespacePattern = {
  pattern: new RegExp(/^\S+$/),
  message: 'Password must be without whitespace.',
};

export const phoneLength = (min: number, max: number) => ({
  min,
  max,
  message: `Phone number must be min: ${min} and max: ${max} numbers.`,
});

export const passwordLength = (min: number) => ({
  min,
  message: `Password must be min: ${min} characters.`,
});
