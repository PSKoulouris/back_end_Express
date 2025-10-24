const mongoDB = require('mongodb');
const MongodbClient = mongoDB.MongoClient;

let database;

async function connect(){

     const client = await MongodbClient.connect("mongodb://127.0.0.1:27017") //get connection address from mongodbsh command in cmd
     database = client.db('blog') //databse name: blog
}

function getDB(){
    if(!database){
        throw {message: 'Database not connected'}
    }
    return database
}

module.exports = {
    connectToDatabase:connect,
     getDB : getDB
}