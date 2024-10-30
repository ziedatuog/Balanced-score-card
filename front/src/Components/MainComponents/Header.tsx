import Logo from "../../Assets/Images/Logo.jpg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logDataOut } from "../../Utils/Store/CommonStore";
const Header = () => {
  const dispatch:any=useDispatch();
  const logoutHandler=()=>{
    dispatch(logDataOut());
  }
  return (
    <div className="w-full grid bg-blue-400 grid-cols-10  px-8 py-1 gap-3 justify-around items-center shadow shadow-gray-400/100">
      <img className="w-16 h-16 rounded-full" src={Logo} alt="the logo of astc" />
      <span className="col-span-7 text-4xl justify-self-start text-gray-200">በአብክመ የሳይንስና ቴክኖሎጂ ኮሚሽን</span>
     <div className=" ">
     <NavLink className="border-2 py-2 px-3 border-gray-200 bg-blue-300 rounded-3xl text-gray-800 text-center text-lg hover:bg-blue-300/70" to={"/profile"}>
     የግል ማህደር
      </NavLink>
     </div>
      
      <button onClick={logoutHandler} className="text-xl text-white hover:text-gray-200">logout</button>
    </div>
  );
};
export default Header;
