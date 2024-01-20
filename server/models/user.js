const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedSongs: { type: [String], default: [] },
  playList: { type: [String], default: [] },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: "Free" },
  emailToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      isAdmin: this.isAdmin,
      isVerified: this.isVerified,
    },
    process.env.JWTPRIVATEKEY,
    { expiresIn: "7d" }
  );
  return token;
};

const validate = (user) => {
  const schema = joi.object({
    username: joi.string().min(5).max(10).required(),
    email: joi.string().email().required(),
    password: passwordComplexity().required(),
  });
  return schema.validate(user);
};

const validatePassword = (password) => {
  return passwordComplexity().validate(password);
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validate, validatePassword };
