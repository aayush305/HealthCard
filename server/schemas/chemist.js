const mongoose = require('mongoose')
var chemistschema = new mongoose.Schema({
    userId:String,
    licence: String,
    shopname: String,
    DOE:Date,
    licence:String ,
    first_name:String,
    last_name:String,
    shop_name:String,
    contact:String,
    password:String,
    address:String
});
var chemist = mongoose.model("chemist", chemistschema);

module.exports = chemist;