const validateEmail = (email) => {
    const emailRegex    =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

    if (!emailRegex.test(email)) {
        const error = new Error('INVALID_EMAIL');
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
    validateEmail,
    validatePw
}