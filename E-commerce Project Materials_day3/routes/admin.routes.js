const adminController = require('../controllers/admin.controller')
const imageUploadMiddleware = require('../middlewares/image-upload')

const express = require('express')


const router = express.Router()

// For all the admin routes we will the /admin as prefix

router.get('/products', adminController.getProducts) // /admin/products

router.get('/products/new', adminController.getNewProduct) // /admin/products/new

router.post('/products',imageUploadMiddleware, adminController.createNewProduct)

router.get('/products/:id',adminController.getUpdateProduct)

router.post('/products/:id',imageUploadMiddleware,adminController.updateProduct)

router.delete('/products/:id',adminController.deleteProduct)

module.exports = router