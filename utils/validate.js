const validateUsername = (username) => {
    const usernameRegex    =/^[a-z]+[a-z0-9]{5,}$/g;

    if (!usernameRegex.test(username)) {
        const error = new Error('INVALID_USERNAME');
        error.statusCode = 401;

        throw error;
    }
};

const validatePw = (password) => {
    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (!passwordRegex.test(password)) {
        const error = new Error('INVALID_PASSWORD');
        error.statusCode = 401;

        throw error;
    }
};

module.exports = {
    validateUsername,
    validatePw
}