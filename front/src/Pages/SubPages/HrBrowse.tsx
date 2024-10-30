import OfficeBrowse from "../../Components/SubComponents/OfficeBrowse"
import ShowCommissioner from "../../Components/SubComponents/ShowCommissioner"
import { useSelector } from "react-redux";
import Card from "../../Components/Cards/Card";
const HrBrowse=()=>{
    const officesType = useSelector((state: { offices: any }) => state.offices);
    return (<Card>
      <header className="bg-white text-blue-400 p-2 w-[70%] rounded-lg shadow-md mt-5 mb-12">የኮሚሽኑ መዋቅር</header>
        <div className="flex gap-10 w-[70%] justify-center mb-14 ">
        <OfficeBrowse officeType={officesType.deputy} />
        <OfficeBrowse officeType={officesType.directorate} />
        <OfficeBrowse officeType={officesType.employee} />
      </div>
      <ShowCommissioner />
    </Card>)
}


export default HrBrowse;
