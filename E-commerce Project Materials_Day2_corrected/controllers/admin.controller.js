function getProducts(req,res){
    res.render('admin/products/all-products')
}


function getNewProduct(req,res){
    res.render('admin/products/new-product')
}

module.exports = {
    getProducts : getProducts,
    getNewProduct:getNewProduct
}