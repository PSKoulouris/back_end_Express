const db = require ('../data/database')


class UserDatabase {
    constructor(name, email, street, streetNumber) {
        this.name = name
        this.email = email
        this.address = {
            street: street,
            streetNumber : streetNumber
        }
    }

    //Full address:
    fullAddress(){
        return `address: ${this.address.streetNumber} ${this.address.street}`
    }

    //Save users to database collection:
    async saveUsersToDatabase(){
        await db.getDb().collection('database_users').insertOne({
            name : this.name,
            email : this.email,
            address : this.address
        });
    }

    //Retrieve users from database collection:
     static async fetchAll(){
        const usersList = await db.getDb().collection('database_users').find().toArray()
        //return usersList

         return usersList.map(function (data) {
                 return new UserDatabase(
                    data.name,
                    data.email,
                    data.address.street,
                    data.address.streetNumber
                 );
                });
     }

}


module.exports = UserDatabase
