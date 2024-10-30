import RemoveSpan from "./RemoveSpan";
import "../../Style/EachTarget.css";
import SubTarget from "./SubTarget";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlanningTarget } from "../../Utils/Store/PlanningStore/PlannigAsync";
import AddSub from "./AddSub";
import { getOnesTarget } from "../../Utils/Store/PlanningStore/PlannigAsync";

const EachTarget = () => {
  const dispatch: any = useDispatch();
  const planningData = useSelector(
    (state: { planningTarget: any }) => state.planningTarget
  );
  const eachData = useSelector(
    (state: { eachTarget: any }) => state.eachTarget
  );
  const currentData: any = useSelector((state: { type: any }) => state.type);
  let data = [];
  useEffect(() => {
    if (currentData.targetType) {
      dispatch(getPlanningTarget());
    } else {
      const send = {
        type: currentData.current.type,
        deputyId: currentData.current.deputyId,
        directorateId: currentData.current.directorateId,
      };
      dispatch(getOnesTarget(send));
    }
  }, [dispatch, currentData]);
  if (currentData.targetType) {
    data = planningData.items;
  } else {
    data = eachData.items;
  }

  if (data.length === 0) {
    return <span className=" text-2xl p-5 w-80 bg-red-200 rounded text-gray-600 m-5">የተሠጠ ተግባር የለም</span>;
  } else {
    return (
      <div className="">
        {data.map((items: any, index: any) => {
          const targetData = {
            targetId: items.targetId,
            targetTitle: items.targetTitle,
          };

          return (
            <div key={index} className="">
              <div className="grid grid-cols-12 gap-3 text-xl text-gray-800 my-3">
                <span className="justify-self-start">{index + 1}.</span>
                <span className="justify-self-start col-span-8 border-b-2 border-blue-300 py-1">
                  {items.targetTitle}
                </span>
                {currentData.targetType && <RemoveSpan />}
              </div>
              <div className="bg-white shadow-xl rounded pb-2">
                <SubTarget allData={items} />
                {currentData.targetType && <AddSub targetData={targetData} />}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default EachTarget;
