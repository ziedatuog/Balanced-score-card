const {
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

}=require('./reports.controller');
const express=require('express');

const reportRouter=express.Router();
reportRouter.post('/new',newReport);
reportRouter.get('/notification/:receiverId',getReportNotification);
reportRouter.get('/one/:employeeId',getReportCheck);
reportRouter.put('/response/:status/:employeeId',setReportAccepted);
reportRouter.get('/status/:employeeId',checkAccepted);
reportRouter.get('/result/:employeeId',getFinalResult);
reportRouter.put('/correct/:employeeId',modifyRejected);
reportRouter.get('/deputy/all',getDeputiesResult);
reportRouter.get('/count/:receiverId',notificationAmount);
reportRouter.get('/directorate/all',getAllDirectoratesResult);
reportRouter.get('/team/all',getAllTeamsResult);
reportRouter.get('/employee/all', getAllEmployeesResult);
reportRouter.get('/directorate/:deputyId',getDeputyDirectoratesResult);
reportRouter.get('/team/deputyId',getDeputyTeamsResult);
reportRouter.get('/employee/:deputyId',getDeputyEmployeesResult);
reportRouter.get('/team/:directorateId',getDirectorateTeamsResult);
reportRouter.get('/employee/:directorateId',getDirectorateEmployeesResult);
reportRouter.get('/employee/:teamId',getTeamEmployeesResult);
module.exports=reportRouter;

