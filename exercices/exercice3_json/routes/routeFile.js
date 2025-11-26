const express = require('express')
const router = express.Router()

const path = require ('path')
const fs = require('fs')
const uuid = require('uuid')

const multer  = require('multer')
//const upload = multer({ dest: 'uploads/' })
//to enable own configuration and changes in data, use own storage configuration:
const storageConfig = multer.diskStorage({
    destination: function(req,file,cb){ //cb(error, value) where cb is a callback function with error to return(null) and value is the folder path or folder name to save
        cb(null,"images")},
    filename: function(req,file,cb){
        cb(null,Date.now() +"-" + file.originalname)
    }
  }
)
const upload = multer({
  storage: storageConfig
})

//form enctype="multipart/form-data" returns a mutipart form data object as follow:
/*
req.body = {
  name: "Pizza Palace"
}

req.file = {
  fieldname: 'image',
  originalname: 'pizza.jpg',   // comes from filename in the multipart part
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: '1695008392345-pizza.jpg',  // renamed by diskStorage
  path: 'uploads/1695008392345-pizza.jpg',
  size: 204932
}*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const filePath = path.join(__dirname,'..', 'data', 'users.json')

router.post('/saveData', upload.single("image"), function (req, res){
    console.log("route saveData triggered")

    const userData = req.body
          userData.id = uuid.v4()
    //retrieve and save the saved image path into the userData under the key:imageURL
    //If no image upload, return path of a default image:
    let imagePath
    const imageData = req.file

    if(imageData){
        imagePath = "/" + imageData.path.replace(/\\/g, "/")
    }else{
        imagePath = "/images/defaultImage.jpg" 
    }

    userData.imageURL = imagePath

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
    console.log("data into object:", specificUserData)
    res.render('information', {specificUserData})
})

router.get('/back_userData', function(req, res){
    res.redirect('/displayData')
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Edit: get data to edit , edit data , and then post edited data
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

router.post('/displayData/:id/edit', upload.single("image"), function(req,res){
    const userId = req.params.id
    const updatedData = req.body

    const userData = fs.readFileSync(filePath)
    const userDataArr = JSON.parse(userData)

    const userIndex = userDataArr.findIndex(function(i){
        return i.id === userId
    })


    // condition: use new path if nea image updated or keep old path if no new image updated
    const dataImage = req.file
    
    let oldImagePath = userDataArr[userIndex].imageURL
    let newImagePath

    if (dataImage) {
         newImagePath = "/" + dataImage.path.replace(/\\/, '/')

        if(newImagePath !== "/images/defaultImage.jpg" || newImagePath !== oldImagePath){
            oldFilePath = path.join(__dirname,"..",oldImagePath)
            fs.unlinkSync(oldFilePath)
        }

    } else {
         newImagePath = userDataArr[userIndex].imageURL
    }

    //Update the information for specified index: 
    userDataArr[userIndex] = {
        ...userDataArr[userIndex],
        name : updatedData.name,
        email : updatedData.email,
        imageURL : newImagePath
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

