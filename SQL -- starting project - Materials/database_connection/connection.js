//install MySQL2:
const mysql = require("mysql2/promise");

const pool = mysql.createPool({  // ensures many people can connect at the same time and not one at a time 
    "host": "localhost",
    "user": "root",
    "database": "blog",
    "password": "Stephane86!"
})

module.exports = pool;