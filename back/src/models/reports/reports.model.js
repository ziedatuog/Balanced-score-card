const Reports = require("./reports.mongo");

async function saveReport(data) {
  const newItem = new Reports(data);
  await newItem.save();
}
async function getReportsSome(require) {
  return await Reports.find(
    { receiverId: require },
    {
      _id: 1,
      employeeId: 1,
      status: 1,
      createdDate: 1,
    }
  );
}
async function getReport(require) {
  return await Reports.findOne(
    { employeeId: require },
    {
     _v:0,
    }
  );
}

async function saveChange(require) {
 await require.save();
}
module.exports = {
  saveReport,
  getReportsSome,
  getReport,
  saveChange,
};
