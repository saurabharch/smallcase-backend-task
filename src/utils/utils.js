const response = (statusCode, message, data) => {
  return {
    statusCode,
    message,
    data,
  };
};

const isDefObject = (object) =>
  Object.keys(object).length === 0 ? false : true;

module.exports = {
  response,
  isDefObject,
};
