const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  month: { type: String, required: true },
  date: { type: String, required: true },
  year: { type: String, required: true },
  likedSongs: { type: [String], default: [] },
  playList: { type: [String], default: [] },
  isAdmin: { type: Boolean, default: false },
  isVerified: {type: Boolean, default: false},
  emailToken: {type: String}
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    process.env.JWTPRIVATEKEY,
    { expiresIn: "7d" }
  );
  return token;
};

const validate = (user) => {
  const schema = joi.object({
    name: joi.string().min(5).max(10).required(),
    email: joi.string().email().required(),
    password: passwordComplexity().required(),
    month: joi.string().required(),
    date: joi.string().required(),
    year: joi.string().required(),
    gender: joi.string().valid("male", "female", "non-binary").required(),
  });
  return schema.validate(user);
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validate };
