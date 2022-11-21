const productService = require("../services/productService");
const { catchAsync } = require("../utils/error");

const getProductDetail = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const productDetail = await productService.getProductDetail(productId);

  return res.status(200).json({ data: productDetail });
});

const getProductList = catchAsync(async (req, res) => {
  console.log(req.query);
  const products = await productService.getProductList(req.query);

  return res.status(200).json({ data: products });
});

const getBrands = catchAsync(async (req, res) => {
  const brands = await productService.getBrands();
  return res.status(200).json({ brands });
});

const getSizes = catchAsync(async (req, res) => {
  const sizes = await productService.getSizes();
  return res.status(200).json({ sizes });
});

module.exports = {
  getProductDetail,
  getProductList,
  getBrands,
  getSizes,
};
