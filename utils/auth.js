const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET_KEY
const userDao = require("../models/userDao")

const loginRequired = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization

        if ( !accessToken ) {
            const error = new Error('NEED_ACCESS_TOKEN')
		    error.statusCode = 401
		
		    return res.status(error.statusCode).json({message: error.message})
        }

        const decoded = await jwt.verify(accessToken, secretKey);

        const userId = await userDao.getUserById(decoded.id)


        if (!user) {
            return res.status(400).json({ message: 'USER_DOES_NOT_EXIST'});
        }

        req.user = user;
        next();
    } catch(err) {
        return res.status(400).json({ message: "Invalid Access Token"})
    }
};

module.exports = { loginRequired };