const mongoose = require("mongoose");

const targetSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  targetTitle: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
})
const Targets = mongoose.model("Target",targetSchema);
module.exports=Targets;
