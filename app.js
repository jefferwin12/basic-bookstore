require('app-module-path').addPath(require('app-root-path').toString());

const mysql = require('mysql');
const TAG = '[TAG]';
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const bookRouter = require('api/routers/booksRouter');
const hbs = require('hbs');
const path = require('path');
require('dotenv').config();
const logger = require('api/utilities/logger');

const HttpError = require('api/responses/HttpError');

const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (err) {
        console.error(`Database connection failed: ${err}`);
        return;
    }
    console.log('Mysql DB initialized');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/assets', express.static(__dirname + '/public'));

app.use('/books', require('api/routers/booksRouter'), _processResponse);

function _processResponse(req, res) {
    console.log('value of resp status:', res.locals.respObj.status);
    // return res.status(200).json(res.locals.respObj);
    return res.status(res.locals.respObj.status).json(res.locals.respObj);
}

app.use((error, req, res, next) => {
    logger.error(`${TAG} ${error}`);
    if(!(error instanceof HttpError)) {
        const errorObj = new HttpError();
        return res.status(errorObj.status).json(errorObj);
    }else {
        return res.status(error.status).json(error);
    }
});

app.listen(process.env.APP_PORT || 3000, async () => {
    console.log(`Application is now accessible at: ` +
      `${process.env.APP_HOST}:${process.env.APP_PORT}`);
});
  