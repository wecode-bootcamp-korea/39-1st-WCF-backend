const { appDataSource } = require("./dataSource")

const createUser = async (username, password, name, mobile_number, email, address) => {

    await appDataSource.query(
    `INSERT INTO users(
        username,
        password,
        name,
        mobile_number,
        email,
        address
    ) VALUES (?, ?, ?, ?, ?, ?);
    `,
    [ username, password, name, mobile_number, email, address ]
    ); 

};

const getUserByUsername = async (username) => {
	const [user] = await appDataSource.query(`
		SELECT 
            id,
            username,
            password,
            name,
            mobile_number,
            email,
            address
		FROM users
		WHERE username=?`, [username]
	)

	return user
}

const getUserById = async (id) => {
	const result = await dataSource.query(`
		SELECT 
			id,
            username,
			name,
			email,
			password
		FROM users
		WHERE id=?`, [id]
	)

	return result[0]
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById
}