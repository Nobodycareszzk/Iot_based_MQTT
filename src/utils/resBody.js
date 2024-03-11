function createResBody(code, message, data) {
  return {
    code,
    message,
    data,
  };
}

module.exports = createResBody;
