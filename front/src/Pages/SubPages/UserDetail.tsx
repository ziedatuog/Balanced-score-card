import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getForEach } from "../../Utils/Store/HRStore/HrAsync";
import { inputAction } from "../../Utils/Store/InputStore";
import { layoutActions } from "../../Utils/Store/LayoutStore";
const EmployeeDetail: React.FC<{ page: string }> = ({ page }) => {
  const typpe = useParams();
  const dispatch: any = useDispatch();
  const browsedData = useSelector(
    (state: { getForEachElement: any }) => state.getForEachElement
  );
  const current = useSelector((state: { type: any }) => state.type.current);
  useEffect(() => {
    let sth = {
      type: "employee",
      id: typpe.id,
    };
    if (page === "profile") {
      sth.type = "employee";
      sth.id = current.id;
    }
    dispatch(getForEach(sth));
  }, [typpe, dispatch, page, current.id]);
  const passwordHandler = () => {
    dispatch(layoutActions.layoutStatus(true));
    dispatch(layoutActions.setLayOutType("input"));
    dispatch(inputAction.setType("password"));
  };
  if (browsedData.item.items.length === 0) {
    return <div></div>;
  }
  return (
    <div className="w-[50%] flex flex-col gap-4 items-center">
      <header className="px-3 py-3 bg-blue-400 text-gray-100 text-md shadow-md rounded-md gap-1 w-full ">
      ግላዊ መረጃ
      </header>
      <div className="bg-white rounded-md shadow-md grid grid-rows-6 grid-cols-9 gap-y-5 gap-x-3 p-10 text-xl text-gray-700 w-full">
        <span className="justify-self-start col-span-3">ሙሉ ስም</span>
        <span className="col-span-6 justify-self-start text-blue-400">{browsedData.item.items[0].name}</span>

        <span className="justify-self-start col-span-3">ኢ-ሜይል</span>
        <span className="col-span-6 justify-self-start text-blue-400">{browsedData.item.items[0].email}</span>

        <span className="justify-self-start col-span-3">የሥራ መደብ</span>
        <span className="col-span-6 justify-self-start text-blue-400">{browsedData.item.items[0].role}</span>

        <span className="justify-self-start col-span-3">ምክትል ኮሚሽነር ቢሮ</span>
        <span className="col-span-6 justify-self-start text-blue-400">{browsedData.item.items[0].deputyName}</span>

        <span className="justify-self-start col-span-3">ዳይሬክቶሬት</span>
        <span className="col-span-6 justify-self-start text-blue-400">
          {browsedData.item.items[0].directorateName}
        </span>

        <span className="justify-self-start col-span-3">ቡድን</span>
        <span className="col-span-6 justify-self-start text-blue-400">{browsedData.item.items[0].teamName}</span>
      </div>
      {page === "profile" && (
        <button className="border-2 rounded-lg  bg-blue-300 text-gray-800 hover:bg-blue-400/80 py-2  text-[1rem] px-3" onClick={passwordHandler}>አዲስ የይለፍ ቃል</button>
      )}
    </div>
  );
};
export default EmployeeDetail;
