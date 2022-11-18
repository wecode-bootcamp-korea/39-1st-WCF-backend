const userService = require("../services/userService")

const signUp = async (req, res) => {
    try {
        const { username, password, name, mobile_number, email, address } = req.body;

        if ( !username || !password || !name || !mobile_number || !email || !address ) {
            return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const result = await userService.signUp( username, password, name, mobile_number, email, address );
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message})
    }
};

const signIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        if ( !username || !password ) {
            return res.status(400).json({ message: 'KEY_ERROR' });
    }

        const accessToken = await userService.signIn(username, password)
        res.status(200).json({ accessToken })
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message})
    }
};


module.exports = {
    signUp, 
    signIn
}