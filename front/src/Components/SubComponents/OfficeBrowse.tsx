import { Link } from "react-router-dom";
import AddButton from "./AddButton";
const OfficeBrowse: React.FC<{ officeType: any }> = (props) => {
  const type = {
    type: props.officeType.type,
    id: "null",
  };

  return (
    <div className="bg-white w-80 flex flex-col pt-4 py-2 justify-center rounded-lg shadow-lg  ">
      <Link to={`/${props.officeType.type}/any`}>
        <div className="w-full text-2xl text-gray-600 p-5">
          {props.officeType.title}
        </div>
      </Link>
      {props.officeType.type !== "employee" && (
        <AddButton inputType={type} header="አዲስ" />
      )}
    </div>
  );
};

export default OfficeBrowse;
