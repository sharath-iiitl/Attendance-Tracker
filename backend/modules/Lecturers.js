const mongoose = require("mongoose");

const LecturerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    mail : {
        type : String,
        required : true
    },
    course : {
        type : String,
        required : true
    }
},
    { collection : "Lecturers"}
);

const Lectures = mongoose.model("Lectures", LecturerSchema);

module.exports = Lectures;