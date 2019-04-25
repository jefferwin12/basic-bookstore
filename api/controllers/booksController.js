require('app-module-path').addPath(require('app-root-path').toString());
require('dotenv').config();

const TAG = '[booksController]';
const {map, pick} = require('lodash')
const logger = require('api/utilities/logger');
const {getBooks, createBook, getBookByName, getBookById} = require('api/repositories/bookRepository');
const HttpError = require('api/responses/HttpError');
const NotFoundError = require('api/responses/NotFoundError');
const HttpSuccess = require('api/responses/HttpSuccess');
const {validSupply} = require('api/utilities/validator2')

/*
function getBooks(req, res, next) {
        sql.query('SELECT * FROM bookstore2', (err, rows, fields) => {
            if(err){
                console.log(err);
            }else{
                res.send(rows);
                // res.render('../views/product_view', {
                //     results: results
                // });  
            }
        });
    };
*/

async function addBook(req, res, next) {
  try {
    const {title, genre, price, ratings} = req.body;
    const existingSupply = await getBookByName(title);
    if (existingSupply) {
      return next(new HttpError(403, 9999,
          'Supply item is already in the inventory'));
    } else {
      if (validSupply(req.body)) {
        const newSupply = await createBook(title,
            genre, price, ratings);
        res.locals.respObj = new HttpSuccess(200,
            `Successfully added new supply`,
            {newSupply: pick(newSupply,
                ['id', 'title', 'genre', 'price', 'ratings'])});
        return next();
      } else {
        return next(new HttpError(403, 9997, 'Invalid Supply details'));
      }
    }
  } catch (e) {
    return next(new HttpError(500, 9999, e.message));
  }
}

async function getAllBooks (req, res, next) {
    const METHOD =  '[getAllBooks]';
    logger.info(`${TAG} ${METHOD}`);
    const allBooks = await getBooks();
    res.locals.respObj = new HttpSuccess(
        200,
        'Successfully retrieved books',
        {
            result: allBooks,
        },
    );
    return next();
}

// async function getAllBooks(req, res, next) {
//     try {
//         const allBooks = await getBooks();
//         const booksSummary = map(allBooks, (row) => {
//             return {
//                 id: row.id,
//                 data: {
//                     title: row.title,
//                     genre: row.genre,
//                     price: row.price,
//                     ratings: row.price,
//                 },
//             };
//         });
//         console.log(booksSummary)
//         res.locals.respObj = new HttpSuccess(200,
//             `Successfully retrieve all supplies`, booksSummary);
//         // res.send(booksSummary);
//         return next();
//     } catch (e) {
//         return next(new HttpError(500, 9999, e.message));
//     }
// }

// async function getSingleBook(req, res, next) {
//     try {
//         const id = req.params.id;
//         const bookid = id;
//         const book = await getBook(id);
//         if(!book) {
//             return next (new NotFoundError('Supplies not Found'));
//         }
//         res.locals.respObj = new HttpSuccess(200,
//             'Successfully retrieve book details', {
//                 details: pick(book,
//                     ['id', 'title', 'genre', 'price', 'ratings']), 
//             })
//             return next();
//     }catch (e) {
//         return next (new HttpError(500, 9999, e.message));
//     }
// }

// async function getSingleBook(req, res, next) {
//     const METHOD = '[getSingleBook]';
//     logger.info(`${TAG} ${METHOD}`);
//     const {id} = req.params;
//     const singleBook = await getBook(id);
//     res.locals.resObj = new HttpSuccess(
//         200,
//         `Successfully retrieved Book with ID ${id}`,
//         {
//             result: singleBook,
//         },
//     );
//     return next();
// }

async function getSingleBook(req, res, next) {
  try {
    const {id} = req.params;
    const singlebook = await getBookById(id);
    res.locals.respObj = new HttpSuccess(200,
        `Successfully retrive details`, {
          result: singlebook,
        });
    return next();
  } catch (e) {
    return next(new HttpError(500, 9999, e.message));
  }
}

/*
function getbook(req, res, next) {
        sql.query('SELECT * FROM bookstore2 WHERE bookid = ?', [req.params.id], (err, rows, fields) => {
            if(err){
                console.log(err);
            }else{
                res.send(rows);
                //res.redirect('/')
            }
    })
};

function deletebook(req, res, next) {
    sql.query('DELETE FROM bookstore2 WHERE bookid = ?', [req.params.id], (err, rows, fields) => {
        if(err){
            console.log(err);
        }else{
            res.send(rows)
            //res.redirect('/');
        }
    });
};

async function addbook(req, res, next) {
    //create new book
     const newbook = await {
        title: req.body.title,
        genre: req.body.genre,
        price: req.body.price,
        ratings: req.body.ratings,
    }
        sql.query('INSERT INTO bookstore2 SET ?', newbook, (err, rows, fields) => {
            if(err){
                console.log(err);
            }else{
                res.send(rows);
                //res.redirect('/');
            }
        });
};

function editbook(req, res, next) {
    //edit book
    sql.query("UPDATE bookstore2 SET title='"+req.body.title +"', genre='"+req.body.genre+"' , price='"+req.body.price+"', ratings='"+req.body.ratings+"' WHERE bookid="+req.body.bookid, (err, rows, fields) => {
        if(err) {
            console.log(err)
        }else {
            res.send(rows);
            //res.redirect('/')
        }
    })
}

*/

module.exports = {
    getAllBooks, 
    getSingleBook,
    // deletebook,
    addBook,
    // editbook,
};