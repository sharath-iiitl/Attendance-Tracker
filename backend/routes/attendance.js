const express = require("express");
const AttendanceModel = require("../modules/Attendance");
const StudentModel = require("../modules/Students");

const app = express();

app.post("/attendance/get_students", async (request, response) => {
    try {
        const result = await StudentModel.find(request.body);
        response.status(200).json(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/attendance/get_attendance", async (request, response) => {
    try {
        const result = await AttendanceModel.find(request.body);
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

// app.post("/attendance/mark", async (request, response) => {
//     const user = new userModel(request.body);

//     try {
//         await user.save();
//         response.send(user);
//     } catch (error) {
//         // response.status(500).send(error);
//         response.send(error);
//     }
// });

app.post("/attendance/mark_students", async (request, response) => {
    try {
    const add_many = await AttendanceModel.insertMany(request.body.data);
    response.send(add_many);
    }
    catch (err) {
        response.send(err);
    }
});

app.put("/attendance/update_student", async (req, res) => {
    try {
        const updateduser = await AttendanceModel.updateOne(
            {_id : `${req.body._id}`}, 
            {
                $set : { status : `${req.body.status}`}
                // $currentDate : { updatedat: true }
            }
        );
        res.send(updateduser);
    }
    catch (error) {
        res.send(error);
    }
})

module.exports = app;