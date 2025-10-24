const db = require('../data/database')
const mongodb = require('mongodb')

class Product{

    constructor(productData){
        this.title = productData.title
        this.summary = productData.summary
        this.price = +productData.price
        this.description = productData.description
        this.image = productData.image // it will retreive the file name
        this.updateImage()
        if(productData._id){
            this.id = productData._id.toString()
        }
    }
    /** UPDATE IMAGE TO BE CONTINUED ... **/
    updateImage(){
        this.imagePath = `product-data/images/${this.image}` // !!
        this.imageUrl = `/product-data/assets/images/${this.image}` // !!
    }

    replaceImage(newImage){
        this.image = newImage //the name of the img
        this.updateImage()
    }

    async save(){
        const productData = {
            title : this.title,
            summary : this.summary,
            price : this.price,
            description : this.description,
            image : this.image // to store the image name
        }

        if(this.id){
            const productId = new mongodb.ObjectId(this.id)

            if(!this.image){
                delete productData.image
            }

            await db.getDb()
            .collection('products')
            .updateOne(
                {_id :productId },
                {$set:productData}
            )
        }else{
            await db.getDb().collection('products').insertOne(productData)
        }
        
    }

    static async findAll(){
        const products = await db.getDb().collection('products').find().toArray()

        return products.map(function(productDocument){
            return new Product(productDocument)
        })
    }

    static async findById(productId){
        let prodId
        try{
            prodId = new mongodb.ObjectId(productId)
        }catch(error){
            error.code = 404
            throw error
        }

      
        const product = await db.getDb().collection('products').findOne({_id : prodId})
        

        if(!product){
            const error = new Error('Could not find the Id')
            error.code = 404
            throw error
        }

        return new Product(product)
    }

    remove(){
        const prodId = new mongodb.ObjectId(this.id)
        return db.getDb().collection('products').deleteOne({_id : prodId}) //givesback a promess returned into the admin controller
    }


}

module.exports = Product