import "../../Style/Report.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReportNotification } from "../../Utils/Store/ReportAaync";
import { Link } from "react-router-dom";
import Card from "../../Components/Cards/Card";
import { receiverIdentify } from "../../Utils/Store/helper/helper";
const ReportNotifications = () => {
  const notificationData = useSelector(
    (state: { reportNotification: any }) => state.reportNotification
  );
  const current = useSelector((state: { type: any }) => state.type.current);
  const dispatch: any = useDispatch();
  
  const mainId=receiverIdentify(current);
  useEffect(() => {
    dispatch(getReportNotification(mainId));
  }, [dispatch, mainId]);

  if (notificationData.items.length === 0) {
    return <div className="text-2xl p-5 w-80 bg-red-200 rounded text-gray-600 m-5">የተላከ ሪፓርት የለም</div>;
  } else {
    return (
      <Card>
        <header className="m-2 text-gray-600">የተላኩ ሪፖርቶች</header>

        {notificationData.items.map((items: any, index: any) => {
          const d = new Date(items.createdDate);
          const year = d.getFullYear();
          const month = d.getMonth() + 1;
          const date = d.getDate();
          const hour = d.getHours();
          const minute = d.getMinutes();
          return (
            <Link
              className="w-[55%] bg-white grid grid-cols-5 px-6 py-2 rounded-md shadow-md text-gray-600 gap-3 mb-2  hover:bg-gray-100/70"
              key={index}
              to={`/receive/${items.status}/${items.employeeId}`}
            >
              <span className="col-span-2 justify-self-start">
                {items.employeeName} 
              </span>
              <span className="justify-self-end">የተላከበት ቀን:</span>
              <span className="justify-self-start">
                {date}/{month}/{year}-{hour}:{minute}
              </span>
              <span
                className={
                  items.status === "accepted"
                    ? "justify-self-end text-blue-400"
                    : items.status === "not-seen"
                    ? "justify-self-end text-green-400"
                    : "justify-self-end text-red-400"
                }
              >
                {items.status}
              </span>
            </Link>
          );
        })}
      </Card>
    );
  }
};
export default ReportNotifications;
