import "../../Style/TeamHome.css";
import AssigneeTo from "./AssignToButon";
import {  useSelector } from "react-redux";
const SubTeam: React.FC<{ sub: any }> = (props) => {
  const current:any = useSelector((state: { type: any }) => state.type.current);
  return (
    <>
      {props.sub.map((items: any, index: any) => {
        return (
          <div key={index} className="p-2 pl-4">
            <div className="grid grid-cols-12 mb-3 ml-8">
              <span className="justify-self-start border-b-2 border-blue-400">ተግባር</span>
              <span className="justify-self-start col-span-5">{items.subTitle}</span>
              <span className="justify-self-start border-b-2 border-blue-400">ክብደት</span>
              <span className="justify-self-start">{items.subWeight}</span>
            </div>
            <div className="bg-white rounded shadow-xl   rounded-lg p-3">
              <div className="grid grid-cols-11 mb-4 text-[1.1rem] gap-2">
                <span className="justify-self-start">ተ.ቁ</span>
                <span className="justify-self-start col-span-4">ተግባራት</span>
                <span className="justify-self-start ">መለኪያ</span>
                <span className="justify-self-start ">የመለኪያ ክብደት</span>
                <span className="justify-self-start ">የ 6 ወራት ኢላማ</span>
                <span className="justify-self-start ">1ኛ ሩብ ዓመት</span>
                <span className="justify-self-start ">2ኛ ሩብ ዓመት</span>
              </div>
              {items.measurements.map((items: any, index: any) => {
                const sendData = {
                  type: current.type,
                  title: items.description,
                  weight: items.weight,
                  id: items._id,
                };
                return (
                  <div key={index} className="grid grid-cols-11  border-b-2 text-gray-700 p-2">
                    <span  className="justify-self-start ">{index + 1}</span>
                    <span  className="justify-self-start col-span-4 ">{items.description}</span>
                    <span  className="justify-self-start ">{items.metrics}</span>
                    <span  className="">{items.weight}</span>
                    <span  className="">{items.halfYearTarget}</span>
                    <span  className="">{items.firstQuarter}</span>
                    <span  className="">{items.halfYearTarget-items.firstQuarter}</span>
                    <AssigneeTo item={sendData} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
export default SubTeam;
