
const productService = require("../services/productService")

const getproductById = async (req, res) => {
    try {
        const id = req.params.id
        if(!id){
            return res.status(400).json({message : "Key Invalid"})
        }
        console.log(id)
        const result = await productService.getProductById(id)
        return res.status(200).json(result)
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message})
    }
};

module.exports = {
   getproductById
}

