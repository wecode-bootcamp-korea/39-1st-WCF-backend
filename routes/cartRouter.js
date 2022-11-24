const express = require('express');
const router  = express.Router();

const {loginRequired} = require("../utils/auth")
const { cartController } = require('../controllers');

router.post('', loginRequired, cartController.addCart);
router.get('', loginRequired, cartController.getUserCart);
router.delete('/cartId', loginRequired, cartController.oneDeleteCart);


module.exports = router;