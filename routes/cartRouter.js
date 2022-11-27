const express = require("express");
const router = express.Router();

const { loginRequired } = require("../utils/auth");
const { cartController } = require("../controllers");

router.delete("", loginRequired, cartController.oneDeleteCart);
router.post("", loginRequired, cartController.addCart);
router.get("", loginRequired, cartController.getUserCart);

module.exports = router;
