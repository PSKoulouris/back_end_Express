const mongoDB = require('mongodb')

const MongodbClient = mongoDB.MongoClient

let database

async function connect(){
   const client = await MongodbClient.connect("mongodb://127.0.0.1:27017")
   database = client.db('blog')
}

function getDb(){
    if(!database){
        throw {message : "DB connection not established!"}
    }
    return database
}

module.exports = {
    connectToDatabase: connect,
    getDb : getDb
}
