const express = require('express');
const { productController } = require('../controllers');

const router= express.Router();

router.get(`/:id`, productController.getproductById);

module.exports = router;

