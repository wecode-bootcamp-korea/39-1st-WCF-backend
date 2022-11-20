const { appDataSource } = require("./dataSource")

const getProductById = async (id) => {
	const result = await appDataSource.query(`
		SELECT 
            id,
			sub_category_id,
            brand_id,
			serial_number,
			title,
			discount_rate,
            created_at,
            thumbnail,
            price
		FROM products
		WHERE id= ${id};`
	)

	return result[0]
}

module.exports = {
    getProductById
}