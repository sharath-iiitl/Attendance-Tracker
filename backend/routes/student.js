const express = require("express");
const AttendanceModel = require("../modules/Attendance");
const StudentModel = require("../modules/Students");

const app = express();

app.post("/student/count", async (request, response) => {
    try {
    const count = await AttendanceModel.countDocuments(request.body)
    response.status(200).json(count);
    }
    catch(err) {
        response.status(500).send(err)
    }
})

app.post("/student/strength", async (request, response) => {
    try {
    const count = await StudentModel.count()
    response.status(200).json(count);
    }
    catch(err) {
        response.status(500).send(err)
    }
})

app.post("/student/details", async (req, res) => {
    try {
        const details = await AttendanceModel.find(req.body)
        res.status(200).send(details)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

app.post("/student/details/dummy", async (req, res) => {
    try {
        const details = await StudentModel.find(req.body)
        res.status(200).send(details)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

app.post("/student/delete", async (request, response) => {
    try {
    const remove = await StudentModel.findByIdAndDelete(request.body._id)
    resonse.send(remove);
    }
    catch (error) {
        response.send(error);
    }
})

app.post("/students/send_details", async (request, response) => {
    try {
    const add_many = await StudentModel.insertMany(request.body.data);
    response.send(add_many);
    }
    catch (err) {
        response.send(err);
    }
});

module.exports = app;