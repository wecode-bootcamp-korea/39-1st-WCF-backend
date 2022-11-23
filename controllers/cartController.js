const { cartService } = require('../services')
const { catchAsync } = require("../utils/error")
const {raiseCustomError}= require("../utils/error")

const addCart = catchAsync(async(req,res)=>{
    const {userId, productOptionId, quantity}= req.body

    const result = await cartService.addCart(userId, productOptionId, quantity)
    return res.status(201).json({message: "Success Input Key_Values"})

});

const getUserCart = catchAsync(async (req, res) => {
    const {userId}=req.params

    if(!userId) 
    {
        const error = new Error("userId is not define")
        error.statusCode=400
        throw error;
    }
       
    const getUserCart = await cartService.getUserCart(userId);
    res.status(200).json({data:getUserCart});

});

const changeCartQuantity = catchAsync(async (req, res) => {
    const { userId, productOptionId, quantity } = req.body;
        
    if(!userId || !productOptionId|| !quantity)
    {
        const error = new Error("Key Error");
        error.statusCode=400;
        throw error;
    }

    const changeCartQuantity = await cartService.changeCartQuantity(userId, productOptionId, quantity)
    res.status(200).json({changeCartQuantity});
})
    
const deleteALLCart = catchAsync(async (req, res) => {
        const{userId}=req.body
    if(!userId) 
    {
        const error = new Error("ALL DELETE ERROR")
        error.statusCode=400;
        throw error;
    }
    const allDeleteCart = await cartService.allDeleteCart(userId)
    res.status(200).json({allDeleteCart})
})

const deleteCart = catchAsync(async (req, res) => {
    const { userId, productOptionId } = req.body;

    if(!userId || !productOptionId) 
    {
        const error = new Error("Something Invalid..")
        error.statusCode=400;
        throw error;
    }
    const deleteCart= await cartService.deleteCart(userId, productOptionId)
    restart.status(200).json({deleteCart})
});
    
module.exports = {
    addCart,
    getUserCart,
    changeCartQuantity,
    deleteALLCart,
    deleteCart
    }