import { useEffect } from "react";
import { getAny, getForEach } from "../../Utils/Store/HRStore/HrAsync";
import { useDispatch, useSelector } from "react-redux";
import RemoveSpan from "../../Components/SubComponents/RemoveSpan";
import { useParams, Link } from "react-router-dom";
import { officesTypeAction } from "../../Utils/Store/HRStore/OfficeBrowserStore";
import { inputAction } from "../../Utils/Store/InputStore";
import AddButton from "../../Components/SubComponents/AddButton";
const BrowsePage = () => {
  const browsingData = useSelector(
    (state: { getAnyElement: any }) => state.getAnyElement
  );
  const inputEachType = useSelector(
    (state: { inputType: any }) => state.inputType
  );
  const browsingEachData = useSelector(
    (state: { getForEachElement: any }) => state.getForEachElement
  );

  const dispatch: any = useDispatch();

  const browseTypeHandler = (sth: any) => {
    dispatch(getForEach(sth));
    dispatch(officesTypeAction.setEachBrowsingType(sth));
  };

  const typpe: any = useParams();
 
  const sth = {
    type: typpe.type,
    id: typpe.id,
  };
  useEffect(() => {
    const sth = {
      type: typpe.type,
      id: typpe.id,
    };
    if (typpe.type && typpe.id !== "any") {
      dispatch(getForEach(sth));
      dispatch(officesTypeAction.setEachBrowsingType(sth));
    } else {
      dispatch(getAny(typpe.type));
      dispatch(officesTypeAction.setEachTypeFalse());
    }
    if (inputEachType.addEach) {
      dispatch(inputAction.setAddEach());
    }
  }, [typpe, dispatch, inputEachType.addEach]);
  let header = "";
  if (typpe.type === "deputy") {
    header = "ምክትል ኮሚሽነር ቢሮወች";
  } else if (typpe.type === "directorate") {
    header = "ዳይሬክቶሬቶች";
  } else {
    header = "ሠራተኞች";
  }

  let data = browsingData.items;
  if (typpe.type && typpe.id !== "any") {
    data = browsingEachData.item.items;
    header = browsingEachData.item.name;
  }

  return (
    <div className="w-[50%] flex flex-col gap-4 pb-8">
      <header className="px-3 py-3 bg-blue-400 text-gray-100 text-md shadow-md rounded-md gap-1 ">
        {header}
      </header>
      {data.length === 0 && (
        <div>there is not any depaetments for {typpe.type}</div>
      )}
      {data.length !== 0 && (
        <div className="flex flex-col gap-3">
          {data.map((items: any, index: any) => {
            const url =
              items.type !== "employee"
                ? `/${items.type}/${items.id}`
                : `/userDetail/${items.id}`;
            return (
              <div
                key={index}
                className="grid grid-cols-12 gap-3  bg-white text-gray-700 rounded-md shadow-md pr-8 "
              >
                <Link
                  className="list-each-title col-span-11 justify-self-start pl-5 w-full text-start py-4 text-lg hover:bg-gray-100/70"
                  onClick={() => browseTypeHandler(items)}
                  to={url}
                >
                  {items.name}
                </Link>
               <RemoveSpan />
              </div>
            );
          })}
        </div>
      )}
      {

      }
      {
        typpe.type !== "employee" &&  <AddButton inputType={sth} header="አዲስ" />
      }
     
    </div>
  );
};
export default BrowsePage;
