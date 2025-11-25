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
        //Ascending order
        if (order === 'asc'){
            if( userA.name.toLowerCase() > userB.name.toLowerCase()) {
            return 1
        } else {
            return -1
        }
    }
        //Descending order:
        if (order === 'desc'){
            if( userA.name.toLowerCase() > userB.name.toLowerCase()) { 
            return -1 
        }else{
            return 1
        }
    }

        if (userA.name.toLowerCase() === userB.name.toLowerCase()) {
            return 0
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
//exercice for time and sorting functions sort()
router.get('/time', function(req,res){

    const date1 = new Date()
    const date2 = new Date().toISOString()
    const date3 = new Date().toISOString().split('T')[0]
    const date4 = String(new Date().getFullYear()) + '-' + String(new Date().getMonth()) + '-'  + String(new Date().getDate())
    const date5 = new Date().toLocaleDateString('us')
    //Sorting function():

    const arrayA = [1,2,3,4,5,6,7,8,9,10]
    const arraySortedAsc = [...arrayA].sort(function(a,b){
        return a - b //return a negative number = Ascending
    })
    const arraySortedDesc = [...arrayA].sort(function(a,b){
        return b - a //return a positive number = Descending 
    })

    const arrayB = ["alpha", "beta","delta","epsilon"]
    const arraySortedAscString = [...arrayB].sort(function(a,b){
        if(a > b){return 1}
        if(a < b){return -1}
        if(a === b){return 0}
    })
    const arraySortedDscString = [...arrayB].sort(function(a,b){
        if(a > b){return -1}
        if(a < b){return 1}
        if(a === b){return 0}
    })
    
    
    res.send(`<p> ${date1} </p>
             <p> ${date2} </p>
             <p> ${date3} </p>
             <p> ${date4}</p>
             <p> ${date5} </p>
             <h2>Sorting Asc: ${arraySortedAsc}</h2>
             <h2>Sorting Dsc: ${arraySortedDesc}</h2>
             <h2>Sorting Asc String: ${arraySortedAscString}
             <h2>Sorting Dsc String: ${arraySortedDscString}
             `)
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router

