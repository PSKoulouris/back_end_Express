//Connection to Mongodb:

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let database

async function connectToDatabase() {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017')
    database = client.db('data_exercices')
}

function getDb() {
    if (!database) {
        throw new Error("database not connected")
    }
        return database
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
    
}