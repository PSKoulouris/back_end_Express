const Order = require('../models/order.model')
const User = require('../models/user.model')

/*function getOrders(){
    pass
}*/

async function addOrder(req,res,next){
    const cart = res.locals.cart

    let userDocument
    try{
        userDocument = await User.findById(res.locals.uid)
    }catch(error){
        return next(error)
    }

    const order = new Order(cart,userDocument)

    try{
        await order.save()
    }catch(error){
        return next(error)
    }

    req.session.cart = null
    res.redirect('/orders')
}

module.exports = {
    //getOrders : getOrders,
    addOrder : addOrder
}