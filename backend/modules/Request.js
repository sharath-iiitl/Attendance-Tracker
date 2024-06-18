const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    branch : {
        type : String,
        required : true
    },
    roll_no : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        required : true,
    },
    reason : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    start_date : {
        type : String,
        required : true
    },
    end_date : {
        type : String,
        required : true
    }
},
    { timestamps : true },
    { collection : "Request" }
);

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;