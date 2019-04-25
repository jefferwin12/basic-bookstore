require('app-module-path').addPath(require('app-root-path').toString());
require('dotenv').config();

const MySqlService = require('api/services/MySqlService');
const service = new MySqlService();

const createBook = async (title, genre, price, ratings) => {
    const newBook = {
      title,
      genre,
      price,
      ratings,
    };
    try {
      return await service.insertToTable(
          process.env.BOOKS_TABLE,
          newBook,
      );
    } catch (error) {
      throw new Error(error);
    }
  };
  

const getBooks = async () => {
    const fields = ['id', 'title', 'genre', 'price', 'ratings'];
    try {
        return await service.getTableContents(
            process.env.BOOKS_TABLE,
            fields,
        );
    }catch (error) {
        throw new Error(error);
    }
};

const getBook = async (id) => {
    const fields = ['id', 'title', 'genre', 'price', 'ratings'];
    try {
        return await service.getTableRow(
            id,
            process.env.BOOKS_TABLE,
            fields,
        );
    }catch (error) {
        throw new Error(error);
    }
};

const getBookByName = async (title)=> {
  const fields = ['title', 'genre', 'price', 'ratings'];
  try {
    return await service.getTableRowByName(
            title, 
            process.env.BOOKS_TABLE,
            fields,
        );
  } catch (error) {
    throw new Error(error);
  }
};

const getBookById = async (id)=> {
  // try to specify fields to be retrieved when using inner join
  try {
    const fields = ['title', 'genre', 'price', 'ratings'];
    return await service.getTableRow(id, process.env.BOOKS_TABLE, fields);
  } catch (error) {
    throw new Error(error);
  }
};

// const updateBooks = async (id, fields, values) => {
//     return await service.updateTableRow(
//         id,
//         process.env.BOOKS_TABLE,
//         fields,
//         values,
//     );
// };

module.exports = {
    getBooks,
    getBook,
    createBook,
    getBookByName,
    getBookById,
    //updateBooks,
};