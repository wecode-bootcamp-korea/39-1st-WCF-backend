const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/:productId", productController.getProductDetail);
router.get("", productController.getProductList);
router.get("/brands", productController.getBrands);
router.get("/sizes", productController.getSizes);

module.exports = router;
