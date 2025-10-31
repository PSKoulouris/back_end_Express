const User = require('../models/user.model')
const authUtil = require('../util/authentication')

const validation = require('../util/validation')
const sessionFlash = require('../util/session-flash')
const session = require('express-session')

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req)
  if(!sessionData){
    sessionData = {
      email : '',
      confirmEmail : '',
      password : '',
      fullname : '',
      street : '',
      postal : '',
      city : ''
    }
  }
  res.render('customer/auth/signup', {inputData : sessionData});
}


async function signup(req,res,next){

  const enteredData = { 
    email: req.body.email,
    password : req.body.password,
    fullname : req.body.fullname,
    street : req.body.street,
    postal : req.body.postal,
    city : req.body.city
}

  //user input validation  before returning:
  if(
    !validation.userInputValidation(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city)
    || !validation.emailIsConfirmed(req.body.email,req.body['confirm-email']) // confirm-email is a compund name with "-" and normal name is not suported.
  ){
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: 'Please check your input. Password must be 6 characters long and the postal coe wmust be at least 5 characters long',
        ...enteredData
      },
      function(){
        return res.redirect('/signup')
      }
    )
    
  }
    const user = new User(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    )


    try {
      const existsAlready = await user.existsAlready()
      if(existsAlready){
        sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: 'User already exists; Logging in instead.',
          ...enteredData
        },

        function(){
        return res.redirect('/signup')
      }
    )
  }
      await user.signup()

  } catch (error) {

      return next(error) //return to stop the function once executed.
  }

    res.redirect('/login') //get Login function 
}



function getLogin(req, res) {
  //retrieve the error message from the session: 
  let sessionData = sessionFlash.getSessionData(req)
  if(!sessionData){
      sessionData = {
        email : '',
        password : ''
      }
    }

  res.render('customer/auth/login', {inputData : sessionData})
}



async function login(req,res){
  const user = new User(req.body.email,req.body.password)
  //const exitingUser = await user.getUserWithEmail()
  let exitingUser

  try {
    exitingUser = await user.getUserWithEmail()
  } catch (error) {
    return next(error)
  }

  const sessionErrorData = {
    errorMessage : " Invalid Credentials -double check your aeamil and password",
    email : user.email,
    password : user.password
  }

  if(!exitingUser){
    sessionFlash.flashDataToSession(req,
      sessionErrorData,
      function(){
        res.redirect('/login')
    }
  )
  return  res.redirect('/login')
  }

  const passwordIsCorrect = await user.hasMatchingPassword(exitingUser.password)

  if(!passwordIsCorrect){
    return res.redirect('/login')
  }

  authUtil.createUserSession(req,exitingUser,function(){
    res.redirect('/')
  })

}



function logout(req,res){
  authUtil.destroyUserAuthSession(req)
  res.redirect('/login')
}


///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup : signup,
  login:login,
  logout : logout
};