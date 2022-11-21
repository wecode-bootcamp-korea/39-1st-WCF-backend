const productDao = require("../models/productDao");

const getProductDetail = async (productId) => {
  return await productDao.getProductDetail(productId);
};

module.exports = {
  getProductDetail,
};
