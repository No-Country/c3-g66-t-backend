const { Schema, model } = require("mongoose");

const user = new Schema({});

module.exports = model("Users", user);
