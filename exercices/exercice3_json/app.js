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

       res.render('displayData', {result : userDataArr, numberOfUsers : userDataArr.length})
})

app.get('/back', function(req,res){
    res.redirect('/')
})

app.get('/time', function(req,res){

    const date1 = new Date()
    const date2 = new Date().toISOString()
    const date3 = new Date().toISOString().split('T')[0]
    const date4 = String(new Date().getFullYear()) + '-' + String(new Date().getMonth()) + '-'  + String(new Date().getDate())
    const date5 = new Date().toLocaleDateString('us')
    res.send(`<p> ${date1} </p>
             <p> ${date2} </p>
             <p> ${date3} </p>
             <p> ${date4}</p>
             <p> ${date5} </p>
             `)
})

app.listen(3000)