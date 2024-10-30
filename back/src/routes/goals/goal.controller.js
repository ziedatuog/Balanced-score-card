const IdSpecify = require("../../services/idFunction");
const {
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
} = require("../../models/goals/goal.model");
const {
  getAllDeputies,
  getOuterDirectorates,
  getOneDirectorate,
  getEmpForDeputy,
  getTeamForDeputy,
  getEmployeeForDir,
  getTeamsForDir,
  getEmployeeForTeam,
  getOneEmployee,
} = require("../../models/architectures/architecture.model");

const {
  mainAndSubMapping,
  teamAssignees,
  empAssignees,
  measureAndSubMapping,
  modifyAssignees_Emp_team,
  modifyAssignees_Dir_Dep,
  getMeasurement,
} = require("../../services/mapFunction");
async function addNewMainTarget(req, res) {
  try {
    const { targetTitle } = req.body;
    const _id = IdSpecify("tar", targetTitle);
    await saveMainTarget({
      _id,
      targetTitle,
    });
    return res.status(201).json({ status: "new target is successfully added" });
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function addMain_SubTarget(req, res) {
  try {
    const { targetTitle, subTitle, subWeight } = req.body;
    const targetId = IdSpecify("tar", targetTitle);
    await saveMainTarget({
      _id: targetId,
      targetTitle,
    });
    await saveSubTarget({
      _id: IdSpecify("str", subTitle),
      targetId,
      subTitle,
      subWeight,
    });
    return res
      .status(201)
      .json({ status: "new target and subtarget is successfully added" });
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}
async function addSubtarget(req, res) {
  try {
    const { targetId, subTitle, subWeight } = req.body;
    await saveSubTarget({
      _id: IdSpecify("str", subTitle),
      targetId,
      subTitle,
      subWeight,
    });
    return res
      .status(201)
      .json({ status: "new subtarget is successfully added" });
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function addActivity(req, res) {
  try {
    const {
      subId,
      metrics,
      description,
      weight,
      halfYearTarget,
      firstQuarter,
      createdBy,
    } = req.body;
    await saveActivity({
      _id: IdSpecify("act", description),
      subId,
      metrics,
      description,
      weight,
      halfYearTarget,
      firstQuarter,
      createdBy,
    });
    return res
      .status(201)
      .json({ status: "new activity is successfully added" });
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}
async function getMain_Sub(req, res) {
  try {
    const mainData = await getMainTarget();
    const subData = await getSubTargetSpecificItems();
    const data = mainData.map((items) => {
      const subtargetData = subData.filter(
        (value) => value.targetId === items._id
      );
      return {
        targetId: items._id,
        targetTitle: items.targetTitle,
        subtargetData,
      };
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err} `,
    });
  }
}

async function getActivityForSO(req, res) {
  try {
    const { subId, id } = req.params;
    const actData = await getActFor({ subId, id });
    const subData = await getSpecificSubTarget(subId);
    let assignedWeight = 0;
    if (id.includes("dir")) {
      const directorate = await getOneDirectorate(id);
      if (directorate.deputyId === null) {
        assignedWeight = subData.assignees.find(
          (item) => item.assigneeId === id
        ).assignedWeight;
      } else {
        assignedWeight = subData.assigneeDeputy
          .find((item) => item.assigneeId === directorate.deputyId)
          .assigneedDir.find((item) => item.assigneeId === id).assignedWeight;
      }
    } else {
      assignedWeight = subData.assigneeDeputy.find(
        (item) => item.assigneeId === id
      ).assignedWeight;
    }

    if (!actData) {
      return res.status(404).json({ status: "there is no any measurement" });
    }
    return res.status(200).json({
      subId: subData._id,
      subTitle: subData.subTitle,
      subWeight: assignedWeight,
      measurements: actData,
    });
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err} `,
    });
  }
}

async function getAssignees(req, res) {
  try {
    const { subId } = req.params;
    const subData = await getSpecificSubTarget(subId);
    const assigned = subData.assignees;
    const assigneeDeputy = subData.assigneeDeputy;
    const directorates = await getOuterDirectorates(null);
    const deputies = await getAllDeputies();

    const directorateData = directorates.map((items) => {
      const dir = assigned.find((item) => item.assigneeId === items._id);
      if (dir) {
        return {
          assigneeId: items._id,
          assigneeName: `${items.name} directorate`,
          assignedWeight: dir.assignedWeight,
        };
      } else {
        return {
          assigneeId: items._id,
          assigneeName: `${items.name} directorate`,
          assignedWeight: 0,
        };
      }
    });
    const deputyData = deputies.map((items) => {
      const dir = assigneeDeputy.find((item) => item.assigneeId === items._id);
      if (dir) {
        return {
          assigneeId: items._id,
          assigneeName: `${items.name} deputy`,
          assignedWeight: dir.assignedWeight,
        };
      } else {
        return {
          assigneeId: items._id,
          assigneeName: `${items.name} deputy`,
          assignedWeight: 0,
        };
      }
    });
    return res.status(200).json([...deputyData, ...directorateData]);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err} `,
    });
  }
}

async function modifyAssgnees(req, res) {
  try {
    const { subId } = req.params;
    const comingData = req.body;
    const subData = await getSpecificSubTarget(subId);
    const assignees = subData.assignees;
    const assigneeDeputy = subData.assigneeDeputy;

    comingData.map((items) => {
      const dirType = items.assigneeId.includes("dir");
      if (dirType) {
        modifyAssignees_Dir_Dep(items, assignees);
      } else {
        modifyAssignees_Dir_Dep(items, assigneeDeputy);
      }
    });
    await saveModifiedAssignees(subData);
    return res
      .status(200)
      .json({ status: "the assignees are successfully modified" });
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err}`,
    });
  }
}

async function getDeputyTargets(req, res) {
  try {
    const { deputyId } = req.params;
    const subData = await getSubTarget();
    const assignedSubtargets = [];
    subData.map((items) => {
      const isAssigneed = items.assigneeDeputy.find(
        (value) => value.assigneeId === deputyId
      );
      if (isAssigneed) {
        return assignedSubtargets.push({
          targetId: items.targetId,
          _id: items._id,
          subTitle: items.subTitle,
          subWeight: isAssigneed.assignedWeight,
        });
      } else {
        return;
      }
    });
    const mainData = await getMainTarget();
    const data = mainAndSubMapping(mainData, assignedSubtargets);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err}`,
    });
  }
}

async function getDirectorateTargets(req, res) {
  try {
    const { directorateId } = req.params;
    const subData = await getSubTarget();
    const directorate = await getOneDirectorate(directorateId);
    if (!directorate) {
      return res.status(404).json({
        error: `directorate not found`,
      });
    } else {
      const assignedSubtargets = [];
      if (directorate.deputyId === null) {
        subData.map((items) => {
          const isAssigneed = items.assignees.find(
            (value) => value.assigneeId === directorateId
          );
          if (isAssigneed) {
            return assignedSubtargets.push({
              targetId: items.targetId,
              _id: items._id,
              subTitle: items.subTitle,
              subWeight: isAssigneed.assignedWeight,
            });
          } else {
            return;
          }
        });
      } else {
        subData.map((items) => {
          const isAssigneedDeputy = items.assigneeDeputy.find(
            (value) => value.assigneeId === directorate.deputyId
          );
          if (isAssigneedDeputy) {
            const isAssigneed = isAssigneedDeputy.assigneedDir.find(
              (value) => value.assigneeId === directorateId
            );
            if (isAssigneed) {
              return assignedSubtargets.push({
                targetId: items.targetId,
                _id: items._id,
                subTitle: items.subTitle,
                subWeight: isAssigneed.assignedWeight,
              });
            } else {
              return;
            }
          } else {
            return;
          }
        });
      }
      const mainData = await getMainTarget();
      const data = mainAndSubMapping(mainData, assignedSubtargets);
      return res.status(200).json(data);
    }
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err}`,
    });
  }
}

async function getAssigneeDirectorates(req, res) {
  try {
    const { deputyId, subId } = req.params;
    const subData = await getSpecificSubTarget(subId);
    const directorates = await getOuterDirectorates(deputyId);
    const assigneeDeputy = subData.assigneeDeputy.find(
      (items) => items.assigneeId === deputyId
    );
    const assigneeDirectorates = assigneeDeputy.assigneedDir;
    const data = [];
    directorates.map((items) => {
      const filteredData = assigneeDirectorates.find(
        (key) => key.assigneeId === items._id
      );
      if (filteredData) {
        return data.push({
          assigneeId: items._id,
          assigneeName: `${items.name} directorate`,
          assignedWeight: filteredData.assignedWeight,
        });
      } else {
        return data.push({
          assigneeId: items._id,
          assigneeName: `${items.name} directorate`,
          assignedWeight: 0,
        });
      }
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err}`,
    });
  }
}
async function modifyAssignnedDirectorates(req, res) {
  try {
    const { deputyId, subId } = req.params;
    const comingData = req.body;
    const subData = await getSpecificSubTarget(subId);
    const assigneeDeputy = subData.assigneeDeputy.find(
      (items) => items.assigneeId === deputyId
    );
    comingData.map((items) => {
      modifyAssignees_Dir_Dep(items, assigneeDeputy.assigneedDir);
    });
    await saveModifiedAssignees(subData);
    return res
      .status(200)
      .json({ status: "the assignees are successfully modified" });
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err}`,
    });
  }
}

async function getMeasurementAssignees(req, res) {
  try {
    const { activityId, deputyId } = req.params;
    const activity = await getSpecificActivity(activityId);
    const employees = await getEmpForDeputy(deputyId);
    const teams = await getTeamForDeputy(deputyId);
    const assignees = activity.assignees;
    const assigneeTeam = activity.assigneeTeam;
    const employeeData = empAssignees(assignees, employees);
    const teamData = teamAssignees(assigneeTeam, teams);
    return res.status(200).json([...employeeData, ...teamData]);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err}`,
    });
  }
}

async function getMeasurementAssignees_Directorate(req, res) {
  try {
    const { activityId, directorateId } = req.params;
    const activity = await getSpecificActivity(activityId);
    const employees = await getEmployeeForDir(directorateId);
    const teams = await getTeamsForDir(directorateId);
    const assignees = activity.assignees;
    const assigneeTeam = activity.assigneeTeam;
    const employeeData = empAssignees(assignees, employees);
    const teamData = teamAssignees(assigneeTeam, teams);
    return res.status(200).json([...employeeData, ...teamData]);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err}`,
    });
  }
}

async function getAssignnes_Team(req, res) {
  try {
    const { activityId, teamId } = req.params;
    const activityData = await getSpecificActivity(activityId);
    const employees = await getEmployeeForTeam(teamId);
    const assigneeTeam = activityData.assigneeTeam.find(
      (items) => items.assigneeId === teamId
    );
    const assigneeUsers = assigneeTeam.assignees;
    const data = empAssignees(assigneeUsers, employees);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err}`,
    });
  }
}

async function getMeasurements_Team(req, res) {
  try {
    const { teamId } = req.params;
    const activities = await getActivities();
    const measurementData = [];
    activities.map((items) => {
      const assignedData = items.assigneeTeam.find(
        (value) => value.assigneeId === teamId
      );
      if (assignedData) {
        return measurementData.push({
          subId: items.subId,
          _id: items._id,
          metrics: items.metrics,
          description: items.description,
          weight: assignedData.assignedWeight,
          halfYearTarget: assignedData.halfYearTarget,
          firstQuarter: assignedData.firstQuarter,
        });
      } else {
        return;
      }
    });
    const subtargets = await getSubTarget();
    const subTargetData = measureAndSubMapping(subtargets, measurementData);
    const mainTargets = await getMainTarget();
    const data = mainAndSubMapping(mainTargets, subTargetData);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err}`,
    });
  }
}

async function getMeasurements_Employee(req, res) {
  try {
    const { employeeId } = req.params;
    const activities = await getActivities();
    const employee = await getOneEmployee(employeeId);
    const measurementData = getMeasurement(activities, employee);
    const subtargets = await getSubTarget();
    const subTargetData = measureAndSubMapping(subtargets, measurementData);
    const mainTargets = await getMainTarget();
    const data = mainAndSubMapping(mainTargets, subTargetData);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting measurement data ${err}`,
    });
  }
}

async function modifyMeasurementAssignees(req, res) {
  try {
    const { activityId } = req.params;
    const comingData = req.body;
    const activity = await getSpecificActivity(activityId);
    const assignees = activity.assignees;
    const assigneeTeam = activity.assigneeTeam;

    comingData.map((items) => {
      const empType = items.assigneeId.includes("emp");
      if (empType) {
        modifyAssignees_Emp_team(items, assignees);
      } else {
        modifyAssignees_Emp_team(items, assigneeTeam);
      }
    });
    await saveModifiedAssignees(activity);
    return res
      .status(200)
      .json({ status: "the assignees are successfully modified" });
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err}`,
    });
  }
}

async function modifyAssignees_Team(req, res) {
  try {
    const { teamId, activityId } = req.params;
    const comingData = req.body;
    const activity = await getSpecificActivity(activityId);
    const assigneeTeam = activity.assigneeTeam.find(
      (items) => items.assigneeId === teamId
    );
    const assigneeEmp = assigneeTeam.assignees;
    comingData.map((items) => {
      modifyAssignees_Emp_team(items, assigneeEmp);
    });
    await saveModifiedAssignees(activity);
    return res
      .status(200)
      .json({ status: "the assignees are successfully modified" });
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err}`,
    });
  }
}

async function getActivityForSub(req, res) {
  try {
    const { subId } = req.params;
    const actData = await getActForAnySub(subId);
    const subData = await getSpecificSubTarget(subId);
    if (!actData) {
      return res.status(404).json({ status: "there is no any measurement" });
    }
    return res.status(200).json({
      subId: subData._id,
      subTitle: subData.subTitle,
      subWeight: subData.subWeight,
      measurements: actData,
    });
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err} `,
    });
  }
}

async function getMeasurementOnly(req, res) {
  try {
    const { employeeId } = req.params;
    const activities = await getActivities();
    const employee = await getOneEmployee(employeeId);
    const measurementData = getMeasurement(activities, employee);
    return res.status(200).json(measurementData);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data ${err} `,
    });
  }
}

module.exports = {
  addNewMainTarget,
  addMain_SubTarget,
  addSubtarget,
  addActivity,
  getMain_Sub,
  getActivityForSO,
  getAssignees,
  modifyAssgnees,
  getDeputyTargets,
  getDirectorateTargets,
  getAssigneeDirectorates,
  modifyAssignnedDirectorates,
  getMeasurementAssignees,
  getMeasurementAssignees_Directorate,
  getAssignnes_Team,
  getMeasurements_Team,
  getMeasurements_Employee,
  modifyMeasurementAssignees,
  modifyAssignees_Team,
  getActivityForSub,
  getMeasurementOnly,
};
