const express = require('express');
const router  = express.Router();

const {loginRequired} = require("../utils/auth")
const { cartController } = require('../controllers');

router.post('/', cartController.addCart);
router.get(`/:userId`, cartController.getUserCart);
router.patch(`/:cartId`, cartController.changeCartQuantity);
router.delete(``, cartController.deleteALLCart);
router.delete(`/:userId`, cartController.deleteCart);
module.exports = router;