const validator = {
  require: {
    required: true,
    message: 'Required',
  },
};

export const validateMessages = {
  required: 'This field is required!',
  types: {
    number: 'Value should be an integer!',
  },
  hours: {
    range: 'Value should be between ${min} and ${max}',
  },
  description: {
    min: 'You should enter at least ${min} chracters',
  },
};

export default validator;
