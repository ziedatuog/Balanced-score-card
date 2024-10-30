import { useForm } from "react-hook-form";
import SaveButton from "../SubComponents/SaveButton";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../Utils/Store/HRStore/HrAsync";

const Password = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch: any = useDispatch();
  const password = useSelector(
    (state: { password: any }) => state.password.item
  );
  const employeeId = useSelector(
    (state: { type: any }) => state.type.current.id
  );
  const onSubmit = (data: any) => {
    const sendData = {
      id: employeeId,
      data,
    };
    dispatch(changePassword(sendData));
  };

  return (
    <div className="text-gray-700  pb-3 w-[35rem]">
      <div className="w-full bg-blue-400 text-2xl p-1 text-gray-300">
        የይለፍ ቃል
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-7  grid-rows-2 gap-2 py-3 px-5">
          <label className=" col-span-2 text-lg">የበፊት የይለፍ ቃል</label>
          <input
            type="text"
            className="border-2 border-blue-200 h-9 rounded col-span-5 justify-self-start w-full"
            {...register("oldPassword", { required: true, minLength: 8 })}
          />
          {errors.oldPassword && errors.oldPassword.type === "minLength" && (
            <div className="text-red-800 col-span-7 text-lg">የይለፍ ቃል ቢያንስ 8 ፊደላት ማካተት አለበት</div>
          )}
          {password.error && (
            <div className="text-red-800 col-span-7 text-lg">የተሳሳተ የይለፍ ቃል</div>
          )}
          <label className="col-span-2 text-lg">አዲስ የይለፍ ቃል</label>
          <input
            type="text"
            className="border-2 border-blue-200 h-9 rounded col-span-5 justify-self-start w-full"
            {...register("newPassword", { required: true ,minLength:8})}
          />
          {errors.newPassword && errors.newPassword.type === "minLength" && (
            <div className="text-red-800 col-span-7 text-lg">የይለፍ ቃል ቢያንስ 8 ፊደላት ማካተት አለበት</div>
          )}
        </div>
        <SaveButton />
      </form>
    </div>
  );
};

export default Password;
