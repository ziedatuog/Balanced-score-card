import { layoutActions } from "../LayoutStore";
import { targetSliceAction } from "../PlanningStore/TargetType";
import { inputAction } from "../InputStore";
const helper = (dispatch: any) => {
  dispatch(layoutActions.layoutStatus(false));
  dispatch(inputAction.setAddEachFalse());
  dispatch(targetSliceAction.setOnMain(false));
  dispatch(targetSliceAction.setOnSub(false));
};
export default helper;

export const receiverIdentify = (current: any) => {
    let mainId=null;
  switch (current.type) {
    case "deputy":
      mainId = current.deputyId;
      break;
    case "directorate":
      mainId = current.directorateId;
      break;
    case "team":
      mainId = current.teamId;
      break;
    case "employee":
      mainId = current.id;
      break;
    case "comissioner":
      mainId = current.id;
  }
  return mainId;
};
