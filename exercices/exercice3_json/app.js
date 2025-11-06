const express = require ("express");
const app  = express();

const path = require ('path')
const fs = require('fs')

app.set('view engine', 'ejs')
//app.set('views', __dirname)

app.use(express.urlencoded({extended:true}))

const uuid = require('uuid')


app.get('/', function(req, res){
    res.render('index')
})

const filePath = path.join(__dirname, 'data', 'users.json')

app.post('/saveData', function (req, res){
    console.log("route saveData triggered")
    const userData = req.body
          userData.id = uuid.v4()

    const usersFile = fs.readFileSync(filePath)
    const usersFileArr = JSON.parse(usersFile)

    usersFileArr.push(userData)
    const newUsersFileJSON = JSON.stringify(usersFileArr)

    fs.writeFileSync(filePath, newUsersFileJSON)

    res.redirect('/')

})

app.get('/displayData', function(req, res){
        
        const userData = fs.readFileSync(filePath)
        const userDataArr = JSON.parse(userData)
        
       /* let result = '<ul>'
        for(const user of userDataArr){
            result += '<li>' + user.name + user.email + '</li>'
        }
        result += '</ul>'
/*
        res.send(result)
        */
       //res.render('displayData', {result : result})

       res.render('displayData', {result : userDataArr})
})

app.get('/back', function(req,res){
    res.redirect('/')
})

app.listen(3000)