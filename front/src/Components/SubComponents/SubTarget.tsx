import RemoveSpan from "./RemoveSpan";
import "../../Style/SubTarget.css";
import AddMeasurement from "./AddMeasurement";
import AssigneeTo from "./AssignToButon";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const SubTarget: React.FC<{ allData: any }> = (props) => {
  const currentData = useSelector((state: { type: any }) => state.type);
  const forAssignees =
    currentData.targetType || currentData.current.type === "deputy";
  if (props.allData.subtargetData.length === 0) {
    return (
      <div className="main-empty">
        <div className="empty"> there is no any sub target</div>
      </div>
    );
  } else {
    return (
      <div className="py-3 flex flex-col gap-1 mb-2">
        <div className="grid grid-cols-12  text-lg px-4">
          <span></span>
          <span className="justify-self-start col-span-5">ተግባራት</span>
          <span className=" justify-self-start">ክብደት</span>
        </div>
        {props.allData.subtargetData.map((items: any, index: any) => {
          const sendData = {
            type: currentData.targetType
              ? "planning"
              : currentData.current.type,
            title: items.subTitle,
            weight: items.subWeight,
            id: items._id,
          };

          return (
            <div
              key={index}
              className="grid grid-cols-12 px-2 py-1 gap-3 border-b-2 text-[1.2rem] text-gray-700"
            >
              <span className="justify-self-start">{index + 1}.</span>
              <span className="justify-self-start col-span-5 ">
                {items.subTitle}
              </span>
              <span className="justify-self-start">{items.subWeight}</span>
              {forAssignees && <AssigneeTo item={sendData} />}

              {!currentData.targetType && (
                <div className="col-span-3">
                  <AddMeasurement titleData={sendData} />
                </div>
              )}


              {currentData.targetType && (
                <div className="col-span-2 justify-self-center">
                  <RemoveSpan />
                </div>
              )}
              
              <Link className='text-[1rem] border-b-2 hover:text-blue-200' to={`/measurements/${items._id}`}>{'መለኪያዎች >'}</Link>
            </div>
          );
        })}
      </div>
    );
  }
};
export default SubTarget;
