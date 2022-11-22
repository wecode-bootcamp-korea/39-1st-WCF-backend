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
    sortMethod = "created_at",
    ...filterOptions
  } = params;

  const whereClause = makeProductQueryBuilders(filterOptions);
  const orderbyClause = orderSet[sortMethod];

  return await productDao.getProductList(whereClause, orderbyClause);
};

const getBrands = async (subCategoryId) => {
  return await productDao.getBrands(subCategoryId);
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
