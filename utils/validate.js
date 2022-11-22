const { raiseCustomError } = require("../utils/error");

const validateUsername = (username) => {
  const usernameRegex = /^[a-z]+[a-z0-9]{5,}$/g;

  if (!usernameRegex.test(username)) {
    return raiseCustomError("INVALID_USERNAME", 401);
  }
};

const validatePw = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  if (!passwordRegex.test(password)) {
    return raiseCustomError("INVALID_PASSWORD", 401);
  }
};

module.exports = {
  validateUsername,
  validatePw,
};
