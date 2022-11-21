
const { appDataSource } = require("../models/dataSource");

const productDao = require("../models/productDao");


const getProductById = async (id) => {
    const result = await productDao.getProductById(id)
    return result;
}
module.exports = {
    getProductById
}