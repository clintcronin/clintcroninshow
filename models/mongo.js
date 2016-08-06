var mongoose = require("mongoose");
var config = require("./../config.js");

exports.mongoose = mongoose.connect(config.mongoUri);