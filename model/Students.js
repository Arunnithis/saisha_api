const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');


const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    degree : {
        type : String,
        required : true
    },
    percentage : {
        type : Number,
        required : true,
    },
    rollno : {
        type : Number,
        required : true,
        unique : true
    }
})

studentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Student',studentSchema);