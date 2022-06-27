const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String
});

module.exports = mongoose.model("user", userSchema);