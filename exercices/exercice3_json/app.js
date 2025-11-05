const express = require ("express");
const app  = express();

const path = require ('path')
const fs = require('fs')

app.set('view engine', 'ejs')
//app.set('views', __dirname)

app.use(express.urlencoded({extended:true}))

app.get('/', function(req, res){
    res.render('index')
})

app.post('/saveData', function (req, res){
    console.log("route saveData triggered")
    const userData = req.body

    const filePath = path.join(__dirname, 'data', 'users.json')

    const usersFile = fs.readFileSync(filePath)
    const usersFileArr = JSON.parse(usersFile)

    usersFileArr.push(userData)
    const newUsersFileJSON = JSON.stringify(usersFileArr)

    fs.writeFileSync(filePath, newUsersFileJSON)

    res.redirect('/')

})

app.listen(3000)