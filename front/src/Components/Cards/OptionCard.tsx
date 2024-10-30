import { useSelector } from "react-redux";
import MyOwn from "../SubComponents/OwnButton";
import ReportLink from "../SubComponents/ReportLink";
import { Link } from "react-router-dom";
import EachResult from "../SubComponents/EachResult";

const OptionCard = () => {
  const currentData = useSelector((state: { type: any }) => state.type.current);
  let title = "";
  if (currentData.type === "directorate") {
    if (currentData.name === "hr") {
      title=`sew habit limat astedader ዳይሬክቶሬት`;
    } else if (currentData.name === "planning") {
      title='ye ekid zigijit ena bejet kititil ዳይሬክቶሬት';
    } else {
    }
  } else if (currentData.type === "team") {
    title=`${currentData.name} ቡድን`
  } else {
    title=`${currentData.name} የምክትል ኮሚሽነር ቢሮ`;
  }

  return (
    <div className=" w-full rounded flex justify-between items-center bg-white px-24">
      <div className="text-2xl text-gray-700">{title}</div>
      <div className="flex gap-4  py-2 px-4 ">
        <ReportLink />
        <MyOwn />
        {currentData.type === "directorate" &&
          currentData.name === "planning" && (
            <Link
              to={"/planning"}
              className="py-1 border-2 px-2 rounded-lg hover:bg-gray-100"
            >
              targets
            </Link>
          )}
        {currentData.type === "directorate" && currentData.name === "hr" && (
          <Link
            to={"/browse"}
            className="py-1 border-2 px-3 rounded-lg hover:bg-gray-100"
          >
            አደረጃጀት
          </Link>
        )}
        <EachResult type='' />
      </div>
    </div>
  );
};

export default OptionCard;
