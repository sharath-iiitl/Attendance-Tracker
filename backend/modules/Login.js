const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    role: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required : true,
      unique : true
    },
    password : {
        type : String,
        required : true
    }
  },
    { collection : "User" }
  );
  
const User = mongoose.model("User", UserSchema);
  
module.exports = User;