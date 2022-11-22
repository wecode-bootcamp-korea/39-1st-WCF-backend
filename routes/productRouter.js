const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.getProductList);
router.get("/brands", productController.getBrands);
router.get("/sizes", productController.getSizes);
router.get("/:productId", productController.getProductDetail);

module.exports = router;
