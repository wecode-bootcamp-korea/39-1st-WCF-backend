const productDao = require("../models/productDao");
const {
  orderSet,
  makeProductQueryBuilders,
} = require("../models/productQueryBuilder");

const getProductDetail = async (productId) => {
  return await productDao.getProductDetail(productId);
};

const getProductList = async (params) => {
  const {
    limit = 10,
    offset = 0,
    sortMethod = "price_DESC",
    ...filterOptions
  } = params;

  const whereClause = makeProductQueryBuilders(filterOptions);
  const orderbyClause = orderSet[sortMethod];

  console.log(whereClause, orderbyClause);

  return await productDao.getProductList(whereClause, orderbyClause);
};

const getBrands = async () => {
  return await productDao.getBrands();
};

const getSizes = async () => {
  return await productDao.getSizes();
};

module.exports = {
  getProductDetail,
  getProductList,
  getBrands,
  getSizes,
};
