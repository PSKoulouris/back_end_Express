const uuid = require ('uuid')
const usersModel = require("../model/userModel")

function listUsers(req, res){

    const users_data = usersModel.readUsers()

   /* const users_data = [
        {name : "philippe",
         email: "philippe@gmail.com"
        },
        {name : "Stephane",
        email: "stephane@gmail.com"
        }
    ]
*/

    res.render("users", {users_data})
}

function writeUsersRedirect(req, res){

    const userData = req.body
    userData.uId = uuid.v4()
    const parsedData = usersModel.readUsers()

    parsedData.push(userData)

    usersModel.writeUsers(parsedData)

    res.redirect('/')
}


module.exports = {
    listUsers : listUsers,
    writeUsersRedirect : writeUsersRedirect
}

