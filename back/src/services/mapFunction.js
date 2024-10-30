function mainAndSubMapping(mainData, assignedSubtargets) {
  const data = [];
  mainData.map((items) => {
    const subtargetData = assignedSubtargets.filter(
      (value) => value.targetId == items._id
    );
    if (subtargetData.length !== 0) {
      return data.push({
        targetId: items._id,
        targetTitle: items.targetTitle,
        subtargetData,
      });
    } else {
      return;
    }
  });
  return data;
}

function teamAssignees(assigneeTeam, teams) {
  const data = [];
  teams.map((items) => {
    const filteredData = assigneeTeam.find(
      (item) => item.assigneeId === items._id
    );
    if (filteredData) {
      return data.push({
        assigneeId: items._id,
        assigneeName: `${items.name} team`,
        assignedWeight: filteredData.assignedWeight,
        halfYearTarget: filteredData.halfYearTarget,
        firstQuarter: filteredData.firstQuarter,
      });
    } else {
      return data.push({
        assigneeId: items._id,
        assigneeName: `${items.name} team`,
        assignedWeight: 0,
        halfYearTarget: 0,
        firstQuarter: 0,
      });
    }
  });
  return data;
}
function empAssignees(assignees, employees) {
  const data = [];
  employees.map((items) => {
    const filteredData = assignees.find(
      (item) => item.assigneeId === items._id
    );
    if (filteredData) {
      return data.push({
        assigneeId: items._id,
        assigneeName: items.name,
        assignedWeight: filteredData.assignedWeight,
        halfYearTarget: filteredData.halfYearTarget,
        firstQuarter: filteredData.firstQuarter,
      });
    } else {
      return data.push({
        assigneeId: items._id,
        assigneeName: items.name,
        assignedWeight: 0,
        halfYearTarget: 0,
        firstQuarter: 0,
      });
    }
  });
  return data;
}

function measureAndSubMapping(subtargets, measurementData) {
  const data = [];
  subtargets.map((items) => {
    const filteredMeasurements = measurementData.filter(
      (value) => value.subId === items._id
    );
    if (filteredMeasurements.length !== 0) {
      return data.push({
        _id: items._id,
        targetId: items.targetId,
        subTitle: items.subTitle,
        subWeight: items.subWeight,
        measurements: [...filteredMeasurements],
      });
    } else {
      return;
    }
  });
  return data;
}
function modifyAssignees_Emp_team(items, assigneeEmp) {
  const filteredData = assigneeEmp.find(
    (key) => key.assigneeId === items.assigneeId
  );
  if (filteredData) {
    if (items.assignedWeight === "0") {
      const index = assigneeEmp.findIndex(
        (key) => key.assigneeId === items.assigneeId
      );
      return assigneeEmp.splice(index, 1);
    } else if (items.assignedWeight !== filteredData.assignedWeight) {
      const index = assigneeEmp.findIndex(
        (key) => key.assigneeId === items.assigneeId
      );
      return assigneeEmp.splice(index, 1, items);
    } else {
      if (
        items.halfYearTarget !== filteredData.halfYearTarget ||
        items.firstQuarter !== filteredData.firstQuarter
      ) {
        const index = assigneeEmp.findIndex(
          (key) => key.assigneeId === items.assigneeId
        );
        return assigneeEmp.splice(index, 1, items);
      }
      return;
    }
  } else {
    if (items.assignedWeight === 0) {
      return;
    } else {
      return assigneeEmp.push(items);
    }
  }
}

function modifyAssignees_Dir_Dep(items, assigneeDir) {
  const filteredData = assigneeDir.find(
    (key) => key.assigneeId === items.assigneeId
  );
  if (filteredData) {
    if (items.assignedWeight === "0") {
      const index = assigneeDir.findIndex(
        (key) => key.assigneeId === items.assigneeId
      );
      return assigneeDir.splice(index, 1);
    } else if (items.assignedWeight !== filteredData.assignedWeight) {
      const index = assigneeDir.findIndex(
        (key) => key.assigneeId === items.assigneeId
      );
      return assigneeDir.splice(index, 1, items);
    } else {
      return;
    }
  } else {
    if (items.assignedWeight === 0) {
      return;
    } else {
      return assigneeDir.push(items);
    }
  }
}
function getMeasurement(activities, employee) {
  const measurementData = [];
  activities.map((items) => {
    if (employee.teamId === null) {
      const assignedData = items.assignees.find(
        (value) => value.assigneeId === employee._id
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
    } else {
      const assignedTeam = items.assigneeTeam.find(
        (value) => value.assigneeId === employee.teamId
      );
      if (assignedTeam) {
        const assignedData = assignedTeam.assignees.find(
          (value) => value.assigneeId === employee._id
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
            resultData:
              items.metrics === "time"
                ? timeResultLevelAssigneer(assignedData.halfYearTarget)
                : resultLevelAssigneer(assignedData.halfYearTarget),
          });
        } else {
          return;
        }
      } else {
        return;
      }
    }
  });
  return measurementData;
}

function resultLevelAssigneer(halfYearTarget) {
  const someData = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };
  const keys = Object.keys(someData);
  for (let index in keys) {
    let currentData = (parseInt(halfYearTarget) * (95 - index * 15)) / 100;
    if (index == 0) {
      someData[keys[index]] = Math.round(currentData);
      continue;
    } else if (index == 4) {
      someData[keys[index]] = someData[keys[index - 1]];
    } else {
      if (someData[keys[index - 1]] - currentData < 1) {
        someData[keys[index]] = Math.floor(currentData);
        break;
      } else {
        someData[keys[index]] = Math.round(currentData);
      }
    }
  }
  return someData;
}

function timeResultLevelAssigneer(halfYearTarget) {
  const someData = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };
  const keys = Object.keys(someData);
  for (let index in keys) {
    let currentData =
      parseInt(halfYearTarget) +
      (parseInt(halfYearTarget) * (index * 15)) / 100;
    if (index == 0) {
      someData[keys[index]] = currentData;
    } else if (index == 4) {
      someData[keys[index]] = someData[keys[index - 1]] + 1;
    } else {
      if (
        currentData - someData[keys[index - 1]] < 1 &&
        currentData - someData[keys[index - 1]] > 0
      ) {
        someData[keys[index]] = Math.ceil(currentData);
      } else if (currentData - someData[keys[index - 1]] < 0) {
        someData[keys[index]] = Math.ceil(currentData) + 1;
      } else {
        someData[keys[index]] = Math.round(currentData);
      }
    }
  }
  return someData;
}

function setResult(metrics, halfYearTarget, amount) {
  const resultPercentage = (amount * 100) / halfYearTarget;
  let difference = 100 - resultPercentage;
  let finalResult = 0;
  let subtracter = 5;
  if (metrics === "time") {
    difference = resultPercentage - 100;
    subtracter = 0;
  }

  if (
    (metrics === "time" && difference <= 0) ||
    (metrics !== "time" && difference <= 5)
  ) {
    return (finalResult = 5);
  }
  const finalDifference = difference - subtracter;
  const lostAmount = Math.ceil(finalDifference / 15);
  if (lostAmount >= 4) {
    return (finalResult = 1);
  }

  return (finalResult = 5 - lostAmount);
}
module.exports = {
  mainAndSubMapping,
  teamAssignees,
  empAssignees,
  measureAndSubMapping,
  modifyAssignees_Emp_team,
  modifyAssignees_Dir_Dep,
  getMeasurement,
  setResult,
};
