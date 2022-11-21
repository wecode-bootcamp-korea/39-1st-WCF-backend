const { cartService } = require('../services')

const additionCart = async(req,res)=>{
    try{
        const {userId, productOptionId, quantity}= req.body
        console.log(userId)
        console.log(productOptionId)
        console.log(quantity)
        if(!userId || !productOptionId|| !quantity){
            return res.status(400).json({message: "Invaild Key Error"})
        }
        const result = await cartService.additionCart(userId, productOptionId, quantity)
        return res.status(200).json(result)
    }catch (error) {

        res.status(error.statusCode || 500).json({ message: error.message})
    }
};

const getByCart = async (req, res) => {
    try{
        const {userId}=req.body
        if(!userId) {
            return res.status(400).json({message : "Wrong_userId_error"})
        }
            console.log(req.body)    
            const getByCart = await cartService.getByCart(req,body);
            res.status(200).json({getByCart});
    }catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message})
    }
};

const cartQuantityChange = async (req, res) => {

    try{
        const { userId, productOptionId, quantity } = req.body;
        if(!userId || !productOptionId|| !quantity){
            const error = new Error("quantityPlus Error");
        }
        console.log(req.body)
        const cartQuantityChange = await cartService.cartQuantityChange(userId, productOptionId, quantity)
        res.status(200).json({cartQuantityChange});
}catch(error){
    res.status(error.statusCode||500).json({message: error.message})
}}
    

const allDeleteCart = async (req, res) => {
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

const oneDeleteCart = async (req, res) => {
    try{const { userId, productOptionId } = req.body;
    if(!userId || !productOptionId) {
        const error = new Error("Something Invalid..")
    }
        console.log(req.body)
        const oneDeleteCart= await cartService.allDeleteCart(userId, productOptionId)
        restart.status(200).json({oneDeleteCart})
    }catch(error){
        res.status(error.statusCode||500).json({message:error.message})
    }};
    
module.exports = {
    additionCart,
    getByCart,
    cartQuantityChange,
    allDeleteCart,
    oneDeleteCart
    }
