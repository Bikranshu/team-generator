require('@babel/register');

const dbConfig = require('./src/platforms/config/database');

module.exports = Object.assign({}, dbConfig.default);
