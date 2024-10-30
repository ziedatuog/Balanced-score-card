import EachTarget from "../SubComponents/EachTarget";
import { useEffect } from "react";
import { typeAction } from "../../Utils/Store/CommonStore";
import { useDispatch } from "react-redux";
const Target = () => {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(typeAction.setAssigneeType("sub"));
  }, [dispatch]);
  return (
    <div className="w-[90%]  p-1">
      <div className="text-2xl">የግብ ተኮር ተግባራት </div>
     <EachTarget />
    </div>
  );
};
export default Target;
