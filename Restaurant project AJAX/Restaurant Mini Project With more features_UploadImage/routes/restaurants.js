const express = require('express')
const uuid = require('uuid')

const resUtils = require('../util/restaurants.utils')

const router = express.Router()
const multer = require("multer")
/*
const upload = multer({
  dest: "images"
})
*/
const storageConfig = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,"images")},
  filename: function(req,file,cb){
      cb(null,Date.now() +"-" + file.originalname)
    }
  }
)

const upload = multer({
  storage: storageConfig
})

//////////////////////////////////////////////////////

router.get('/restaurants',function(req,res){
   let order = req.query.order;
  let nextOrder = 'desc';

  if (order !== 'asc' && order !== 'desc') {
    order = 'asc';
  }

  if (order === 'desc') {
    nextOrder = 'asc';
  }

  const restaurants = resUtils.getStoredRestaurants();

  restaurants.sort(function (resA, resB) {
    if (
      (order === 'asc' && resA.name > resB.name) ||
      (order === 'desc' && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render('restaurants', {
    numberOfRestaurants: restaurants.length,
    storedRests: restaurants,
    nextOrder: nextOrder
  });
});



router.get('/restaurants/:rid',function(req,res){
    // To send back the right restaurant details!
    const restaurantId = req.params.rid
    //console.log(restaurantId)

    const restaurants = resUtils.getStoredRestaurants()

    for(const restaurant of restaurants){
        if(restaurantId === restaurant.rId){
           return res.render('restaurant-details',{restaurant}) 
        }
    }
})

router.get('/recommend',function(req,res){
    res.render('recommend')
})


router.post('/recommend', upload.single("image"), function(req,res){
    const restaurant = req.body
    const imageFile = req.file
    console.log(imageFile)
    restaurant.rId = uuid.v4()

    restaurant.imageUrl = imageFile.path

    const restaurants = resUtils.getStoredRestaurants()
    //restaurants.rId = restaurants.length
    restaurants.push(restaurant)

    resUtils.storeRestaurants(restaurants)

    res.redirect('confirm')
})

router.get('/confirm',function(req,res){
    res.render('confirm')
})


/* Edit a restaurant Route: /restaurants/:id/edit */
//get Route
router.get('/restaurants/:rid/edit', function(req, res) {
    const restaurantId = req.params.rid
    console.log(restaurantId)
    const restaurants = resUtils.getStoredRestaurants()
    
    const restaurant = restaurants.find(r => r.rId === restaurantId)
    console.log(restaurant)
    if (!restaurant) {
        return res.status(404).render('404')
    }
    
    res.render('edit-restaurant', { restaurant })
})

//post Route
router.post('/restaurants/:rid/edit',upload.single("image"),function(req,res){
    const restaurantId = req.params.rid
    console.log(restaurantId)
    const updatedData = req.body

    const imageFile = req.file


    //get the old restaurants
    const restaurants = resUtils.getStoredRestaurants()
    console.log(restaurants)
    //Find the right index
    const restaurantIndex = restaurants.findIndex(r => r.rId === restaurantId)

    console.log(restaurantIndex)
    if (restaurantIndex === -1) {
        return res.status(404).render('404')
    }

    // Update the restaurant data
    restaurants[restaurantIndex] = {
        ...restaurants[restaurantIndex],
        name: updatedData.name,
        address: updatedData.address,
        cuisine: updatedData.cuisine,
        website: updatedData.website,
        description: updatedData.description,
        imageUrl: imageFile.path
    }

    //Store the updated Restaurants data
    resUtils.storeRestaurants(restaurants)

    res.redirect('/restaurants')
})

/* Delete a Restaurant Route */
// Delete restaurant route - must come before /restaurants/:rid
router.get('/restaurants/:rid/delete', function(req, res) {
    const restaurantId = req.params.rid
    const restaurants = resUtils.getStoredRestaurants()
    
    const filteredRestaurants = restaurants.filter(r => r.rId !== restaurantId)
    
    if (filteredRestaurants.length === restaurants.length) {
        return res.status(404).render('404')
    }
    
    resUtils.storeRestaurants(filteredRestaurants)
    res.redirect('/restaurants')
})


module.exports = router