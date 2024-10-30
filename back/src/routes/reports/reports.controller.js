const {
  saveReport,
  getReportsSome,
  getReport,
  saveChange,
} = require("../../models/reports/reports.model");
const IdSpecify = require("../../services/idFunction");
const {
  getOneEmployee,
  getCommissioner,
  getAllDeputies,
  getAllDeputyEmp,
  getAllDirectorates,
  getAllDirectorateEmp,
  getAllTeams,
  getEmployeeForTeam,
  getAllEmployees,
  getOuterDirectorates,
  getAllDeputyTeams,
  getTeamsForDir,
} = require("../../models/architectures/architecture.model");
const { getSpecificActivity } = require("../../models/goals/goal.model");
const { setResult } = require("../../services/mapFunction");
async function newReport(req, res) {
  try {
    const { employeeId, data } = req.body;
    const reportId = IdSpecify("report", "quarter");
    const status = "not-seen";
    const employee = await getOneEmployee(employeeId);
    let receiverId = null;
    switch (employee.role) {
      case "deputy commissioner":
        const commissioner = await getCommissioner();
        receiverId = commissioner._id;
        break;
      case "director":
        if (employee.deputyId === null) {
          const commissioner = await getCommissioner();
          receiverId = commissioner._id;
        } else {
          receiverId = employee.directorateId;
        }
        break;
      case "team leader":
        if (employee.directorateId === null) {
          receiverId = employee.deputyId;
        } else {
          receiverId = employee.directorateId;
        }
      default:
        if (employee.teamId === null) {
          if (employee.directorateId === null) {
            receiverId = employee.deputyId;
          } else {
            receiverId = employee.directorateId;
          }
        } else {
          receiverId = employee.teamId;
        }
    }

    await saveReport({
      _id: reportId,
      employeeId,
      receiverId,
      status,
      reports: data,
    });
    return res.status(200).json({ status: "new report is successfully added" });
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function getReportNotification(req, res) {
  try {
    const { receiverId } = req.params;
    const reports = await getReportsSome(receiverId);
    const netReports = [];
    for (let item of reports) {
      const employee = await getOneEmployee(item.employeeId);
      netReports.push({
        _id: item._id,
        employeeId: item.employeeId,
        status: item.status,
        createdDate: item.createdDate,
        employeeName: employee.name,
      });
    }
    return res.status(200).json(netReports);
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function getReportCheck(req, res) {
  try {
    const { employeeId } = req.params;
    const report = await getReport(employeeId);
    const employee = await getOneEmployee(employeeId);
    const netReports = [];
    for (item of report.reports) {
      const activity = await getSpecificActivity(item.activityId);
      let assigneedData = null;
      if (employee.teamId === null) {
        assigneedData = activity.assignees.find(
          (item) => item.assigneeId === employeeId
        );
      } else {
        assigneedData = activity.assigneeTeam
          .find((item) => item.assigneeId === employee.teamId)
          .assignees.find((item) => item.assigneeId === employeeId);
      }
      let status = "accepted";
      if (item.status) {
        status = item.status;
      }

      netReports.push({
        activityId: item.activityId,
        metrics: activity.metrics,
        description: activity.description,
        weight: assigneedData.assignedWeight,
        halfYearTarget: assigneedData.halfYearTarget,
        firstQuarter: assigneedData.firstQuarter,
        amount: item.amount,
        result:
          report.status === "accepted"
            ? setResult(
                activity.metrics,
                assigneedData.halfYearTarget,
                item.amount
              )
            : null,
        status,
      });
    }
    const netReport = {
      _id: report._id,
      employeeId: report.employeeId,
      receiverId: report.receiverId,
      type: report.type,
      status: report.status,
      review: report.review,
      reports: netReports,
      createdDate: report.createdDate,
      employeeName: employee.name,
    };

    return res.status(200).json(netReport);
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function setReportAccepted(req, res) {
  try {
    const { employeeId, status } = req.params;
    const report = await getReport(employeeId);
    const employee = await getOneEmployee(employeeId);
    if (status === "accept") {
      const { higher } = req.body;
      report.status = "accepted";
      report.higher = higher;
      let result = 0;
      let totalHalf = 0;
      for (item of report.reports) {
        const activity = await getSpecificActivity(item.activityId);
        let assigneedData = null;
        if (employee.teamId === null) {
          assigneedData = activity.assignees.find(
            (item) => item.assigneeId === employeeId
          );
        } else {
          assigneedData = activity.assigneeTeam
            .find((item) => item.assigneeId === employee.teamId)
            .assignees.find((item) => item.assigneeId === employeeId);
        }
        const absoluteResult = setResult(
          activity.metrics,
          assigneedData.halfYearTarget,
          item.amount
        );
        totalHalf +=
          (assigneedData.halfYearTarget * assigneedData.assignedWeight) / 5;
        const realtiveResult =
          (absoluteResult * assigneedData.assignedWeight) / 5;
        result += realtiveResult;
      }
      const finalResult = (result * 70) / totalHalf;
      let higherRes = report.higher;
      if (report.higher > 30) {
        higherRes = 30;
      }

      report.net = parseFloat(finalResult) + parseFloat(higherRes);
    } else {
      const { netAmount, review } = req.body;
      report.review = review;
      report.status = "rejected";

      report.reports.map((items) => {
        const activity = netAmount.find((value) => value === items.activityId);
        if (activity) {
          return (items.status = "rejected");
        }
        return (items.status = "accepted");
      });
    }
    await saveChange(report);
    return res.status(200).json({ data: "the report status is updated" });
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function checkAccepted(req, res) {
  try {
    const { employeeId } = req.params;
    const report = await getReport(employeeId);
    if (report) {
      return res.status(200).json({ status: report.status });
    } else {
      return res.status(200).json({ status: "not-exist" });
    }
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function modifyRejected(req, res) {
  try {
    const { employeeId } = req.params;
    const data = req.body;
    const report = await getReport(employeeId);
    report.status = "not-seen";
    data.map((items) => {
      const eachAmount = report.reports.find(
        (value) => value.activityId === items.activityId
      );
      return (eachAmount.amount = items.amount);
    });
    await saveChange(report);
    return res.status(200).json({ data: "the amount is modified" });
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function getFinalResult(req, res) {
  try {
    const { employeeId } = req.params;
    const report = await getReport(employeeId);
    const employee = await getOneEmployee(employeeId);

    return res.status(200).json({
      employeeName: employee.name,
      employeeRole: employee.role,
      reportResult: report.net - report.higher,
      feedbackResult: report.higher,
      netResult: report.net,
    });
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}
async function notificationAmount(req, res) {
  try {
    const { receiverId } = req.params;
    const reports = await getReportsSome(receiverId);
    count = 0;
    reports.forEach((item) => {
      if (item.status === "not-seen") {
        count++;
      }
    });
    return res.status(200).json(count);
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}
async function getDeputiesResult(req, res) {
  try {
    const deputies = await getAllDeputies();
    let deputyData = [];
    for (deputy of deputies) {
      const employees = await getAllDeputyEmp(deputy._id);
      const numberEmployee = employees.length;
      let amount = 0;
      for (let i = 0; i < employees.length; i++) {
        const report = await getReport(employees[i]._id);
        if (!report || report?.status !== "accepted") {
          continue;
        }
        amount += parseFloat(report.net);
      }
      let result = 0;
      if(amount!==0){
        result=amount/numberEmployee;
      }
      deputyData.push({
        name:`${deputy.name} deputy commissioner office`,
        result,
      });
    }
    return res.status(200).json(deputyData);
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}
async function getAllDirectoratesResult(req, res) {
  try {
    const directorates = await getAllDirectorates();
    let directorateData = [];
    for (directorate of directorates) {
      const employees = await getAllDirectorateEmp(directorate._id);
      const numberEmployee = employees.length;
      let amount = 0;
      for (let i = 0; i < employees.length; i++) {
        const report = await getReport(employees[i]._id);
        if (!report || report?.status !== "accepted") {
          continue;
        }
        amount += parseFloat(report.net);
      }
      let result = 0;
      if(amount!==0){
        result=amount/numberEmployee;
      }
      directorateData.push({
        name: `${directorate.name} directorate`,
        result,
      });
    }
    return res.status(200).json(directorateData);
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function getAllTeamsResult(req, res) {
  try {
    const teams = await getAllTeams();
    let teamData = [];
    for (team of teams) {
      const employees = await getEmployeeForTeam(team._id);
      const numberEmployee = employees.length;
      let amount = 0;
      for (let i = 0; i < employees.length; i++) {
        const report = await getReport(employees[i]._id);
        if (!report || report?.status !== "accepted") {
          continue;
        }
        amount += parseFloat(report.net);
      }
      let result = 0;
      if(amount!==0){
        result=amount/numberEmployee;
      }
      teamData.push({
        name: `${team.name} team`,
        result,
      });
    }
    return res.status(200).json(teamData);
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function getAllEmployeesResult(req, res) {
  try {
    const employees = await getAllEmployees();
    let employeeData = [];

    for (let i = 0; i < employees.length; i++) {
      const report = await getReport(employees[i]._id);
      let result=0;
      if (report && report?.status === "accepted") {
        result = report.net;
      } 
      employeeData.push({
        name: employees[i].name,
        result,
      });
    }

    return res.status(200).json(employeeData);
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function getDeputyDirectoratesResult(req, res) {
  try {
    const { deputyId } = req.params;
    const directorates = await getOuterDirectorates(deputyId);
    let directorateData = [];
    for (directorate of directorates) {
      const employees = await getAllDirectorateEmp(directorate._id);
      const numberEmployee = employees.length;
      let amount = 0;
      for (let i = 0; i < employees.length; i++) {
        const report = await getReport(employees[i]._id);
        if (!report || report?.status !== "accepted") {
          continue;
        }
        amount += parseFloat(report.net);
      }
      let result = 0;
      if(amount!==0){
        result=amount/numberEmployee;
      }
      directorateData.push({
        name: `${directorate.name} directorate`,
        result,
      });
    }
    return res.status(200).json(directorateData);
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}
async function getDeputyTeamsResult(req, res) {
  try {
    const { deputyId } = req.params;
    const teams = await getAllDeputyTeams(deputyId);
    let teamData = [];
    for (team of teams) {
      const employees = await getEmployeeForTeam(team._id);
      const numberEmployee = employees.length;
      let amount = 0;
      for (let i = 0; i < employees.length; i++) {
        const report = await getReport(employees[i]._id);
        if (!report || report?.status !== "accepted") {
          continue;
        }
        amount += parseFloat(report.net);
      }
      let result = 0;
      if(amount!==0){
        result=amount/numberEmployee;
      }
      teamData.push({
        name: `${team.name} team`,
        result,
      });
    }
    return res.status(200).json(teamData);
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function getDeputyEmployeesResult(req, res) {
  try {
    const { deputyId } = req.params;
    const employees = await getAllDeputyEmp(deputyId);
    let employeeData = [];
    for (let i = 0; i < employees.length; i++) {
      const report = await getReport(employees[i]._id);
      let result=0;
      if (report && report?.status === "accepted") {
        result = report.net;
      } 
      employeeData.push({
        name: employees[i].name,
        result,
      });
    }
    return res.status(200).json(employeeData);
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function getDirectorateTeamsResult(req, res) {
  try {
    const { directorateId } = req.params;
    const teams = await getTeamsForDir(directorateId);
    let teamData = [];
    for (team of teams) {
      const employees = await getEmployeeForTeam(team._id);
      const numberEmployee = employees.length;
      let amount = 0;
      for (let i = 0; i < employees.length; i++) {
        const report = await getReport(employees[i]._id);
        if (!report || report?.status !== "accepted") {
          continue;
        }
        amount += parseFloat(report.net);
      }
      let result = 0;
      if(amount!==0){
        result=amount/numberEmployee;
      }
      teamData.push({
        name: `${team.name} team`,
        result
      });
    }
    return res.status(200).json(teamData);
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function getDirectorateEmployeesResult(req, res) {
  try {
    const { directorateId } = req.params;
    const employees = await getAllDirectorateEmp(directorateId);
    let employeeData = [];
    for (let i = 0; i < employees.length; i++) {
      const report = await getReport(employees[i]._id);
      let result=0;
      if (report && report?.status === "accepted") {
        result = report.net;
      } 
      employeeData.push({
        name: employees[i].name,
        result,
      });
    }
    return res.status(200).json(employeeData);
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

async function getTeamEmployeesResult(req, res) {
  try {
    const { teamId } = req.params;
    const employees = await getEmployeeForTeam(teamId);
    let employeeData = [];
    for (let i = 0; i < employees.length; i++) {
      const report = await getReport(employees[i]._id);
      let result=0;
      if (report && report?.status === "accepted") {
        result = report.net;
      } 
       employeeData.push({
        name: employees[i].name,
        result,
      });
    }
    return res.status(200).json(employeeData);
  } catch (err) {
    return res.status(404).json({
      error: `error on saving ${err} `,
    });
  }
}

module.exports = {
  newReport,
  getReportNotification,
  getReportCheck,
  setReportAccepted,
  checkAccepted,
  modifyRejected,
  getFinalResult,
  notificationAmount,
  getDeputiesResult,
  getAllDirectoratesResult,
  getAllTeamsResult,
  getAllEmployeesResult,
  getDeputyDirectoratesResult,
  getDeputyTeamsResult,
  getDeputyEmployeesResult,
  getDirectorateTeamsResult,
  getDirectorateEmployeesResult,
  getTeamEmployeesResult,
};
