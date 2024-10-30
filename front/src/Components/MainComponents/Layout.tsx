import "../../Style/Layout.css";
import { layoutActions } from "../../Utils/Store/LayoutStore";
import { inputAction } from "../../Utils/Store/InputStore";
import { useDispatch,useSelector } from "react-redux";
import { targetSliceAction } from "../../Utils/Store/PlanningStore/TargetType";
import Input from "./InputComponent";
import Commissioner from "../SubComponents/Commissioner";

const Layout = () => {
  const layoutType=useSelector((state:{layoutState:any})=>state.layoutState.layOutType)
const dispatch:any=useDispatch();
  const layoutHandler=()=>{
      dispatch(layoutActions.layoutStatus(false));
      dispatch(inputAction.setAddEachFalse());
      dispatch(targetSliceAction.setOnMain(false));
      dispatch(targetSliceAction.setOnSub(false));
  }
  return (
    <>
    <div onClick={layoutHandler} className="backdrop"></div>
      <div className="main-layout">
        {
          layoutType==='input' && <Input />
        }
        {
          layoutType!=='input' && <Commissioner />
        }
        
        
      </div>
    </>
  );
};

export default Layout;
