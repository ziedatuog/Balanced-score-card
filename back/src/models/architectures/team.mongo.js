const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
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
  name: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Teams = mongoose.model("Team", teamSchema);
module.exports = Teams;
