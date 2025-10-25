const Data = require ('../model/model')

 async function getInformation(req,res, next){

    let data_api
    let data_names
    let data_id

    try{
        data_api = await Data.getData()

        data_names = data_api.map(function(item){
            return item.name
        })

        data_id = data_api[1]._id
        
    } catch (error) {

        return next(error)
    }

    res.json({
        data_description : data_names,
        data_matricules : data_id
    })
}

module.exports = {
    getInformation : getInformation
}