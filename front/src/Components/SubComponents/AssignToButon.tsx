import { useDispatch, useSelector } from "react-redux";
import { layoutActions } from "../../Utils/Store/LayoutStore";
import { inputAction } from "../../Utils/Store/InputStore";
import {
  getSubAssignees,
  getMeasurementAssignees,
} from "../../Utils/Store/PlanningStore/PlannigAsync";

const AssigneeTo: React.FC<{ item: any }> = (props) => {
  const dispatch: any = useDispatch();
  const typeData = useSelector((state: { type: any }) => state.type);
  const send: any = {
    type: props.item.type,
    tarId: props.item.id,
  };

  if (typeData.current.type === "deputy") {
    send.id = typeData.current.deputyId;
  } else if (typeData.current.type === "directorate") {
    send.id = typeData.current.directorateId;
  } else {
    send.id = typeData.current.teamId;
  }

  const assigneeHandler = () => {
    dispatch(layoutActions.setLayOutType("input"));
    dispatch(layoutActions.layoutStatus(true));
    dispatch(inputAction.setType("assignees"));
    dispatch(inputAction.setTitleData(props.item));
    if (typeData.assigneeType === "sub") {
      dispatch(getSubAssignees(send));
    } else {
      dispatch(getMeasurementAssignees(send));
    }
  };
  return (
    <button type="button" className=" border-2 rounded-lg  bg-blue-400 text-gray-200 hover:bg-blue-400/80 py-1   text-[1rem]" onClick={assigneeHandler}>
      ፈፃሚ
    </button>
  );
};

export default AssigneeTo;
