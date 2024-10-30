const IdSpecify = require("../../services/idFunction");
const bcrypt=require('bcrypt');
const {
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
} = require("../../models/architectures/architecture.model");
const {
  deputy,
  directorate,
  team,
  employee,
} = require("../../services/dataModels");

async function addNewDeputy(req, res) {
  try {
    const { deputyName } = req.body;
    const _id = IdSpecify("dep", deputyName);
    await saveNewDeputy({
      _id,
      name: deputyName,
    });
    return res
      .status(200)
      .json({ status: "new directorate is successfully added" });
  } catch (err) {
    return res.status(404).json({
      error: `error on saving the deputy ${err}`,
    });
  }
}

async function addNewDirectorate(req, res) {
  try {
    const { id, directorateName } = req.body;
    const deputyId = id;
    const _id = IdSpecify("dir", directorateName);
    await saveNewDirectorate({
      _id,
      deputyId,
      name: directorateName,
    });
    return res
      .status(200)
      .json({ status: "new directorate is successfully added" });
  } catch (err) {
    return res.status(404).json({
      error: `error on saving  ${err}`,
    });
  }
}

async function addNewTeam(req, res) {
  try {
    const { deputyId, directorateId, teamName } = req.body;
    const _id = IdSpecify("tea", teamName);
    await saveNewTeam({
      _id,
      deputyId,
      directorateId,
      name: teamName,
    });
    return res.status(200).json({ status: "new team is successfully added" });
  } catch (err) {
    return res.status(404).json({
      error: `error on saving  ${err}`,
    });
  }
}

async function addNewEmployee(req, res) {
  try {
    const { userName, userEmail, role, deputyId, directorateId, teamId } =
      req.body;
    const _id = IdSpecify("emp", userName);
    await saveNewEmployee({
      _id,
      deputyId,
      directorateId,
      teamId,
      name: userName,
      userEmail,
      role,
      password: "12345678",
    });
    return res
      .status(200)
      .json({ status: "new employee is successfully added" });
  } catch (err) {
    if(err.code===11000){
     err='the email exists';
    }
    return res.status(404).json({
      error: `${err}`,
    });
  }
}

async function getDeputies(req, res) {
  try {
    const result = await getAllDeputies();
    const data = result.map((items) => {
      return deputy(items);
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({
      error: `error on getting data  ${err}`,
    });
  }
}

async function getDirectorates(req, res) {
  try {
    const result = await getAllDirectorates();
    const data = result.map((items) => {
      return directorate(items);
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({
      error: `error on getting data  ${err}`,
    });
  }
}

async function getHighDirectorates(req, res) {
  try {
    const result = await getOuterDirectorates(null);
    const data = result.map((items) => {
      return directorate(items);
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({
      error: `error on getting data  ${err}`,
    });
  }
}

async function getSubsForDeputy(req, res) {
  try {
    const { deputyId } = req.params;
    const deputy = await getOneDeputy(deputyId);
    const directorateData = await getOuterDirectorates(deputyId);
    const directorates = directorateData.map((items) => {
      return directorate(items);
    });
    const teamData = await getTeamForDeputy(deputyId);
    const teams = teamData.map((items) => {
      return team(items);
    });

    const empData = await getEmpForDeputy(deputyId);
    const employees = empData.map((items) => {
      return employee(items);
    });
    return res.status(200).json({
      name: `${deputy.name} ምክትል ኮሚሽነር ቢሮ`,
      items: [...directorates, ...teams, ...employees],
    });
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data  ${err}`,
    });
  }
}

async function getEmpForTeam(req, res) {
  try {
    const { teamId } = req.params;
    const team = await getOneTeam(teamId);
    const result = await getEmployeeForTeam(teamId);
    const data = result.map((items) => {
      return employee(items);
    });
    return res.status(200).json({ name: `${team.name} ቡድን`, items: data });
  } catch (err) {
    return res.status(404).json({
      error: `error on getting employee data  ${err}`,
    });
  }
}
async function getSpecificEmployee(req, res) {
  try {
    const { employeeId } = req.params;
    const result = await getOneEmployee(employeeId);
    const dep = await getOneDeputy(result.deputyId);
    const dir = await getOneDirectorate(result.directorateId);
    const team = await getOneTeam(result.teamId);
    let dirName = null;
    let depName = null;
    let teamName = null;
    if (team) {
      teamName = `${team.name} ቡድን `;
    }
    if (dir) {
      dirName = `${dir.name} ዳይሬክቶሬት`;
    }
    if (dep) {
      depName = `${dep.name} ምክትል ኮሚሽነር ቢሮ`;
    }
    const data = {
      ...employee(result),
      deputyName: depName,
      directorateName: dirName,
      teamName: teamName,
    };
    return res.status(200).json({ name: "", items: [data] });
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data  ${err}`,
    });
  }
}

async function getTeam_EmpForDirectorate(req, res) {
  try {
    const { directorateId } = req.params;
    const directorate = await getOneDirectorate(directorateId);
    const teamData = await getTeamsForDir(directorateId);
    const teams = teamData.map((items) => {
      return team(items);
    });

    const employeeData = await getEmployeeForDir(directorateId);

    const employees = employeeData.map((items) => {
      return employee(items);
    });
    return res.status(200).json({
      name: `${directorate.name} ዳይሬክቶሬት`,
      items: [...teams, ...employees],
    });
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data  ${err}`,
    });
  }
}

async function getTeams(req, res) {
  try {
    const result = await getAllTeams();
    const data = result.map((items) => {
      items.name = `${items.name} team`;
      return team(items);
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data  ${err}`,
    });
  }
}

async function getEmployees(req, res) {
  try {
    const result = await getAllEmployees();
    const data = result.map((items) => {
      return employee(items);
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data  ${err}`,
    });
  }
}

async function getOneType(req, res) {
  try {
    const { type, id } = req.params;
    let data = null;
    if (type === "team") {
      const teamData = await getOneTeam(id);
      data = team(teamData);
    } else if (type === "directorate") {
      const directorateData = await getOneDirectorate(id);
      data = directorate(directorateData);
    } else {
      const deputyData = await getOneDeputy(id);
      data = deputy(deputyData);
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data  ${err}`,
    });
  }
}

async function getCommisiioner(req, res) {
  try {
    const commissioner = await getCommissioner();
    let data = [];
    if (commissioner) {
      data = [employee(commissioner)];
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({
      error: `error on getting data  ${err}`,
    });
  }
}

async function changeCommisiioner(req, res) {
  try {
    const { id } = req.params;
    const { userName, userEmail, role, deputyId, directorateId, teamId } =
      req.body;
    const comm = await getOneEmployee(id);
    // comm._id=IdSpecify("emp", userName);
    comm.deputyId = deputyId;
    comm.directorateId = directorateId;
    comm.teamId = teamId;
    comm.name = userName;
    comm.userEmail = userEmail;
    comm.role = role;
    comm.password = "12345678";
    await saveModified(comm);
    return res.status(200).json(comm);
  } catch (err) {
    return res.status(404).json({
      error: `error on modifying data  ${err}`,
    });
  }
}

async function changePassword(req, res) {
  try {
    const { employeId } = req.params;
    const { oldPassword, newPassword } = req.body;
    const employee = await getOneEmployee(employeId);
    const auth = await bcrypt.compare(oldPassword, employee.password);
    if (auth) {
      employee.password =newPassword;
      await saveModified(employee);
      return res.status(200).json("the password is changed");
    }
    throw Error("the password is not the same");
  } catch (err) {
    return res.status(404).json({
      error: `error on changing password  ${err}`,
    });
  }
}
module.exports = {
  addNewDeputy,
  addNewDirectorate,
  addNewTeam,
  addNewEmployee,
  getDeputies,
  getHighDirectorates,
  getDirectorates,
  getSubsForDeputy,
  getEmpForTeam,
  getSpecificEmployee,
  getTeam_EmpForDirectorate,
  getTeams,
  getEmployees,
  getOneType,
  getCommisiioner,
  changeCommisiioner,
  changePassword,
};
