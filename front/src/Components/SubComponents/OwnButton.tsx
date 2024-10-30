import { Link } from "react-router-dom";
import "../../Style/Home.css";
const MyOwn = () => {
  return (
    <Link to={"/measurements"} className="py-1 border-2 px-2 rounded-lg hover:bg-gray-100">
      የግል መለኪያዎች
    </Link>
  );
};
export default MyOwn;
