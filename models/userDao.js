const { appDataSource } = require("./dataSource")

const createUser = async (username, password, name, mobile_number, email, address) => {
    try {
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
        [ username, password, name, mobile_number, email, address]
        ); 
    } catch (err) {
        const error = new Error ('INVALID_DATA_INPUT');
        error.statusCode =500;
        throw error;
    }
};

const getUserByUsername = async (username) => {
	const [user] = await appDataSource.query(`
		SELECT 
            *
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


const product = async (res) => {
	const result = await dataSource.query(`
		SELECT 
            id,
			sub_category_id,
            brand_id,
			serial_number,
			title,
			discount_rate,
            created_at,
            updated_at
		FROM products
		WHERE id=${id}`,
        (err,rows)=>{
            res.status(200).json({data:rows})
        } 
	)

	return result
}
module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    product
}