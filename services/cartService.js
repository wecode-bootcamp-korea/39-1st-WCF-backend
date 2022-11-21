const { appDataSource } = require("../models/dataSource");
const cartDao = require('../models/cartDao');

const additionCart = async(userId, productOptionId, quantity) => {
    
    const searchCartId = await cartDao.searchCartId(userId,productOptionId);
    
    if(searchCartId.length==0){
        return await cartDao.additionCart(userId, productOptionId, quantity);
    }
    else {
        console.log(searchCartId)
        return await cartDao.searchCartId(searchCartId[0].id, quantity);
    }
};

const getByCart = async(userId) => {
    return await cartDao.getByCart(userId);
};

const cartQuantityChange = async(userId, productOptionId, quantity) => {
    return await cartDao.cartQuantityChange(userId, productOptionId, quantity);
};

const allDeleteCart = async(userId) => {
    return await cartDao.allDeleteCart(userId);
}

const oneDeleteCart = async(userId, productOptionId) => {
    return await cartDao.oneDeleteCart(userId, productOptionId);
}

module.exports = {
    additionCart,
    getByCart,
    cartQuantityChange,
    allDeleteCart,
    oneDeleteCart
}





