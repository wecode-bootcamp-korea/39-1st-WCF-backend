const { cartService } = require('../services')
const { catchAsync } = require("../utils/error")
const {raiseCustomError}= require("../utils/error")

const addCart = catchAsync(async(req,res)=>{
    const {productOptionId, quantity}= req.body
    const userId = req.user.id

    const result = await cartService.addCart(userId, productOptionId, quantity)
    return res.status(201).json({message: "Success add cart"})

});

const getUserCart = catchAsync(async (req, res) => {
    const userId = req.user.id

    const userCart = await cartService.getUserCart(userId);
    res.status(200).json({data:userCart});

});

const changeCartQuantity = catchAsync(async (req, res) => {
    const { cartId, quantity } = req.body;
    const userId = req.user.id

    if(!productOptionId|| !quantity)
    {
        const error = new Error("Key Error");
        error.statusCode=400;
        throw error;
    }

    const changeCartQuantity = await cartService.changeCartQuantity(cartId, userId, quantity)
    res.status(200).json({changeCartQuantity});
})
    
const deleteALLCart = catchAsync(async (req, res) => {
    const userId = req.user.id

    const allDeleteCart = await cartService.allDeleteCart(userId)
    res.status(204)
})

const deleteCart = catchAsync(async (req, res) => {
    const { cartId } = req.params;
    const userId = req.user.id

    if(!cartId) 
    {
        const error = new Error("cart id is not exist")
        error.statusCode=400;
        throw error;
    }
    const deleteCart= await cartService.deleteCart(userId, cartId)
    restart.status(200).json({deleteCart})
});
    
module.exports = {
    addCart,
    getUserCart,
    changeCartQuantity,
    deleteALLCart,
    deleteCart
    }