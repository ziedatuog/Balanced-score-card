import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addAny, editAnyData } from "../../Utils/Store/HRStore/HrAsync";
import SaveButton from "./SaveButton";

const AddEmoloyee = () => {
  const dispatch: any = useDispatch();
  const inputType = useSelector((state: { inputType: any }) => state.inputType);
  const offices = useSelector(
    (state: { offices: any }) => state.offices.browsingEach
  );
  const addStatus = useSelector(
    (state: { addElement: any }) => state.addElement.item
  );
  const some = useSelector(
    (state: { getForEachElementData: any }) => state.getForEachElementData
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const sendData = {
      type: "employee",
      data,
    };
    if (offices.status) {
      if (some.item.type === "deputy") {
        data.deputyId = some.item.id;
        data.directorateId = null;
        data.teamId = null;
      }
      if (some.item.type === "directorate") {
        data.deputyId = some.item.deputyId;
        data.directorateId = some.item.id;
        data.teamId = null;
      }
      if (some.item.type === "team") {
        data.deputyId = some.item.deputyId;
        data.directorateId = some.item.directorateId;
        data.teamId = some.item.id;
      }
    } else {
      data.deputyId = null;
      data.directorateId = null;
      data.teamId = null;
    }
    if (inputType.actionType === "new") {
      await dispatch(addAny(sendData));
    } else {
      await dispatch(
        editAnyData({
          id: inputType.actionId,
          sendData: sendData.data,
        })
      );
    }
  };
 
  return (
    <div className="w-[30rem] text-gray-700 pb-4">
      <div className="w-full bg-blue-400 text-2xl p-1 text-gray-300">
        አዲስ ሠራተኛ
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-5  grid-rows-3 gap-3 p-5">
          <label className="justify-self-start">ሙሉ ስም</label>
          <input
            type="text"
            className="border-2 border-blue-200 h-8 rounded col-span-4 justify-self-start w-full"
            {...register("userName", { required: true })}
          />
          <label className="justify-self-start">ኢ-ሜይል</label>
          <input
            type="email"
            className="border-2 border-blue-200 h-8 rounded col-span-4 justify-self-start w-full"
            {...register("userEmail", { required: true })}
          />
          <label className="justify-self-start">የሥራ መደብ</label>
          <input
            type="text"
            className="border-2 border-blue-200 h-8 rounded col-span-4 justify-self-start w-full"
            {...register("role", { required: true })}
          />
        </div>
        {addStatus.error && (
          <div className="text-red-800 mb-2">{addStatus.error}</div>
        )}
          {addStatus.status && (
          <div className="text-blue-400 mb-2">saved</div>
        )}
        <SaveButton />
      </form>
    </div>
  );
};
export default AddEmoloyee;
