const Targets = require("./target.mongo");
const Subtargets = require("./subtarget.mongo");
const Activities = require("./activity.mongo");

async function saveMainTarget(data) {
  const newItem = new Targets(data);
  await newItem.save();
}
async function saveSubTarget(data) {
  const newItem = new Subtargets(data);
  await newItem.save();
}

async function saveActivity(data) {
  const newItem = new Activities(data);
  await newItem.save();
}
async function getMainTarget() {
  return await Targets.find(
    {},
    {
      __v: 0,
      createdDate: 0,
    }
  );
}

async function getSubTarget() {
  return await Subtargets.find(
    {},
    {
      __v: 0,
      createdDate: 0,
    }
  );
}
async function getActivities() {
  return await Activities.find(
    {},
    {
      __v: 0,
      createdDate: 0,
    }
  );
}

async function getSubTargetSpecificItems() {
  return await Subtargets.find(
    {},
    {
      targetId: 1,
      _id: 1,
      subTitle: 1,
      subWeight: 1,
    }
  );
}

async function getActFor({ subId, id }) {
  return await Activities.find(
    { subId: subId, createdBy: id },
    {
      __v: 0,
      createdDate: 0,
      assignees:0,
      assigneeTeam:0,
    }
  );
}

async function getSpecificSubTarget(require) {
    return await Subtargets.findOne(
      {_id:require},
      {
        __v: 0,
        createdDate: 0,
      }
    );
  }

  async function saveModifiedAssignees(require) {
     await require.save();
  }

  async function getSpecificActivity(require) {
    return await Activities.findOne(
      {_id:require},
      {
        __v: 0,
        createdDate: 0,
      }
    );
  }
  async function getActForAnySub(subId) {
    return await Activities.find(
      { subId: subId},
      {
        __v: 0,
        createdDate: 0,
        assignees:0,
        assigneeTeam:0,
      }
    );
  }
module.exports = {
  saveMainTarget,
  saveSubTarget,
  saveActivity,
  getMainTarget,
  getSubTarget,
  getSubTargetSpecificItems,
  getActFor,
  getSpecificSubTarget,
  saveModifiedAssignees,
  getSpecificActivity,
  getActivities,
  getActForAnySub,
};
