const { appDataSource } = require('./dataSource');

const addCart = async (userId, productOptionId, quantity) => {
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

const getUserCart = async (userId) => {
    const result = await appDataSource.query(
        `SELECT  
        carts.quantity,
        product_options.product_id as product_id,
        sizes.size,
        products.thumbnail,
        products.title,
        products.price,
        brands.name as brand 
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

const changeCartQuantity = async (cartId, userId, quantity) => {
    const result = await appDataSource.query(`
        UPDATE carts
        SET quantity = ?
        WHERE id = ? AND user_id =?
    `, [quantity, cartId, userId])

    return result;
}

const deleteALLCart = async(userId) => {
    const allDeleteCart = await appDataSource.query(`
        DELETE FROM carts c
        WHERE c.user_id =?
    `, [userId]
    );
    return allDeleteCart;
}

const deleteCart = async( userId,cartId)=>{
    const oneDeleteCart= await appDataSource.query(
        `DELETE FROM carts c
        WHERE c.id = ? AND c.user_id=?`
        ,[cartId, userId]
    )
    return oneDeleteCart
}
module.exports = {
    addCart,
    searchCartId,
    plusQuantity,
    getUserCart,
    changeCartQuantity,
    deleteALLCart,
    deleteCart
}