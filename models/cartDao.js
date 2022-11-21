const { appDataSource } = require('./dataSource');

const additionCart = async (userId, productOptionId, quantity) => {
    const addCart = await appDataSource.query(
        `
        INSERT INTO carts(
            user_id,
            product_option_id,
            quantity
        ) values(?,?,?);`,[userId, productOptionId, quantity]
    ) 
    return addCart[0];
};

const searchCartId = async(userId, productOptionId) => {
    return await appDataSource.query(
        `SELECT
        id
        From carts
        WHERE user_id=? AND product_option_id=?`,
        [userId,productOptionId]
    )
};

const plusQuantity = async(searchCartId)=>{
    return await appDataSource.query(
        `UPDATE carts
        SET quantity = quantity +1
        WHERE id = ?`
        ,[searchCartId]
    )
}

const getByCart = async (userId) => {
    const result = await appDataSource.query(
        `SELECT  
        carts.quantity,
        product_options.product_id,
        sizes.size,
        products.thumbnail,
        products.title,
        products.price,
        products.discount_rate,
        brands.name
        From carts
        LEFT JOIN product_options ON carts.id=product_options.id
        LEFT JOIN products ON product_options.product_id=products.id
        LEFT JOIN sizes ON product_options.size_id=sizes.id
        LEFT JOIN brands ON products.brand_id=brands.id
        LEFT JOIN users ON carts.user_id=users.id
        WHERE users.id=?
        `, [userId]
        )     

    return result;
};

const cartQuantityChange = async (userId, productOptionId, quantity) => {
    const result = await appDataSource.query(`
        UPDATE carts
        SET quantity =?
        WHERE user_id =? AND product_option_id =?
    `, [quantity, userId, productOptionId])

    return result;
}

const allDeleteCart = async(userId) => {
    const allDeleteCart = await appDataSource.query(`
        DELETE FROM carts c
        WHERE c.user_id =?
    `, [userId]
    );
    return allDeleteCart;
}
module.exports = {
    additionCart,
    searchCartId,
    plusQuantity,
    getByCart,
    cartQuantityChange,
    allDeleteCart
}
