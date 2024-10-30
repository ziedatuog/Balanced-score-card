import { targetSliceAction } from "../../Utils/Store/PlanningStore/TargetType";
import { useDispatch } from "react-redux";
import { inputAction } from "../../Utils/Store/InputStore";
import { layoutActions } from "../../Utils/Store/LayoutStore";


const AddSub:React.FC<{targetData:any}>=(props)=>{
const dispatch:any=useDispatch();
    const showSubHandler=()=>{
        dispatch(layoutActions.setLayOutType('input'))
        dispatch(targetSliceAction.setOnSub(true));
        dispatch(targetSliceAction.setTargetData(props.targetData));
        dispatch(layoutActions.layoutStatus(true));
        dispatch(inputAction.setType('target'));
    }
    return (
        <button type="button"  className="border-2 rounded-lg  bg-blue-400 text-gray-200 hover:bg-blue-400/80 py-2  text-[1rem] px-3" onClick={showSubHandler}>አዲስ ተግባር</button>
    )
}

export default AddSub;