const path = require('path')
const fs = require('fs')

const filePath = path.join(__dirname,'..','data','restaurants.json')

function getStoredRestaurants(){
    const fileData =  fs.readFileSync(filePath)
    const restaurants = JSON.parse(fileData)
    return restaurants
}

function storeRestaurants(r){
    fs.writeFileSync(filePath, JSON.stringify(r))
}

module.exports = {
    getStoredRestaurants : getStoredRestaurants,
    storeRestaurants : storeRestaurants
}