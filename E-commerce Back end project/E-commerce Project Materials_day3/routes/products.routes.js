const express = require('express')
const productsController = require('../controllers/products.controller') //comment out the old version of the route and add router.get

const router = express.Router()

//router.get('/products', function(req,res){
 //   res.render('customer/products/all-products')
//})

router.get ('/products', productsController.getAllProducts)
router.get('/products/:id', productsController.getProductDetails)

module.exports = router