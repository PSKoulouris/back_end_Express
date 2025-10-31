const Order = require('../models/order.model');
const User = require('../models/user.model');

const stripe = require('stripe')('test key here')

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render('customer/orders/all-orders', {
      orders: orders
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  console.log(cart);
  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  //Integrate payment method: Stripe
  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map(function(item) {
      return{
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title, 
          },
          unit_amount: +item.product.price.toFixed(2) * 100
        },
        quantity: item.quantity,
      }
    }),
      
    mode: 'payment',
    success_url: 'http://localhost:3000/orders/success', //`${YOUR_DOMAIN}/success.html`,
    cancel_url: 'http://localhost:3000/orders/failure'//`${YOUR_DOMAIN}/cancel.html`,
  });
  res.redirect(303, session.url);
  //res.redirect('/orders');
}

function getSuccess(req, res) {
  res.render('customer/orders/success');
}

function getFailure(req, res) {
  res.render('customer/orders/failure');
}



module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getFailure: getFailure
};