const fs = require("fs")
const path = require ("path")




const filePath = path.join (__dirname, "..", "data", "users.json")

function readUsers(){
    const file_data = fs.readFileSync(filePath)
    const data = JSON.parse(file_data)
    return data
}


function writeUsers(iData){
        fs.writeFileSync(filePath, JSON.stringify(iData))
}



module.exports = {
    readUsers: readUsers,
    writeUsers: writeUsers    
}



