import "../../Style/Measuremnt.css";
import { useSelector, useDispatch } from "react-redux";
import AssigneeTo from "../../Components/SubComponents/AssignToButon";
import RemoveSpan from "../../Components/SubComponents/RemoveSpan";
import AddMeasurement from "../../Components/SubComponents/AddMeasurement";
import { useEffect } from "react";
import { typeAction } from "../../Utils/Store/CommonStore";
import { getSubMeasurements } from "../../Utils/Store/PlanningStore/PlannigAsync";
import { useParams } from "react-router-dom";
const MeasurementBrowse = () => {
  const dispatch: any = useDispatch();
  const currentData = useSelector((state: { type: any }) => state.type);
  const measurementData = useSelector(
    (state: { subMeasurements: any }) => state.subMeasurements
  );
  const param = useParams();

  useEffect(() => {
    let id = currentData.current.deputyId;
    let type = null;
    if (currentData.current.type === "directorate") {
      id = currentData.current.directorateId;
    }
    if (currentData.targetType) {
      type = "planning";
    }
    dispatch(typeAction.setAssigneeType("measurement"));
    dispatch(
      getSubMeasurements({
        type,
        subId: param.subId,
        id,
      })
    );
  }, [currentData, dispatch, param]);
  const forRemove =
    currentData.current.type === "deputy" ||
    (!currentData.targetType && currentData.current.type === "directorate");

  const sendData = {
    type: currentData.current.type,
    title: measurementData.item.subTitle,
    weight: measurementData.item.subWeight,
    id: measurementData.item.subId,
  };
 if(measurementData.item.measurements.length===0){
  return <span className=" text-2xl p-5 w-80 bg-red-200 rounded text-gray-600 m-5">የተሠጠ ተግባር የለም</span>;
 } 
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <header className="bg-white py-2 px-2 w-80 rounded-lg shadow-sm text-blue-400">ተግባራት</header>
      <div className="grid grid-cols-6 gap-3 w-[80%] text-xl">
        <span className="text-gray-700">ተግባር</span>
        <span className="justify-self-start col-span-2 text-blue-400">{measurementData.item.subTitle} </span>
        <span className="text-gray-700">ክብደት</span>
        <span className="justify-self-start text-blue-400">{measurementData.item.subWeight}</span>
      </div>
      <div className="bg-white w-[90%] rounded-md shadow-md p-5">
        <div className="grid grid-cols-12 mb-4 text-[1.1rem] gap-2">
          <span className="justify-self-start">ተ.ቁ</span>
          <span className="justify-self-start col-span-4">ተግባራት</span>
          <span className="justify-self-start">መለኪያ</span>
          <span className="">የመለኪያ ክብደት</span>
          <span className="">የ 6 ወራት ኢላማ</span>
          <span className="">1ኛ ሩብ ዓመት</span>
          <span className="">2ኛ ሩብ ዓመት</span>
        </div>

        {measurementData.item.measurements.map((items: any, index: any) => {
          const sendData = {
            type: currentData.targetType
              ? "planning"
              : currentData.current.type,
            title: items.description,
            weight: items.weight,
            id: items._id,
          };
          return (
            <div
              key={index}
              className="grid grid-cols-12  border-b-2 text-gray-700 p-2"
            >
              <span className="justify-self-start">{index + 1}</span>
              <span className="justify-self-start col-span-4">
                {items.description}
              </span>
              <span className="justify-self-start">{items.metrics}</span>
              <span className="">{items.weight}</span>
              <span className="">{items.halfYearTarget}</span>
              <span className="">{items.firstQuarter}</span>
              <span className="">
                {items.halfYearTarget - items.firstQuarter}
              </span>
              {!currentData.targetType && <AssigneeTo item={sendData} />}

              {forRemove && <RemoveSpan />}
            </div>
          );
        })}
      </div>
      {forRemove && <AddMeasurement titleData={sendData} />}
    </div>
  );
};

export default MeasurementBrowse;
