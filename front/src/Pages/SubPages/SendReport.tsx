import "../../Style/Report.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getOnlyMeasurements } from "../../Utils/Store/PlanningStore/PlannigAsync";
import {
  addReport,
  changeReportStatus,
  getReport,
} from "../../Utils/Store/ReportAaync";
import { inputAction } from "../../Utils/Store/InputStore";
import { Link, useParams ,useNavigate} from "react-router-dom";

const SendReport: React.FC<{ type: any }> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate:any=useNavigate();
  const params = useParams();
  const status = params.status;
  const currentData = useSelector((state: { type: any }) => state.type);
  const show = useSelector((state: { inputType: any }) => state.inputType);
  const dispatch: any = useDispatch();
  const measurementData = useSelector(
    (state: { onlyMeasurements: any }) => state.onlyMeasurements
  );

  const reportData = useSelector((state: { report: any }) => state.report);

  useEffect(() => {
    if (props.type === "send") {
      if (status === "not-exist") {
        dispatch(getOnlyMeasurements(currentData.current.id));
      } else {
        dispatch(getReport(currentData.current.id));
      }
    } else {
      dispatch(getReport(params.id));
    }
    dispatch(inputAction.setShowReview(false));
    dispatch(inputAction.setHighAmount(false));
  }, [currentData, dispatch, params.id, props.type, status]);
  let mainData = measurementData.items;
  let header = "ዉጤት";
  let type = "number";
  let date = {
    year: "" as any,
    month: "" as any,
    date: "" as any,
    hour: "" as any,
    minute: "" as any,
  };
  if (status !== "not-exist") {
    const d = new Date(reportData.reportItem.createdDate);
    date.year = d.getFullYear();
    date.month = d.getMonth() + 1;
    date.date = d.getDate();
    date.hour = d.getHours();
    date.minute = d.getMinutes();
    mainData = reportData.reportItem.reports;
  }
  let req = true;
  let mainId = currentData.current.id;
  if (props.type === "receive") {
    header = "አረጋግጥ";
    type = "checkbox";
    req = false;
    mainId = params.id;
  }
  const onSubmit = (data: any) => {
    if (props.type === "send") {
      if (status === "rejected") {
        const netAmount: any = [];
        data.amount.map((items: any, index: any) => {
          if (items) {
            return netAmount.push({
              activityId: mainData[index].activityId,
              amount: items,
            });
          } else {
            return null;
          }
        });
        const sendData = {
          type: "rejected",
          id: reportData.reportItem.employeeId,
          data: netAmount,
        };
        dispatch(changeReportStatus(sendData));
      } else {
        const sendData = mainData.map((items: any, index: any) => {
          return {
            activityId: items._id,
            amount: data.amount[index],
          };
        });
        dispatch(
          addReport({
            employeeId: currentData.current.id,
            type: currentData.currentPhase,
            data: sendData,
          })
        );
      }
      navigate(-1);
    } else {
      const isEvery = data.amount.every((items: any) => items === true);
      if (isEvery) {
        if (show.showHigherAmount) {
          const sendData = {
            id: reportData.reportItem.employeeId,
            status: "accept",
            data: {
              higher: data.higher,
            },
          };
          dispatch(changeReportStatus(sendData));
          navigate(-1);
        } else {
          dispatch(inputAction.setHighAmount(true));
        }
      } else {
        if (show.showReview) {
          const netAmount: any = [];
          console.log(data);
          data.amount.map((items: any, index: any) => {
            if (items !== true) {
              return netAmount.push(mainData[index].activityId);
            } else {
              return null;
            }
          });
          const sendData = {
            status: "rejected",
            id: reportData.reportItem.employeeId,
            data: {
              review: data.review,
              netAmount,
            },
          };
          dispatch(changeReportStatus(sendData));
          navigate(-1);
        } else {
          dispatch(inputAction.setShowReview(true));
        }
      }
    }
  
  };

  const forTitleAmount =
    status === "accepted" || status === "rejected" || status === "not-seen";
  const forItemAmount =
    props.type === "receive" || status === "accepted" || status === "not-seen";

  const forInput =
    (props.type === "receive" && status === "not-seen") ||
    (props.type === "send" && status === "not-exist");
  const forButton =
    forInput || (props.type === "send" && status === "rejected");
  const forStatus =
    (props.type === "receive" && status === "not-seen") ||
    status === "rejected";
if(mainData.length===0){
  return <div>የተሠጠ  መለኪያ የለም</div>
}
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-3 w-[85%]">
      {status!=='not-exist' &&  <div className="grid grid-cols-8 row-cols-2 gap-3  w-full text-lg text-gray-700 mb-2">
        <span className="justify-self-start">የሠራተኛው ስም:-</span>
        <span className="col-span-4 justify-self-start text-blue-400">{reportData.reportItem.employeeName}</span>
        <span className="justify-self-end">የተላከበት ቀን:</span>
        <span className="justify-self-start col-span-2 text-blue-400">
          {date.date}/{date.month}/{date.year}-{date.hour}:{date.minute}
        </span>

        <span className="justify-self-start">ያለበት ሁኔታ</span>
        <span className= {reportData.reportItem.status === "accepted"
                      ? "justify-self-start text-blue-400"
                      : reportData.reportItem.status === "not-seen"
                      ? "justify-self-start text-green-400"
                      : "justify-self-start text-red-400"}>{reportData.reportItem.status}</span>
      </div>}
      {status === "rejected" && <div className="m-4 bg-red-100 p-3 text-xl rounded-lg border-2 border-red-400 ">{reportData.reportItem.review}</div>}

      <div className="measure-main">
     
        <div className="grid grid-cols-12 px-3 py-5 bg-blue-400 text-gray-100 text-md shadow-md rounded-md gap-1">
          <span className="justify-self-start">ተ.ቁ</span>
          <span className="justify-self-start">መለኪያ</span>
          <span className="col-span-4 justify-self-start">ተግባራት</span>
          <span className="">ክብደት</span>
          <span className="">የ 6 ወራት ኢላማ</span>
          {forTitleAmount && <span className="">ውጤት</span>}
          {forInput && <span className=""> {header}</span>}
          {forStatus && <span className="justify-self-start">ያለበት ሁኔታ</span>}
          {status === "accepted" && <span className="">የተጣራ ውጤት</span>}
        </div>

        {mainData.map((items: any, index: any) => {
          return (
            <div
              key={index}
              className="grid grid-cols-12 p-3 bg-white text-gray-700 rounded-md shadow-md"
            >
              <span className="justify-self-start">{index + 1}.</span>
              <span className="justify-self-start">{items.metrics}</span>
              <span className="justify-self-start col-span-4">
                {items.description}
              </span>
              <span className="">{items.weight}</span>
              <span className="">{items.halfYearTarget}</span>
              {forItemAmount && <span className="">{items.amount}</span>}
              {status === "rejected" &&
                props.type === "send" &&
                items.status === "accepted" && (
                  <span className="">{items.amount}</span>
                )}
              {status === "rejected" &&
                props.type === "send" &&
                items.status === "rejected" && (
                  <input
                    type="number"
                    placeholder={items.amount}
                    className="border-2 w-[70%] border-blue-200 rounded-lg "
                    {...register(`amount.${index}`, { required: true })}
                  />
                )}
              {forInput && (
                <input
                  type={type}
                  className="border-2 w-[70%] border-blue-200 rounded-lg "
                  {...register(`amount.${index}`, { required: req })}
                />
              )}
              {forStatus && (
                <span
                  className={
                    items.status === "accepted"
                      ? "justify-self-start text-blue-400"
                      : items.status === "not-seen"
                      ? "justify-self-start text-green-400"
                      : "justify-self-start text-red-400"
                  }
                >
                  {items.status}
                </span>
              )}
              {status === "accepted" && (
                <span className="">{items.result}</span>
              )}
            </div>
          );
        })}
      </div>

      {show.showReview && (
        <div>
        <textarea className="border-2 border-blue-200 p-2 m-3"
          cols={60}
          rows={6}
          {...register("review", { required: true })}
        />
        </div>
      )}

      {show.showHigherAmount && (<div className="flex gap-5 mx-16 mt-4 ">
      <span className="text-lg">በቅርብ ሃላፊ የሚሰጠ (ከ30%)</span>
        <input type="number"  className="border-2 border-blue-200 rounded-lg w-20 h-9" {...register(`higher`, { required: true })} />
        </div>
      )}

      {forButton && <button  className="border-2 rounded-lg  bg-blue-400 text-gray-200 hover:bg-blue-400/80 py-2 px-4  mt-4 w-28"> ላክ</button>}
    
      {status === "accepted" && (
        <div className="mt-4">
        <Link
          to={`/result/${mainId}`}
          className="border-2 rounded-lg  bg-blue-400 text-gray-200 hover:bg-blue-400/80 p-2 mt-32 "
        >
          ዉጤት
        </Link>
        </div>
      )}
    </form>
  );
};

export default SendReport;
