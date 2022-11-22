const { cartService } = require('../services')

const addCart = async(req,res)=>{
    try{
        const {userId, productOptionId, quantity}= req.body
        console.log(userId)
        console.log(productOptionId)
        console.log(quantity)
        if(!userId || !productOptionId|| !quantity){
            return res.status(400).json({message: "Invaild Key Error"})
        }
        const result = await cartService.addCart(userId, productOptionId, quantity)
        return res.status(201).json({message: "Success Input Key_Values"})
    }catch (error) {

        res.status(error.statusCode || 500).json({ message: error.message})
    }
};

const getUserCart = async (req, res) => {
    try{
        const {userId}=req.params
        console.log(userId)
        if(!userId) {
            return res.status(400).json({message : "Wrong_userId_error"})
        }
            console.log(req.body)    
            const getUserCart = await cartService.getUserCart(userId);
            res.status(200).json({data:getUserCart});
    }catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message})
    }
};

const changeCartQuantity = async (req, res) => {

    try{
        const { userId, productOptionId, quantity } = req.body;
        if(!userId || !productOptionId|| !quantity){
            const error = new Error("Key Error");
        }
        console.log(req.body)
        const changeCartQuantity = await cartService.changeCartQuantity(userId, productOptionId, quantity)
        res.status(200).json({changeCartQuantity});
}catch(error){
    res.status(error.statusCode||500).json({message: error.message})
}}
    

const deleteALLCart = async (req, res) => {
    try{
        const{userId}=req.body;
        if(!userId) {
            const error = new Error("ALL DELETE ERROR")
        }
        console.log(req.body)
        const allDeleteCart = await cartService.allDeleteCart(userId)
        res.status(200).json({allDeleteCart})
    }catch(error){
        res.status(error.statusCode||500).json({message: error.message})
    }
    }

const deleteCart = async (req, res) => {
    try{const { userId, productOptionId } = req.body;
    if(!userId || !productOptionId) {
        const error = new Error("Something Invalid..")
    }
        console.log(req.body)
        const deleteCart= await cartService.deleteCart(userId, productOptionId)
        restart.status(200).json({deleteCart})
    }catch(error){
        res.status(error.statusCode||500).json({message:error.message})
    }};
    
module.exports = {
    addCart,
    getUserCart,
    changeCartQuantity,
    deleteALLCart,
    deleteCart
    }