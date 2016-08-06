var config = require('./config.js');
var log4js = require('log4js');
var env = config[config.env];
log4js.configure(env.logger);
module.exports = log4js.getLogger();
