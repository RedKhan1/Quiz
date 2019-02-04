const mongoose = require("mongoose");
const moment = require("moment");
const now = moment();

const AdminSchema = new mongoose.Schema({
  email: {type: String, unique: true, default: ""},
	username: {type: String, default: ""},
	password: {type: String, default: ""},
	timestamp: {type: String, default: now.format("dddd, MMMM Do YYYY, h:mm:ss a")}
});


module.exports = mongoose.model("admins", AdminSchema);
