import { notificationAmount } from "../../Utils/Store/ReportAaync";
import { useEffect } from "react";
import { receiverIdentify } from "../../Utils/Store/helper/helper";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ReportLink = () => {
  const currentData = useSelector((state: { type: any }) => state.type.current);
  const amount=useSelector((state:{notificationCount:any})=>state.notificationCount.item)
  console.log(amount)
  const dispatch: any = useDispatch();
  const mainId = receiverIdentify(currentData);
  useEffect(() => {
    dispatch(notificationAmount(mainId));
  }, [dispatch, mainId]);

  return (
    
    <Link
      className="w-28 border-2 py-1 px-3 border-gray-200 bg-blue-400 rounded-3xl  text-center text-lg hover:bg-blue-400/80 text-gray-200 "
      to={"/notifications"}
    >
      <span>ሪፖርቶች</span>
     {
      amount!==0 && <span className="rounded-full bg-red-400 ml-2 px-1 ">{amount}</span>
     }
    </Link>
  );
};

export default ReportLink;
