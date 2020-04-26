// Define Environment
const development = 'development';
const production = 'production';
const test = 'test';

var environment = development;

module.exports = require('./env/'+environment+'.js');