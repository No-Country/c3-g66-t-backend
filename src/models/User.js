const { Schema, model } = require("mongoose");

const user = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    dni: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    password: { type: String, required: true },
    img: { type: String, required: true },
    customerId: { type: String },
    reservations: [
      {
        hotel_id: Number,
        checkin_date: String,
        checkout_date: String,
        status: Boolean,
        canceled: Boolean,
        payment_id: String,
        createdAt: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Users", user);
