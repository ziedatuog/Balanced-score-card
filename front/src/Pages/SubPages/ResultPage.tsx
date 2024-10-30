import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { getResult } from "../../Utils/Store/ReportAaync";
import { useParams } from "react-router-dom";
import Card from "../../Components/Cards/Card";
const ResultPage = () => {
  const dispatch:any=useDispatch();
  const resultData = useSelector((state: { result: any }) => state.result);
  const {id}=useParams()
  useEffect(()=>{
  dispatch(getResult(id));
  },[dispatch, id])
  
  return (
    <Card>
      <div className="grid grid-cols-6 text-lg text-gray-700 my-3 w-[70%] gap-3">
        <span >የሠራተኛው ስም:-</span>
        <span className="justify-self-start col-span-2 text-blue-400">{resultData.item.employeeName}</span>
        <span className="">የሥራ መደቡ መጠሪያ:-</span>
        <span className="justify-self-start col-span-2 text-blue-400">{resultData.item.employeeRole}</span>
      </div>

      <table border={1} cellSpacing={0} className="border-2 border-black bg-white p-2 text-gray-900">
        <thead className="border-2 border-gray-700 bg-blue-400 p-2">
          <tr className="border-2 border-gray-700 p-2">
            <th colSpan={3} className="border-2 border-gray-700 p-2">የምዘና መስፈርቶችና የተገኘ ውጤት</th>
            <th rowSpan={2} className="border-2 border-gray-700 p-2">የአፈፃፀም ደረጃ</th>
            <th rowSpan={2} className="border-2 border-gray-700 p-2">ምርመራ</th>
          </tr>
          <tr className="border-2 border-gray-700 p-2">
            <th className="border-2 border-gray-700 p-2">ግብ ተኮር ተግባራት አፈፃፀም(ከ70%)</th>
            <th className="border-2 border-gray-700 p-2">በቅርብ ሃላፊ የተሰጠ (ከ30%)</th>
            <th className="border-2 border-gray-700 p-2">አጠቃላይ ሠራተኛው ያገኘዉ የአፈፃፀም ውጤት(ከ100%)</th>
          </tr>
        </thead>
        <tbody className="border-2 border-gray-700">
          <tr className="border-2 border-gray-700">
            <td className="border-2 border-gray-700">{resultData.item.reportResult}</td>
            <td className="border-2 border-gray-700 p-2">{resultData.item.feedbackResult}</td>
            <td className="border-2 border-gray-700 p-2">{resultData.item.netResult}</td>
            <td className="border-2 border-gray-700 p-2"></td>
          </tr>
        </tbody>
      </table>
      <div className="w-[95%] flex m-4 justify-end gap-3">
        <button className="border-2 rounded bg-gray-500  text-gray-200 hover:bg-gray-500/90 px-3 py-1  text-[1rem]">ወደ ፒዲኤፍ</button>
        <button className="border-2 rounded  bg-gray-500 text-gray-200 hover:bg-gray-500/90 px-3 py-1 text-[1rem]">ኢ-ሜይል ላክ</button>
      </div>
    </Card>
  );
};

export default ResultPage;
