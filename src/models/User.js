const { Schema, model } = require("mongoose");

const user = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dni: { type: Number },
  email: { type: String, required: true },
  phone: { type: String },
  password: { type: String, required: true },
});

module.exports = model("Users", user);
