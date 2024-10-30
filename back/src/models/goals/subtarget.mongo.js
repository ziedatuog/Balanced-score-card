const mongoose = require("mongoose");

const subtargetSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  targetId: {
    type: String,
    required: false,
  },
  subTitle: {
    type: String,
    required: false,
  },
  subWeight: {
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
    },
  ],
  assigneeDeputy: [
    {
      assigneeId: {
        type: String,
        required: false,
      },
      assignedWeight: {
        type: String,
        required: false,
      },
      assigneedDir: [
        {
          assigneeId: {
            type: String,
            required: false,
          },
          assignedWeight: {
            type: String,
            required: false,
          },
        },
      ],
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const Subtargets = mongoose.model("Subtarget", subtargetSchema);
module.exports = Subtargets;
