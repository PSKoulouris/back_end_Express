const express = require('express');
const db = require('./data/database');

const app = express();
const todosRoutes = require('./routes/todos.routes')
const corsMidd = require('./middleware/cors')


//conect to database:



//require routes 

/*
app.get('/', (req, res) => {
        res.send('Hello World!')
    })
*/
app.use(corsMidd)
//middleware JSON from express
app.use(express.json())

app.use('/todos', todosRoutes)

app.use(function(error, req, res, next) {
    res.status(500).json({
        message : "something went wrong"
    })
})



db.initDb()
.then(function() {
    app.listen(3000);
}).catch(function() {
    console.log('Database connection failed')  
})



