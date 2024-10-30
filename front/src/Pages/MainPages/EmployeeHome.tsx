import { Link } from "react-router-dom";
import Table from "../../Components/MainComponents/Table";
import { useSelector } from "react-redux";
import Card from "../../Components/Cards/Card";
const EmployeeHome = () => {
  const status = useSelector(
    (state: { reportStatus: any }) => state.reportStatus
  );
  const current = useSelector((state: { type: any }) => state.type.current);
  return (
    <Card>
      <div className="flex justify-end w-full mr-16">
        <Link
          className="border-2 rounded-lg border-blue-300 hover:text-blue-300 p-1 text-gray-500"
          to={`/send/${status.reportStatus.status}`}
        >
          {"ሪፖርት ላክ>"}
        </Link>
      </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-2 text-xl text-gray-800 mb-4">
        <span className="col-span-4">የሠራተኛው የግብ ተኮር ተግባራት ዕቅድ አፈጻጸም ስምምነት ከ70%</span>
        <span>የሠራተኛው ስም:-</span>
        <span className="justify-self-start text-blue-400">{current.userName}</span>
        <span>የሥራ መደቡ መጠሪያ:- </span>
        <span className="justify-self-start text-blue-400" >{current.role}</span>
      </div>
      <Table />
    </Card>
  );
};
export default EmployeeHome;
