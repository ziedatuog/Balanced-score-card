const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: false,
  },
  net: {
    type: String,
    required: false,
  },
  reports: [
    {
      activityId: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: false,
      },
    },
  ],
  higher: {
    type: String,
    required: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const Reports = mongoose.model("Report", reportSchema);

module.exports = Reports;
