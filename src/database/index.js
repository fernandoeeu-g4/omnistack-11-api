const knex = require('knex');

const settings = require('../../knexfile');

const connection = knex(settings.development);

module.exports = connection;
