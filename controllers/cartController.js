const cartService = require("../services/cartService");
const { catchAsync } = require("../utils/error");
const { raiseCustomError } = require("../utils/error");

const addCart = catchAsync(async (req, res) => {
  const { productOptionId, quantity } = req.body;

  const result = await cartService.addCart(
    req.user.id,
    productOptionId,
    quantity
  );
  return res.status(201).json({ message: "Success add cart" });
});

const getUserCart = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const UserCart = await cartService.getUserCart(userId);
  res.status(200).json({ data: UserCart });
});

const oneDeleteCart = catchAsync(async (req, res) => {
  const cartId = req.body.cartId;
  console.log(cartId);

  if (!cartId) {
    const error = new Error("cart id is not exist");
    error.statusCode = 400;
    throw error;
  }
  const oneDeleteCart = await cartService.oneDeleteCart(req.user.id, cartId);
  res.status(200).json({ message: "delete selected cart" });
});

module.exports = {
  addCart,
  getUserCart,
  oneDeleteCart,
};
