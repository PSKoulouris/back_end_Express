/*let my_name = "vanessa"

console.log(my_name)*/

const http = require('http')

function handleRequests(req,res){
    res.statusCode = 200
    res.end("<h1>Hello World!</h1>")
}


const server = http.createServer(handleRequests)


server.listen(3000)