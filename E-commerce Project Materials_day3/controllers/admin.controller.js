const Product = require('../models/product.model')

async function getProducts(req,res,next){
    //let products
    try{
        const products = await Product.findAll()
        res.render('admin/products/all-products',{products : products})
    }catch(error){
        return next(error)
    }
    
}


function getNewProduct(req,res){
    res.render('admin/products/new-product')
}

async function createNewProduct(req,res,next){
    console.log(req.body)
    console.log(req.file)

    // creating a product object
    const product = new Product({
      ...req.body,
      image: req.file.filename 
    })

    try{
        await product.save()
    }catch(error){
        return next(error)
    }

    res.redirect('/products')
}

async function getUpdateProduct(req,res,next){
    let product
    try{
        const product = await Product.findById(req.params.id)
        res.render('admin/products/update-product', {product : product})
    }catch(error){
        return next(error)
    }

}


async function updateProduct(req,res,next){
    const product = new Product({
        ...req.body,
        _id : req.params.id
    })

    if(req.file){
        product.replaceImage(req.file.filename)
    }

    try{
        await product.save()
    }catch(error){
        next(error)
        return;
    }
}

async function deleteProduct(req,res,next){ // then create a route for /delete/:id
    let product 
    try{
        product = await Product.findById(req.params.id)
        await product.remove()
        // res.redirect('/products') avoid to redirect-to avoid conflict for requests
    } catch (error) {
        return next(error)
    }

    res.json({message : 'Product deleted'})
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    getProducts : getProducts,
    getNewProduct:getNewProduct,
    createNewProduct:createNewProduct,
    getUpdateProduct:getUpdateProduct,
    updateProduct:updateProduct,
    deleteProduct:deleteProduct
}