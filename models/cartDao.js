const { appDataSource } = require('./dataSource');

const additionCart = async (userId, productOptionId, quantity) => {
    const addCart = await appDataSource.query(`
        INSERT INTO carts(
            user_id,
            product_option_id,
            quantity
        ) values(?,?,?);`,[userId, productOptionId, quantity]
    ) 
    return addCart;
};

const sameproductPlusQuantity = async(searchCartId) => {
    return await appDataSource.query(
        `
        UPDATE carts
        SET quantity = quantity + 1
        WHERE id =?;`,
        [searchCartId]
    )
};

const getByCart = async (userId) => {
    const result = await appDataSource.query(
        `SELECT
            carts.id,
            carts.quantity,
            product_options.id AS optionId,
            products.id AS productId,
            product_optoins.size_id,
            products.thumbnail,
            products.title,
            products.price
        FROM carts 
        INNER JOIN product_options ON carts.product_option_id = product_options.id 
        INNER JOIN sizes ON product_options.size_id=sizes.size 
        INNER JOIN products ON product_options.product_id = products.id
        INNER JOIN users ON carts.user_id = users.id
        WHERE users.id = 1;
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
    sameproductPlusQuantity,
    getByCart,
    cartQuantityChange,
    allDeleteCart
}
