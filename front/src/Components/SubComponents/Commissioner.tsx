import { useDispatch, useSelector } from "react-redux";
import { layoutActions } from "../../Utils/Store/LayoutStore";
import { inputAction } from "../../Utils/Store/InputStore";
import { useEffect } from "react";
import { getAny } from "../../Utils/Store/HRStore/HrAsync";
const Commissioner = () => {
  const dispatch: any = useDispatch();
  const data = useSelector(
    (state: { getAnyElement: any }) => state.getAnyElement
  );
  useEffect(() => {
    dispatch(getAny("commissioner"));
  }, [dispatch]);
  let title = "ቀይር";
  if (data.items.length === 0) {
    title = "አዲስ";
  }
  const commHandler = () => {
    let type = "new";
    if (data.items.length !== 0) {
      type = "edit";
      dispatch(inputAction.setActionId(data.items[0].id));
    }
    dispatch(inputAction.setActionType(type));
    dispatch(layoutActions.setLayOutType("input"));
    dispatch(inputAction.setType("employee"));
  };
  return (
    <div className="text-gray-700 w-[35rem] pb-4">
      <header className="w-full bg-blue-400 text-2xl p-1 text-gray-300">
        ኮሚሽነር
      </header>
      {data.items.length === 0 && (
        <div className="">the commissioner is not assigned!!!</div>
      )}
      {data.items.length !== 0 && (
        <div className="grid grid-cols-5  grid-rows-2 gap-3 px-6 py-5 text-xl">
          <span className="justify-self-start ">ሙሉ ስም</span>
          <span  className="justify-self-start col-span-4 text-blue-400">{data.items[0].name}</span>

          <span  className="justify-self-start ">ኢ-ሜይል</span>
          <span  className="justify-self-start col-span-4 text-blue-400">{data.items[0].email}</span>
        </div>
      )}
       <button className="border-2 rounded-lg  bg-blue-300 text-gray-800 hover:bg-blue-400/80 py-2  text-[1rem] px-3" onClick={commHandler}>{title} ኮሚሽነር</button>
    </div>
  );
};

export default Commissioner;
