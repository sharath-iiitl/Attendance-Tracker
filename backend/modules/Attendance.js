const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
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
    course_name : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
},
    { timestamps : true },
    { collection : "Attendance" }
);

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;