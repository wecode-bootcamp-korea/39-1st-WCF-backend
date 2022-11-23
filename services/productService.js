const productDao = require("../models/productDao");

const getProductDetail = async (productId) => {
  return await productDao.getProductDetail(productId);
};

const getProductList = async (params) => {
  return await productDao.getProductList(params);
};

module.exports = {
  getProductDetail,
  getProductList,
};
