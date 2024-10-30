const express = require("express");
const {
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
  changePassword
} = require("./architecture.controller");
const archRouter = express.Router();

archRouter.post("/new/deputy", addNewDeputy);
archRouter.post("/new/directorate", addNewDirectorate);
archRouter.post("/new/team", addNewTeam);
archRouter.post("/new/employee", addNewEmployee);
archRouter.get("/get/deputy", getDeputies);
archRouter.get("/get/directorate", getHighDirectorates);
archRouter.get("/get/commissioner", getCommisiioner);
archRouter.get("/get/sth", getDirectorates);
archRouter.get("/get/deputy/:deputyId", getSubsForDeputy);
archRouter.get("/get/team/:teamId", getEmpForTeam);
archRouter.get("/get/employee/:employeeId", getSpecificEmployee);
archRouter.get("/get/directorate/:directorateId", getTeam_EmpForDirectorate);
archRouter.get("/get/team", getTeams);
archRouter.get("/get/employee", getEmployees);
archRouter.get("/get/one/:type/:id", getOneType);
archRouter.put("/edit/commissioner/:id", changeCommisiioner);
archRouter.put('/password/:employeId',changePassword);

module.exports = archRouter;
