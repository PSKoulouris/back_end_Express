const path = require('path');

const csrf = require('@dr.pogodin/csurf')

const expressSession = require('express-session')
const createSessionConfig = require('./config/session')

const db = require('./data/database')

const addCsrfTokenMiddleware = require('./middlewares/csrf-token')
const checkAuthStatusMiddleware = require('./middlewares/check-auth')

const express = require('express');


const errorHandlerMiddelware = require('./middlewares/error-handler')
const authRoutes = require('./routes/auth.routes');
const baseRoutes = require('./routes/base.routes');
const productsRoutes = require('./routes/products.routes');



const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig))

app.use(csrf())
app.use(addCsrfTokenMiddleware)
app.use(checkAuthStatusMiddleware)

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);


//app.use()

app.use(errorHandlerMiddelware)

db.connectToDatabase()
.then(function(){
    app.listen(3000);
})
.catch(function(error){
    console.log(error)
    console.log("Failed to connect to the DB")
})
