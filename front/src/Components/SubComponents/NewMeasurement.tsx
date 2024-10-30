import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { addAnyTarget } from "../../Utils/Store/PlanningStore/PlannigAsync";
import SaveButton from "./SaveButton";
import helper from "../../Utils/Store/helper/helper";
const NewMeasurement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch: any = useDispatch();
  const current = useSelector((state: { type: any }) => state.type.current);
  const titleData = useSelector(
    (state: { inputType: any }) => state.inputType.titleData
  );
  const onSubmit = (data: any) => {
    const sendData = {
      type: "activity",
      data: data,
    };
    let currentId = current.directorateId;
    if (current.type === "deputy") {
      currentId = current.deputyId;
    }

    sendData.data.createdBy = currentId;
    sendData.data.subId = titleData.id;
    dispatch(addAnyTarget(sendData));
 helper(dispatch);
  };

  return (
    <div className="w-full text-gray-700 pb-3">
      <header className="w-full bg-blue-400 text-2xl p-1 text-gray-300">
        አዲስ መለኪያ
      </header>
      <div className="grid grid-cols-5 p-2 text-xl text-gray-800">
        <span>ተግባር</span>
        <span className="col-span-2 justify-self-start text-blue-400">{titleData.title}</span>
        <span>ክብደት</span>
        <span className="justify-self-start text-blue-400">{titleData.weight}</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-8 grid-rows-2   w-[40rem]">
          <label className=''>መለኪያ</label>
          <input type="text" className='justify-self-start  w-full border-2 border-blue-200 h-8 rounded col-span-4' {...register(`description`, { required: true })} />
          <label >Metrics</label>
          <select className='justify-self-start col-span-2 h-[70%]  border-2 border-blue-200' {...register(`metrics`, { required: true })}>
            <option value="quantity">መጠን</option>
            <option value="quality">ጥራት</option>
            <option value="time">ጊዜ</option>
            <option value="expense">ወጭ</option>
          </select>

          <label className=''>ክብደት</label>
          <input type="number" className='justify-self-start border-2 border-blue-200 h-8 rounded  w-full' {...register(`weight`, { required: true })} />
          <label className='col-span-2'>የ6 ወራት ኢላማ</label>
          <input
            type="number"
            className='justify-self-start border-2 border-blue-200 h-8 rounded  w-full'
            {...register(`halfYearTarget`, { required: true })}
          />

          <label>1ኛ ሩብ ዓመት</label>
          <input
            type="number"
            className='justify-self-start border-2 border-blue-200 h-8 rounded  w-full'
            {...register(`firstQuarter`, { required: true })}
          />
        </div>
        <SaveButton />
      </form>
    </div>
  );
};
export default NewMeasurement;
