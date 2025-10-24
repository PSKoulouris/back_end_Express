const express = require("express")
const path = require("path")
const fs = require("fs")
const uuid = require("uuid") //installed with npm install uuid
const db = require('./data/database')

const app = express()

const userRoutes = require('./routes/userRoutes')
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////



app.set('view engine', 'ejs')
app.set("views", path.join(__dirname,"views"))


app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))


//use routes from userRouter:
app.use('/', userRoutes)






/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/exercices", function(req,res){
    res.render("exercices")
})

app.get("/", function(req, res){
    res.render("home")
})


/*
app.post("/store-user",function(req,res){
    const username = req.body
    username.uId = uuid.v4()

    const fileDataPath = path.join(__dirname, "data", "users.json")
    const fileData = fs.readFileSync(fileDataPath)
    const users = JSON.parse(fileData)
    users.push(username)
    fs.writeFileSync(fileDataPath, JSON.stringify(users))
    //res.send("User stored successfully!");
    res.redirect("/")
})
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

db.connectToDatabase()
    .then(function(){
        app.listen(3000)
    })
    .catch(function(error){
        console.log(error)
    })

