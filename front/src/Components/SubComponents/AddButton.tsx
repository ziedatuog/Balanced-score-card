import { useDispatch, useSelector } from "react-redux";
import { layoutActions } from "../../Utils/Store/LayoutStore";
import { inputAction } from "../../Utils/Store/InputStore";
import ArchitectureType from "./ArchitectureType";
import { targetSliceAction } from "../../Utils/Store/PlanningStore/TargetType";
import { getForEachData } from "../../Utils/Store/HRStore/HrAsync";

const AddButton: React.FC<{ inputType: any; header: string }> = (props) => {
  const browseType = useSelector((state: { offices: any }) => state.offices);
  const inputEachType = useSelector(
    (state: { inputType: any }) => state.inputType
  );

  const dispatch: any = useDispatch();
  const showEach = browseType.browsingEach.status && inputEachType.addEach;
  const showLayoutHandler = (sth: any) => {
    if (browseType.browsingEach.status) {
      if (inputEachType.addEach) {
        dispatch(inputAction.setAddEachFalse());
      } else {
        dispatch(inputAction.setAddEach());
        dispatch(getForEachData(props.inputType));
      }
    } else {
      if (props.inputType.type === "target") {
        dispatch(targetSliceAction.setOnMain(true));
      }
      dispatch(layoutActions.layoutStatus(true));
      dispatch(inputAction.setType(sth));
    }
    dispatch(layoutActions.setLayOutType("input"));
  };

  return (
    <div className="">
      {showEach && <ArchitectureType type={props.inputType.type} />}
      <button
        className="border-2 rounded-lg  bg-blue-300 text-gray-800 hover:bg-blue-400/80 py-2  text-[1rem] px-3 "
        onClick={() => showLayoutHandler(props.inputType.type)}
      >
        {props.header}
      </button>
    </div>
  );
};

export default AddButton;
