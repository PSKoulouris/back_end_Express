const express = require('express')
const router = express.Router()

const path = require ('path')
const fs = require('fs')
const uuid = require('uuid')
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const filePath = path.join(__dirname,'..', 'data', 'users.json')

router.post('/saveData', function (req, res){
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




router.get('/displayData', function(req, res){
        
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

       res.render('displayData', {result : userDataArr, numberOfUsers : userDataArr.length, nextOrder : 'asc'})
})

router.get('/back', function(req,res){
    res.redirect('/')
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//sorting Asc or desc user names:

router.get('/usersOrder', function(req,res){
    let order = req.query.order
    let nextOrder = 'desc'

    if( order !== 'asc' && order !== 'desc'){
        nextOrder = 'asc'
    }
    if( order === 'desc'){
        nextOrder = 'asc'
    }

    const userData = fs.readFileSync(filePath)
    const userDataArr = JSON.parse(userData)

    userDataArr.sort(function(userA, userB){
        if( order === 'asc' && userA.name.toLowerCase() > userB.name.toLowerCase()) {
            return 1
        } else if (order === 'desc' && userB.name.toLowerCase() > userA.name.toLowerCase()) {
            return 1
        } else if (userA.name.toLowerCase() === userB.name.toLowerCase()) {
            return 0
        } else {
            return -1
        }

    })

    res.render('displayData', {result : userDataArr, numberOfUsers : userDataArr.length, nextOrder : nextOrder})

})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


router.get('/displayData/:id', function(req, res){

    const userId = req.params.id

    const userData = fs.readFileSync(filePath)
    const userDataArr = JSON.parse(userData)
    const specificUserData = userDataArr.find(function(i){
        return i.id === userId
    })
    if(!specificUserData){
        return res.status(404).render('error404')
    }

/*
    for(const i of userDataArr){
        if (userId === i.id){
            res.render('information', {i})
        }
    }*/

    res.render('information', {specificUserData})
})

router.get('/back_userData', function(req, res){
    res.redirect('/displayData')
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/displayData/:id/edit', function (req,res){

    const userId = req.params.id

    const userData = fs.readFileSync(filePath)
    const userDataArr = JSON.parse(userData)
    const specificUserData = userDataArr.find(function(i){
        return i.id === userId
    })

    res.render('data_edit', {specificUserData})
})

router.get('/cancel_edit', function(req, res){
    res.redirect('/displayData')
})

router.post('/displayData/:id/edit', function(req,res){
    const userId = req.params.id
    const updatedData = req.body

    const userData = fs.readFileSync(filePath)
    const userDataArr = JSON.parse(userData)

    const userIndex = userDataArr.findIndex(function(i){
        return i.id === userId
    })

    userDataArr[userIndex] = {
        ...userDataArr[userIndex],
        name : updatedData.name,
        email : updatedData.email
    }

    const userDataUpdated = JSON.stringify(userDataArr)
    fs.writeFileSync(filePath, userDataUpdated)

    res.redirect('/displayData')
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/displayData/:id/delete', function(req,res){
    const userId = req.params.id
    const userData = fs.readFileSync(filePath)
    const userDataArr = JSON.parse(userData)
    const userDataFiltered = userDataArr.filter(function(i){
        return i.id !== userId
    })
    console.log(userDataFiltered)
    const newUserDataFiltered = JSON.stringify(userDataFiltered)
    
    if(userDataFiltered.length === userDataArr.length ){
        return res.status(404).send("User not found")
    } else {
        fs.writeFileSync(filePath, newUserDataFiltered)
        res.redirect('/displayData')
    }
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/time', function(req,res){

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router

