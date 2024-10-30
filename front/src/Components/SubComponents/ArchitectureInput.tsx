import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addAny } from "../../Utils/Store/HRStore/HrAsync";
import SaveButton from "./SaveButton";
import helper from "../../Utils/Store/helper/helper";
const ArchitectureInput = () => {
  const inputType = useSelector((state: { inputType: any }) => state.inputType);
  const officeData = useSelector((state: { offices: any }) => state.offices);
  const dispatch: any = useDispatch();
  const some = useSelector(
    (state: { getForEachElementData: any }) => state.getForEachElementData.item
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let header = null;
  const registerName = `${inputType.setType}Name`;

  if (inputType.setType === "deputy") { 
    header = 'የምክትል ኮሚሽነር ቢሮ';
  }
  if (inputType.setType === "directorate") {
    header = 'ዳይሬክቶሬት';
  }
  if (inputType.setType === "team") {
    header = 'ቡድን';
  }
  const onSubmit = (data: any) => {
    let sendData = {
      type: inputType.setType,
      data: {},
    };
    if (officeData.browsingEach.status) {
      if (inputType.setType === "team") {
        if (some.type === "deputy") {
          sendData.data = {
            deputyId: some.id,
            directorateId: null,
            ...data,
          };
        } else {
          sendData.data = {
            deputyId: some.deputyId,
            directorateId: some.id,
            ...data,
          };
        }
      } else {
        sendData.data = {
          id: some.id,
          ...data,
        };
      }
    } else {
      sendData.data = {
        id: null,
        ...data,
      };
    }
  dispatch(addAny(sendData));
   helper(dispatch);
  };
  return (
    <div className="w-[30rem] text-gray-700 pb-4">
      <div className="w-full bg-blue-400 text-2xl p-1 text-gray-300">
      አዲስ {header}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex gap-3 p-5">
    <label>ስያሜ</label>
        <input
          type="text"
          className="border-2 border-blue-200 h-8 w-full rounded "
          {...register(`${registerName}`, { required: true })}
        />
    </div>
       
     <SaveButton />
      </form>
    </div>
  );
};

export default ArchitectureInput;
