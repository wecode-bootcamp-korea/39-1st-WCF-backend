const express = require('express');
const router  = express.Router();

const { cartController } = require('../controllers');

router.post('', cartController.additionCart);
router.get('', cartController.getByCart);
router.patch('/change', cartController.cartQuantityChange);
router.delete('/all', cartController.allDeleteCart);
router.delete('/one', cartController.oneDeleteCart);

module.exports = router;