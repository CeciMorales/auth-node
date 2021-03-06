const knex = require('../database/connection');
const bcrypt = require('bcryptjs');


/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.findById = (id) => {
  return knex
    .select('*')
    .from('users')
    .where('id', id)
    .first();
}

/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.findByEmail = (email) => {
  console.log('model: ', email);
  return knex
    .select('*')
    .from('users')
    .where('email', email)
    .first();
}

exports.create = (user) => {
  // cifrar password
  let pass = user.password;
  pass = bcrypt.hashSync(pass, 10);

  // tabla se llama users
  return knex('users')
    .insert({name:user.name,
            email:user.email,
            password: pass,
            role: user.role})
}

exports.showAll = () => {
  return knex
    .select('*')
    .from('users')
}
