const Stripe = require("stripe");

const { stripe } = require("../config");
const User = require("../models/User");
const ErrorResponse = require("../helpers/ErrorResponse");

class Reservation {
  constructor() {
    this.stripe = Stripe(stripe.secret_key);
  }
  async createCustomer(req) {
    await this.stripe.customer.create({
      address: {
        city: req.body.address.city || null,
        state: req.body.address.state || null,
        country: req.body.address.country || null,
        postal_code: req.body.address.postal_code || null,
      },
      preferred_locales: req.body.locale || "es_ES",
      name: `${req.user.firstname} ${req.user.lastname}`,
      email: `${req.user.email}`,
      phone: `${req.user.phone}`,
      tax: { ip_address: req },
    });
  }
  async retrievesCustomer(id) {
    return await this.stripe.customers.retrieve(id);
  }
  async updateCustomer(id, update) {
    return await this.stripe.customers.update(id, update);
  }
  async deleteCustomer(id) {
    return await this.stripe.customers.del(id);
  }
  async createPayment(user, payment) {
    return await this.stripe.paymentIntents.create({
      customer: user.customerId || undefined,
      currency: payment.currency,
      amount: payment.amount * 100,
      payment_method_types: ["card"],
      setup_future_usage: "on_session",
      description: payment.description,
    });
  }
  async addUserReservation(userId, data) {
    const { hotel_id, checkin_date, checkout_date, payment_id } = data;

    const reservation = {
      hotel_id,
      checkin_date,
      checkout_date,
      status: true,
      canceled: false,
      payment_id,
      createdAt: Date(),
    };
    return await User.findById(userId)
      .exec()
      .then(user => {
        if (!user) {
          throw new ErrorResponse(400, undefined, "User not found");
        }
        user.reservations.unshift(reservation);
        user.save();
        return user;
      });
  }
}

module.exports = new Reservation();
