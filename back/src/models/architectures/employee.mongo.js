const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  deputyId: {
    type: String,
    required: false,
  },
  directorateId: {
    type: String,
    required: false,
  },
  teamId: {
    type: String,
    required: false,
  },

  name: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    lowercase: true,
    unique:true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ userEmail: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw Error("የተሳሳተ የይለፍ ቃል");
  }
  throw Error("የተሳሳተ ኢሜይል");
};

const Employees = mongoose.model("Employee", userSchema);
module.exports = Employees;
