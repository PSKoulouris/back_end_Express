const mongodb = require('mongodb')
const db = require('../data/database')

class Order{

    constructor(cart,userData,status='pending',date,orderId){
        this.productData = cart
        this.userData = userData
        this.status = status
        this.date = new Date(date)
        if(this.date){
            this.formattedDate = this.date.toLocaleDateString('en-US',{
                weekday: 'short',
                day:'numeric',
                month:'long',
                year:'numeric'
            })
        }
        this.id = orderId // undefined
    }

    save(){
        if(this.id){
            const orderId = new mongodb.ObjectId(this.id)

            return db.getDb()
                .collection('orders')
                .updateOne({_id:orderId}, {$set : {status: this.status}})
        }else{
            const orderDocument = {
                userData : this.userData,
                productData : this.productData,
                date: this.date,
                status : this.status
            }
            return db.getDb().collection('orders').insertOne(orderDocument)
        }
    }
}

module.exports = Order