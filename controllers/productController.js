const productService = require("../services/productService");
const { catchAsync } = require("../utils/error");

const getProductDetail = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const productDetail = await productService.getProductDetail(productId);

  return res.status(200).json({ data: productDetail });
});

module.exports = {
  getProductDetail,
};
