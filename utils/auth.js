const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const userService = require("../services/userService");

const loginRequired = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      const error = new Error("NEED_ACCESS_TOKEN");
      error.statusCode = 401;

      return res.status(error.statusCode).json({ message: error.message });
    }

    const payLoad = await jwt.verify(accessToken, secretKey);
    const user = await userService.getUserById(payLoad.userId);

    if (!user) {
      return res.status(401).json({ message: "USER_DOES_NOT_EXIST" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid Access Token" });
  }
};

module.exports = { loginRequired };
