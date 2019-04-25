require('dotenv').config();
const knex = require('knex') (require('knexfile'));

class MySqlService {

    async insertToTable(table, properties) {
        await knex(table).insert(properties);
        return properties;
    }

    async getTableContents(table, fields) {
        return await knex.select(
            ...fields
        ).from(table);
    }

    async getTableRow(id, table, fields) {
        return await knex.where({ 
            id, 
        }).select(...fields)
        .first()
        .from(table);
    }

    async getSpecificFieldsOfRow(table, fields, prop, value) {
        try{
            return await knex.where({
                [prop]: value,
            }).select(...fields)
            .from(table).first();
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async updateTableRow(id, table, fields, values) {
        if(fields.length !== values.length) {
            throw new Error('Provided invalid key/value pairs');
        }
        const updateModel = {};
        for(let x= 0; x < fields.length; x++) {
            updateModel[fields[x]] = values[x];
        }
        try {
            return await knex.where({
                id,
            })
            .update(updateModel)
            .from(table);
        }catch (error) {
            throw new Error(error);
        }
    }

    async getTableRowByName(title, table, fields) {
        try {
          return await knex.where({title}).select(...fields)
              .first()
              .from(table);
        } catch (error) {
          throw new Error(error);
        }
      }
}

module.exports = MySqlService;