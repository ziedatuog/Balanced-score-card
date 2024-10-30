import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getResultRate } from "../../Utils/Store/ReportAaync";
import EachResult from "../../Components/SubComponents/EachResult";
const EachResultPage = () => {
    const {type}=useParams();
    const currentData = useSelector((state: { type: any }) => state.type);
    const rateData = useSelector((state: { resultRate: any }) => state.resultRate.items);
    const dispatch:any=useDispatch();
    useEffect(()=>{
      const sth={
        type:type,
        id:'all',
      }
      if(currentData.targetType===true || currentData.current.type==='commissioner'){
        sth.id='all';
      } else {
      if(currentData.current.type==='deputy'){
        sth.id=currentData.current.deputyId;
      } else if(currentData.current.type==='directorate'){
       sth.id=currentData.current.directorateId;
      } else {
        sth.id=currentData.current.teamId;
      }
      }
      dispatch(getResultRate(sth));
    },[currentData, dispatch, type])

  return (
    <div className="w-[60%] flex flex-col gap-4 pb-8">
      <div className="w-full flex  justify-end mr-36 items-center gap-5">
       
       <EachResult type='all' />
        </div>
        <div className="w-[80%] flex flex-col gap-4 pb-8">
      <header className="px-3 py-3 bg-blue-400 text-gray-100 text-md shadow-md rounded-md gap-1 ">
        {type}
      </header>
      {rateData.length === 0 && <div>there is not any depaetments for </div>}
      {rateData.length !== 0 && (
        <div className="flex flex-col gap-3">
          {rateData.map((items: any, index: any) => {
            return (
              <div
                key={index}
                className="grid grid-cols-12 gap-3  bg-white text-gray-700 rounded-md shadow-md pr-2 text-xl "
              >
                <span className="list-each-title col-span-10       justify-self-start pl-5 w-full text-start py-4 text-lg ">
                  {items.name}
                </span>
                <span className={items.result>80?"text-green-500 py-4 col-span-2":(items.result>50 && items.result<80)?"text-yellow-500 py-4 col-span-2":"text-red-500 col-span-2 py-4"}>{items.result} %</span>
              </div>
            );
          })}
        </div>
      )}
      {}
      </div>
    </div>
  );
};
export default EachResultPage;
