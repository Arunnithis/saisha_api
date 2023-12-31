const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');


const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    date : {
        type : String,
        required : true
    }
})

contactSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Contact',contactSchema);