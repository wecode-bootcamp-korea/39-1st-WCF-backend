const userService = require("../services/userService");
const { catchAsync } = require("../utils/error");

const signUp = catchAsync(async (req, res) => {
  const { username, password, name, mobile_number, email, address } = req.body;

  if (!username || !password || !name || !mobile_number || !email || !address) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const result = await userService.signUp(
    username,
    password,
    name,
    mobile_number,
    email,
    address
  );
  return res.status(201).json({
    message: "SIGNUP_SUCCESS",
  });
});

const signIn = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const accessToken = await userService.signIn(username, password);
  res.status(200).json({ accessToken });
});

module.exports = {
  signUp,
  signIn,
};