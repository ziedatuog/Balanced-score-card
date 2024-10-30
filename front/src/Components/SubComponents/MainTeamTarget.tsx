import SubTeam from "./SubMeasureTeam";
import { useEffect } from "react";
import { getTeamMeasurements } from "../../Utils/Store/PlanningStore/PlannigAsync";
import { useDispatch, useSelector } from "react-redux";
import { typeAction } from "../../Utils/Store/CommonStore";
const MainTeam = () => {
  const mainData = useSelector(
    (state: { teamMeasurements: any }) => state.teamMeasurements
  );
  const currentId: any = useSelector(
    (state: { type: any }) => state.type.current.teamId
  );
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(typeAction.setAssigneeType("measurement"));
    dispatch(getTeamMeasurements(currentId));
  }, [currentId, dispatch]);
  if(mainData.items.length===0 ) {
    return  <span className=" text-2xl p-5 w-80 bg-red-200 rounded text-gray-600 m-5">የተሠጠ ተግባር የለም</span>;
  }
  return (
    <div className="w-[90%]">
         <span className="text-2xl font-semi-bold">የግብ ተኮር ተግባራት </span>
      {mainData.items.map((items: any, index: any) => {
        return (
          <div className="" key={index}>
            <div className="flex gap-3 text-xl my-3">
              <span>{index + 1}.</span>
              <span>main title</span>
              <span>{items.targetTitle}</span>
            </div>
            <SubTeam sub={items.subtargetData} />
          </div>
        );
      })}
    </div>
  );
};
export default MainTeam;
