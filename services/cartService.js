const { appDataSource } = require("../models/dataSource");
const cartDao = require('../models/cartDao');

const addCart = async(userId, productOptionId, quantity) => {
    
    const searchCartId = await cartDao.searchCartId(userId,productOptionId);
    
    if(searchCartId.length==0){
        return await cartDao.addCart(userId, productOptionId, quantity);
    }
    else {
        console.log(searchCartId)
        return await cartDao.searchCartId(searchCartId[0].id, quantity);
    }
};

const getUserCart = async(userId) => {
    return await cartDao.getUserCart(userId);
};

const changeCartQuantity = async(userId, productOptionId, quantity) => {
    return await cartDao.cartQuantityChange(userId, productOptionId, quantity);
};

const deleteALLCart = async(userId) => {
    return await cartDao.allDeleteCart(userId);
}

const deleteCart = async(userId, productOptionId) => {
    return await cartDao.oneDeleteCart(userId, productOptionId);
}

module.exports = {
    addCart,
    getUserCart,
    changeCartQuantity,
    deleteALLCart,
    deleteCart
}

