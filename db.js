const mongoose = require("mongoose"); 

mongoose.connect('mongodb://localhost:27017/authentication');
var conn = mongoose.connection;
module.exports = conn;
