module.exports = function checkIsEmailValid(email) {
  return /\S+@\S+\.\S+/.test(email);
};
