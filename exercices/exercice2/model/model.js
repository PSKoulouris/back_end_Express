const dbConnection = require('../data/database')

class Data {

    static async getData(){
        const data = await dbConnection.getDb().collection('information').find().toArray()
        return data
    }

}

module.exports = Data