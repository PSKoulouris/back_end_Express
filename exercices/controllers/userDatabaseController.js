const UserDatabase = require('../model/userModelDatabase')


//Save data t colection: 
async function saveData(req, res, next) {
    const user = new UserDatabase(
        req.body.name_name,
        req.body.name_email,
        req.body.name_street,
        req.body.name_streetNumber
    )

    try{
       await user.saveUsersToDatabase()
    } catch(error) {
        return next(error)
    }

    res.redirect('/database_users_form')
}

//REtrieve data from collection:

async function listUsers(req, res, next){
    try{
        const userList = await UserDatabase.fetchAll()
        res.render('database_users_form', {userList : userList})
    } catch (error){
        next(error)
    }
}

module.exports = {
    saveData : saveData,
    listUsers : listUsers
}