const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  subId: {
    type: String,
    required: false,
  },

  metrics: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  weight: {
    type: String,
    required: false,
  },
  halfYearTarget: {
    type: String,
    required: false,
  },
  firstQuarter: {
    type: String,
    required: false,
  },
  assignees: [
    {
      assigneeId: {
        type: String,
        required: false,
      },
      assignedWeight: {
        type: String,
        required: false,
      },
      halfYearTarget: {
        type: String,
        required: false,
      },
      firstQuarter: {
        type: String,
        required: false,
      },
    },
  ],
  assigneeTeam: [
    {
      assigneeId: {
        type: String,
        required: false,
      },
      assignedWeight: {
        type: String,
        required: false,
      },
      halfYearTarget: {
        type: String,
        required: false,
      },
      firstQuarter: {
        type: String,
        required: false,
      },
      assignees: [
        {
          assigneeId: {
            type: String,
            required: false,
          },
          assignedWeight: {
            type: String,
            required: false,
          },
          halfYearTarget: {
            type: String,
            required: false,
          },
          firstQuarter: {
            type: String,
            required: false,
          },
        },
      ],
    },
  ],
  createdBy: {
    type: String,
    required: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Activities = mongoose.model("Activity", activitySchema);
module.exports = Activities;
