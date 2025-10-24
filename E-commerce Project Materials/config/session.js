const expressSession = require ("express-session");

const mongoDbStore = require ("connect-mongodb-session");

function createSessionStore() {
    const MongoDbStore = mongoDbStore(expressSession);

    const store = new MongoDbStore({
        uri: 'mongodb://127.0.0.1:27017',
        databaseName: 'online-shop',
        collection: 'sessions'
    });

    return store
}

function createSessionConfig() {
    return {
        secret: 'super-Secret2025!', //password here 
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(), //create session in database
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000 //2 day
        }
    }
}

module.exports = createSessionConfig