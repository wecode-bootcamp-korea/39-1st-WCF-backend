const express = require('express');
const router  = express.Router();

const {loginRequired} = require("../utils/auth")
const { cartController } = require('../controllers');

router.post('/', loginRequired, cartController.addCart);
router.get(`/:userId`, loginRequired, cartController.getUserCart);
router.patch(`/:cartId`, loginRequired, cartController.changeCartQuantity);
router.delete(``, loginRequired, cartController.deleteALLCart);
router.delete(`/:userId`, loginRequired, cartController.deleteCart);
module.exports = router;