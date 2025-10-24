const express = require ('express')
const router = express.Router()
const controller = require('../controllers/userController')
const databaseController = require('../controllers/userDatabaseController')


//data routes
//router.get('/userData', controller.listUsers)

router.post('/store-user', controller.writeUsersRedirect)

router.post('/database_users_form', databaseController.saveData)

//router.get('/database_users_form', databaseController.listUsers)

router.get('/listUser', databaseController.listUsers)


//Base routes
router.get('/database_users_form', function(req, res){
    res.render('database_users_form')
})

module.exports = router




