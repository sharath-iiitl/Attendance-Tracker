const express = require("express");
const mongoose = require("mongoose");
const Attendance = require("./routes/attendance");
const Students = require("./routes/student");
const Login = require("./routes/login");
const Request = require("./routes/request")

const PORT = process.env.PORT || 8082;

var cors = require("cors");

const app = express();

app.use(cors({ origin : true, credentials : true }));
app.use(express.json());
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:8082');
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
//   });

const URL = "mongodb+srv://user:7en1GDf0xij7durN@default.borpg.mongodb.net/?retryWrites=true&w=majority";

mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDb"))
    .catch((err) => (console.log(err)));

app.use(Attendance);
app.use(Students);
app.use(Login);
app.use(Request);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});