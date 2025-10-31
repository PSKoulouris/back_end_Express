const express = require('express');
const app = express();
const quoteRoutes = require('./routes/quote.routes')


//conect to database:

const db = require('./data/database');

//require routes 

/*
app.get('/', (req, res) => {
        res.send('Hello World!')
    })
*/

//middleware JSON from express
app.use(express.json())

app.use('/quote', quoteRoutes)

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



