const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  FirstName:{
    type: String,
    required: true,
    text:true,
    trim:true
  },
  LastName:{
    type: String,
    required: true,
    text:true,
    trim:true
  },
  Phone_Number:{
    type: String,
    required: true,
    text:true,
    trim:true
  },
  Email:{
    type: String,
    required: true,
    text:true,
    trim:true
  },
});
module.exports = mongoose.model("User", userSchema);
