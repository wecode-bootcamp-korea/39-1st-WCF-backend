const { appDataSource } = require("../models/dataSource");
const cartDao = require('../models/cartDao');

const addCart = async(userId, productOptionId, quantity) => {
    
    const searchCart = await cartDao.searchCartId(userId,productOptionId);
    
    if(!searchCart){
        return await cartDao.addCart(userId, productOptionId, quantity);
    }
    else {
        return await cartDao.changeCartQuantity(searchCart[0].id, userId, quantity);
    }
};

const getUserCart = async(userId) => {
    return await cartDao.getUserCart(userId);
};

const changeCartQuantity = async(cartId, userId, quantity) => {
    return await cartDao.cartQuantityChange(cartId, userId, quantity);
};

const deleteALLCart = async(userId) => {
    return await cartDao.allDeleteCart(userId);
}

const deleteCart = async(userId, cartId) => {
    return await cartDao.oneDeleteCart(userId, cartId);
}

module.exports = {
    addCart,
    getUserCart,
    changeCartQuantity,
    deleteALLCart,
    deleteCart
}

