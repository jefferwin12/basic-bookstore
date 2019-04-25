const joi = require('joi');

/**
 * Create joi validation schema
 * @param {object} specs - object schema
 * @return {object}
 */
function createSchema(specs) {
  const propNames = Object.keys(specs);
  const values = Object.values(specs);
  const joiObject ={};
  for (let i = 0; i < propNames.length; i++) {
    Object.assign(joiObject, {[propNames[i]]: values[i]});
  }
  return joi.object().keys(joiObject);
}
/**
 * Validate object using schema
 * @param {object} objectEvaluated - object to be evaluated
 * @param {object} schema - schema to use for validating the object
 * @return {bool}
 */
function validate(objectEvaluated, schema) {
  return !joi.validate(objectEvaluated, schema).error;
}
/**
 * Evaluates an object to be a valid supply
 * @param {object} payload - object to be evaluated
 * @return {bool}
 */

function validSupply(payload) {
    const schema = createSchema({
      title: joi.string().required(),
      genre: joi.string().required(),
      price: joi.number().integer().min(1).max(10000).required(),
      ratings: joi.number().integer().min(1).max(5).required(),
    });
    return validate(payload, schema);
  }

  module.exports = {
    validSupply,
  };