const express=require('express');
const {
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
}=require('./goal.controller');

const goalRouter=express.Router();

goalRouter.post('/new/main',addNewMainTarget);
goalRouter.post('/new/subandmain',addMain_SubTarget);
goalRouter.post('/new/sub',addSubtarget);
goalRouter.post('/new/activity',addActivity);


goalRouter.get('/get/main',getMain_Sub);
goalRouter.get('/get/measurement/main/:subId/:id',getActivityForSO);
goalRouter.get('/get/measurement/planning/:subId',getActivityForSub);

goalRouter.get('/get/assignees/sub/:subId',getAssignees);
goalRouter.put('/edit/assignees/sub/:subId',modifyAssgnees);

goalRouter.get('/get/deputy/:deputyId',getDeputyTargets);
goalRouter.get('/get/directorate/:directorateId',getDirectorateTargets);

goalRouter.get('/get/assignees/sub/deputy/:deputyId/:subId',getAssigneeDirectorates);
goalRouter.put('/edit/assignees/sub/deputy/:deputyId/:subId',modifyAssignnedDirectorates);

goalRouter.get('/get/assignees/measurement/deputy/:deputyId/:activityId',getMeasurementAssignees);
goalRouter.get('/get/assignees/measurement/directorate/:directorateId/:activityId',getMeasurementAssignees_Directorate);
goalRouter.get('/get/assignees/measurement/team/:teamId/:activityId',getAssignnes_Team);

goalRouter.get('/get/measurement/team/:teamId',getMeasurements_Team);
goalRouter.get('/get/measurement/employee/:employeeId',getMeasurements_Employee);
goalRouter.get('/get/measurement/only/:employeeId',getMeasurementOnly);

goalRouter.put('/edit/assignees/measurement/:activityId',modifyMeasurementAssignees);
goalRouter.put('/edit/assignees/measurement/team/:teamId/:activityId',modifyAssignees_Team);


module.exports=goalRouter;