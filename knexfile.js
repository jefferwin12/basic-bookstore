//var mysql = require('mysql');
require('dotenv').config();

const {MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB} = process.env;
module.exports = {
    client: 'mysql',
    connection: {
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DB,
    },
};

//local mysql db connection
// const mysqlConnection = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DB,
//     multipleStatements: true
// });

// mysqlConnection.connect(function(err) {
//     if (err) throw err;
// });

// module.exports = mysqlConnection;

