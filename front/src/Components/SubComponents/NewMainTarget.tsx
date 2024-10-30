import { useForm } from "react-hook-form";
import AddSub from "./AddSub";
import { useSelector, useDispatch } from "react-redux";
import { addAnyTarget } from "../../Utils/Store/PlanningStore/PlannigAsync";
import SaveButton from "./SaveButton";
import helper from "../../Utils/Store/helper/helper";
const NewMainTarget = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch: any = useDispatch();
  const targetState = useSelector(
    (state: { targetType: any }) => state.targetType
  );

  const onSubmit = (data: any) => {
    const sendData = {
      type: null as any,
      data: data,
    };
    if (targetState.onSub) {
      if (targetState.onMain) {
        sendData.type = "subandmain";
      } else {
        sendData.type = "sub";
        sendData.data.targetId = targetState.targetData.targetId;
      }
    } else {
      sendData.type = "main";
    }
    dispatch(addAnyTarget(sendData));
   helper(dispatch);
  };
  let header = "አዲስ የግብ ተኮር ተግባር";
  if (!targetState.onMain && targetState.onSub) {
    header = "አዲስ ተግባር";
  } else if (targetState.onMain && targetState.onSub) {
    header = "አዲስ የግብ ተኮር ተግባር";
  }

  return (
    <div className="w-[35rem] text-gray-700 pb-4">
      <div className="w-full bg-blue-400 text-2xl p-1 text-gray-300">
        {header}
      </div>
      {targetState.onSub && !targetState.onMain && (
        <div className="flex gap-3 text-xl justify-center">
          <span>ግብ</span>
          <span>{targetState.targetData.targetTitle}</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {targetState.onMain && (
          <div className="grid grid-cols-8 p-2">
            <label className="text-lg ">ግብ</label>
            <input
              type="text"
              className="border-2 col-span-5 border-blue-200 h-10 rounded w-full justify-self-start"
              {...register(`targetTitle`, { required: true })}
            />
            {!targetState.onSub && <div className="col-span-2"><AddSub targetData="" /></div>}
          </div>
        )}

        {targetState.onSub && (
          <div className="grid grid-cols-10 p-2 gap-2">
            <label className="text-lg">ተግባር</label>
            <input type="text" className="border-2 border-blue-200 h-8 rounded col-span-6" {...register(`subTitle`, { required: true })} />

            <label className="text-lg">ክብደት</label>
            <input
              type="number"
              className="border-2 border-blue-200 h-8 rounded w-[4rem]"
              {...register(`subWeight`, { required: true })}
            />
          </div>
        )}
        <SaveButton />
      </form>
    </div>
  );
};

export default NewMainTarget;
