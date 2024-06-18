const express = require("express");
const RequestModel = require("../modules/Request");

const app = express();

app.post("/request/details", async (req, res) => {
    try {
        const details = await RequestModel.find(req.body)
        res.status(200).send(details)
    }
    catch (err) {
        res.status(500).send(err)
    }
});

app.post("/request/count", async (req, res) => {
    try {
        const count = await RequestModel.countDocuments(req.body)
        res.status(200).json(count)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

app.post("/request/post", async (request, response) => {
    const newRequest = new RequestModel(request.body);
    try {
    const savedRequest = await newRequest.save();
    response.status(200).send("Sent Successfully")
    }
    catch (err) {
        response.send(err);
    }
});

app.put("/request/update", async (req, res) => {
    try {
        const updateduser = await RequestModel.updateOne(
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
});

module.exports = app;