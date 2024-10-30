const Teams = require("../../models/architectures/team.mongo");
const Employees = require("../../models/architectures/employee.mongo");
const Deputies = require("../../models/architectures/deputy.mongo");
const Directorates = require("../../models/architectures/directorate.mongo");

async function saveNewDeputy(data) {
  const newDeputy = new Deputies(data);
  await newDeputy.save();
}

async function saveNewDirectorate(data) {
  const newDirectorate = new Directorates(data);
  await newDirectorate.save();
}

async function saveNewTeam(data) {
  const newTeam = new Teams(data);
  await newTeam.save();
}

async function saveNewEmployee(data) {
  const newEmployee = new Employees(data);
  await newEmployee.save();
}

async function getAllDeputies() {
  return await Deputies.find(
    {},
    {
      __v: 0,
      createdDate: 0,
    }
  );
}
async function getAllDirectorates() {
  return await Directorates.find(
    {},
    {
      __v: 0,
      createdDate: 0,
    }
  );
}
async function getOuterDirectorates(require) {
  return await Directorates.find(
    { deputyId: require },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}

async function getEmployeeForTeam(require) {
  return await Employees.find(
    { teamId: require },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}

async function getOneEmployee(require) {
  return await Employees.findOne(
    { _id: require },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}

async function getOneDeputy(require) {
  return await Deputies.findOne(
    { _id: require },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}
async function getOneDirectorate(require) {
  return await Directorates.findOne(
    { _id: require },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}
async function getOneTeam(require) {
  return await Teams.findOne(
    { _id: require },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}
async function getTeamsForDir(require) {
  return await Teams.find(
    { directorateId: require },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}

async function getEmployeeForDir(require) {
  return await Employees.find(
    { directorateId: require, teamId: null },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}

async function getAllDirectorateEmp(require) {
  return await Employees.find(
    { directorateId: require },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}

async function getAllTeams() {
  return await Teams.find(
    {},
    {
      __v: 0,
      createdDate: 0,
    }
  );
}

async function getAllEmployees() {
  return await Employees.find(
    {},
    {
      __v: 0,
      createdDate: 0,
    }
  );
}
async function getTeamForDeputy(require) {
  return await Teams.find(
    { deputyId: require, directorateId: null },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}

async function getAllDeputyTeams(require) {
  return await Teams.find(
    { deputyId: require },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}

async function getEmpForDeputy(require) {
  return await Employees.find(
    { deputyId: require, directorateId: null, teamId: null },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}
async function getAllDeputyEmp(require) {
  return await Employees.find(
    { deputyId: require },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}

async function getCommissioner() {
  return await Employees.findOne(
    { deputyId: null, directorateId: null, teamId: null },
    {
      __v: 0,
      createdDate: 0,
    }
  );
}
async function getAuthUser(email, password) {
  return await Employees.login(email, password);
}

async function saveModified(require) {
  await require.save();
}

module.exports = {
  saveNewDeputy,
  saveNewDirectorate,
  saveNewTeam,
  saveNewEmployee,
  getAllDeputies,
  getAllDirectorates,
  getOuterDirectorates,
  getEmployeeForTeam,
  getOneEmployee,
  getOneDeputy,
  getOneDirectorate,
  getOneTeam,
  getTeamsForDir,
  getEmployeeForDir,
  getAllTeams,
  getAllEmployees,
  getTeamForDeputy,
  getEmpForDeputy,
  getCommissioner,
  saveModified,
  getAuthUser,
  getAllDeputyEmp,
  getAllDirectorateEmp,
  getAllDeputyTeams
};
