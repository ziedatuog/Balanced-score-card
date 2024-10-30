import EachResult from "../../Components/SubComponents/EachResult";
import ReportNotifications from "../SubPages/ReportsNotification"
const ComissionerHome=()=>{
    return (<>
    <div className="w-full flex  justify-end mr-36 items-center gap-5">
       
     <EachResult type='all' />
      </div>
    <ReportNotifications />
    </>)
}
export default ComissionerHome;