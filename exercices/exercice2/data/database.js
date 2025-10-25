const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let database

async function initializeDb(){
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017')
    database = client.db('information')
    
}

function getDb(){
    if(!database){
        throw new Error('Database not created yet')
    }
    return database
}

module.exports = {
    initializeDb : initializeDb,
    getDb : getDb
}