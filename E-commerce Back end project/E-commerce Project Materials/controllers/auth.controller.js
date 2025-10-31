const User = require('../models/user.model');
const authUtil = require('../util/authentication');

function getSignup(req, res) {
  res.render('customer/auth/signup');
}

async function signup(req,res){
    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    )
    await user.signup()
    res.redirect('/login')
}

function getLogin(req, res) {
  //show the login page:
  res.render('customer/auth/login');
}




async function login(req, res) {
    const user = new User(req.body.email,req.body.password)
    const existingUser = await user.getUserWithEmail()

    if(!existingUser){
      return res.redirect('/login')
    }
    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password)    

    if(!passwordIsCorrect){
        return res.redirect('/login')
    }

    authUtil.createUserSession(req, existingUser, function() {
      res.redirect('/')
    })
  
  }


module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup : signup,
  login : login
};