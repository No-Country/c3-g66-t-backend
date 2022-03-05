const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const ErrorResponse = require("../helpers/ErrorResponse");
const User = require("../models/User");

class Auth {
  async register(user) {
    user.password = await this._encrypt(user.password);
    const newUser = await User.create(user);
    const token = this._generateToken(newUser._id);
    const { firstname, lastname, dni, email, phone, img, createdAt } = newUser;
    return {
      firstname,
      lastname,
      dni,
      email,
      phone,
      img,
      createdAt,
      token,
    };
  }

  async login(email, password) {
    const user = await User.findOne({ email }).select("-__v -updatedAt");
    if (!user) {
      throw new ErrorResponse(400, undefined, "email or password are wrong");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new ErrorResponse(400, undefined, "email or password are wrong");
    }
    user.password = undefined;
    const token = this._generateToken(user._id);
    user.token = token;

    return { ...user._doc, token };
  }

  async _encrypt(password) {
    return await bcrypt.hash(password, 10);
  }

  _generateToken(id) {
    return jwt.sign({ id }, config.jwt.secret, {
      expiresIn: config.jwt.expires,
    });
  }
  async validateToken(token) {
    if (!token) {
      throw new ErrorResponse(401, "Authentication Failed", "Token Required");
    }
    if (!token.startsWith("Bearer")) {
      throw new ErrorResponse(401, "Authentication Failed", "Invalid Token");
    }
    token = token.split(" ")[1];
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      const id = decoded.id;
      const user = await User.findById(id);
      if (!user) {
        throw new ErrorResponse(401, "Authentication Failed", "Invalid Token");
      }
      return user;
    } catch (error) {
      throw new ErrorResponse(401, "Authentication Failed", "Invalid Token");
    }
  }
}

module.exports = new Auth();
