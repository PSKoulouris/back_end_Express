const db = require('../data/database');
const bcrypt = require('bcryptjs')

//use csrf: pogodin/csurf:




//create a class for each user with constructor method:
class User {
    constructor(email, password, fullname, street,postal,city) {
        this.email = email;
        this.password = password;  // hash password: install npm install bcryptjs
        this.fullname = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        }
    }

    async signup(){
        const hashedPassword = await bcrypt.hash(this.password, 12) //12 is moderated level
       await db.getDb()
       .collection('users')
       .insertOne(
            {   email: this.email, 
                password: hashedPassword, 
                name: this.name, 
                address: this.address
            })
    }


    getUserWithEmail(){
        return db.getDb()
            .collection('users')
            .findOne({email: this.email}) //filter by email: if email does not exists then no need to check for password
    }
    hasMatchingPassword(hashedPassword){
        return bcrypt.compare(this.password, hashedPassword) //Compare password and hashed password
    }
}


module.exports = User

// in MongoDB: use online-shop to access databse
//db.users.find() to show the users after first user created account 