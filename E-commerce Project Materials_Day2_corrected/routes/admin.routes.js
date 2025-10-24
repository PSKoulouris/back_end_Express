const adminController = require('../controllers/admin.controller')

const express = require('express')


const router = express.Router()

// For all the admin routes we will the /admin as prefix

router.get('/products', adminController.getProducts) // /admin/products

router.get('/products/new', adminController.getNewProduct) // /admin/products/new

module.exports = router