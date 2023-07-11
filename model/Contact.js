const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');


const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    phone : {
        type : String,
        require : true,
        unique : true
    },
    date : {
        type : String,
        require : true
    }
})

contactSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Contact',contactSchema);