import { useDispatch } from "react-redux";
import { inputAction } from "../../Utils/Store/InputStore";
import { layoutActions } from "../../Utils/Store/LayoutStore";

const AddMeasurement: React.FC<{ titleData: any }> = (props) => {
  const dispatch: any = useDispatch();
  const showMeasureHandler = () => {
    dispatch(layoutActions.layoutStatus(true));
    dispatch(layoutActions.setLayOutType("input"));
    dispatch(inputAction.setType("measurement"));
    dispatch(inputAction.setTitleData(props.titleData));
  };
  return (
    <button
      type="button"
      className="border-2 rounded-lg py-1 bg-blue-400 text-gray-200 hover:bg-blue-400/80 text-[1rem] px-5"
      onClick={showMeasureHandler}
    >
      አዲስ መለኪያ
    </button>
  );
};

export default AddMeasurement;
