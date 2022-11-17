const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const userDao = require("../models/userDao");
const { validateUsername, validatePw } = require("../utils/validate2")


const signUp = async (username, password, name, mobile_number, email, address) => {
    validateUsername(username);
    validatePw(password);

    const hashedPassword = await bcrypt.hash(password, 12)
    console.log(hashedPassword)
    const user = await userDao.createUser(
        username,
        hashedPassword,
        name,
        mobile_number,
        email, 
        address
    );
    console.log(user)
    return user;
};

const signIn = async (username, password) => {
    validateUsername(username)
    validatePw(password)

    const user = await userDao.getUserByUsername(username)

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return res.status(401).json({ message : "Invalid User" });
    };

    const payLoad = { userId : user.id };
    const accessToken = jwt.sign(payLoad, secretKey);
    return accessToken;
}


module.exports = {
    signUp,
    signIn
}