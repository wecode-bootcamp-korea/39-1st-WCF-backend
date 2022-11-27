const { appDataSource } = require("../models/dataSource");
const cartDao = require("../models/cartDao");

const addCart = async (userId, productOptionId, quantity) => {
  const searchCartId = await cartDao.searchCartId(userId, productOptionId);

  if (searchCartId.length == 0) {
    return await cartDao.addCart(userId, productOptionId, quantity);
  } else {
    return await cartDao.searchCartId(searchCartId[0].id, quantity);
  }
};

const getUserCart = async (userId) => {
  return await cartDao.getUserCart(userId);
};

const oneDeleteCart = async (userId, cartId) => {
  console.log(userId, cartId);
  return await cartDao.oneDeleteCart(userId, cartId);
};

module.exports = {
  addCart,
  getUserCart,
  oneDeleteCart,
};
