/* eslint-disable linebreak-style */
require('app-module-path').addPath(require('app-root-path').toString());

const books = require('data/books_data');

exports.seed = function(knex, Promise) {
  return knex('books1').del()
      .then(() => {
        return knex('books1').insert(books);
      })
};
