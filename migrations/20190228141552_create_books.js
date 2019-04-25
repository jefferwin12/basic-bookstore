/* eslint-disable linebreak-style */
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books1', function(t) {
      t.increments('id').primary();
      t.string('title').notNullable();
      t.string('genre').notNullable();
      t.string('price').notNullable();
      t.integer('ratings').notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('books1');
  };
  