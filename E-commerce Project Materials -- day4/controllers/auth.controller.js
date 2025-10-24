const User = require('../models/user.model')
const authUtil = require('../util/authentication')
const validation = require('../util/validation')
const sessionFlash = require('../util/session-flash')


function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req)

  if(!sessionData){
    sessionData = {
      email : '',
      confirmEmail : '',
      password : '',
      fullname : '',
      street: '',
      postal: '',
      city : ''
    }
  }

  res.render('customer/auth/signup',{inputData : sessionData});
}

async function signup(req,res,next){

    const enteredData = {
      email: req.body.email,
      password: req.body.password,
      fullname : req.body.fullname,
      street : req.body.street,
      postal : req.body.postal,
      city : req.body.city
    } 

    if(
      !validation.userInputValidation(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city)
        || !validation.emailIsConfrimed(req.body.email,req.body['confirm-email'])
      ){
        sessionFlash.flashDataToSession(
          req, 
          {
            errorMessage: 'Please check you input. Password must be 6 characters long and the Postal code should be at least 5 characters long!',
            ...enteredData
          },
          function(){
            res.redirect('/signup') // get : signup ?? return!!
          }
        )
        return
    }

    const user = new User(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    )

    try{
      const existsAlready = await user.existsAlready()
      if(existsAlready){
        sessionFlash.flashDataToSession(
          req,
          {
            errorMessage : 'Email Already exists, Try logging in instead!',
            ...enteredData
          },
          function(){
            res.redirect('/signup')
          }
        )
        return
      }

      await user.signup()

    }catch(error){
      return next(error)
    }

    res.redirect('/login') // getLogin function!
}

function getLogin(req, res) {
  // retreive the errorMessage from the Session!
  let sessionData = sessionFlash.getSessionData(req)

  if(!sessionData){
    sessionData = {
      email : '',
      password : ''
    }
  }

  res.render('customer/auth/login', {inputData : sessionData})
}

async function login(req,res,next){
  const user = new User(req.body.email,req.body.password)

  let exitingUser
  try{
    exitingUser = await user.getUserWithEmail()
  }catch(error){
    return next(error)
  }

  const sessionErrorData = {
    errorMessage : 'Invalid Credentials - double-check your email and password',
    email : user.email,
    password : user.password
  }

  if(!exitingUser){
    sessionFlash.flashDataToSession(
      req,
      sessionErrorData,
      function(){
        res.redirect('/login')
      }
    )
    return
  }

  const passwordIsCorrect = await user.hasMatchingPassword(exitingUser.password)

  if(!passwordIsCorrect){
    sessionFlash.flashDataToSession(
      req,
      sessionErrorData,
      function(){
        res.redirect('/login')
      }
    )
    return
  }

  authUtil.createUserSession(req,exitingUser,function(){
    res.redirect('/')
  })

}

function logout(req,res){
  authUtil.destroyUserAuthSession(req)
  res.redirect('/login')
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup : signup,
  login:login,
  logout : logout
};