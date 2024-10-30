import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../../Assets/Images/Logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommonData } from "../../Utils/Store/CommonStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [see, setSee] = useState(false);
  const dispatch: any = useDispatch();
  const current = useSelector((state: { type: any }) => state.type.current);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate: any = useNavigate();
  let title = "see password";
  let type = "password";
  if (see) {
    title = "hide password";
    type = "text";
  }
  console.log(current);
  const seeHandler = () => {
    if (see) {
      setSee(false);
    } else {
      setSee(true);
    }
  };
  const onSubmit = async (data: any) => {
    await dispatch(fetchCommonData(data));
    navigate("/");
  };
  return (
    <div className="w-full grid grid-cols-5 h-[100vh]">
      <div className="justify-start flex flex-col items-center pt-28 gap-3 bg-blue-400 text-4xl justify-self-start text-gray-200 col-span-2">
        <img src={Logo} className="w-48 h-48 rounded-full" alt="logo" />
        <header className="text-gray-700 text-3xl">እንኳን ደህና መጡ!</header>
        <span className="tracking-wider text-4xl mb-8 border-b-2 pb-1">የአማራ ሳይንስና ቴክኖሎጂ ኮሚሽን</span>
        <span className="text-3xl">የግብ ተኮር ተግባራት ዕቅድና የአፈፃፀም ውጤት መሙያ ስርአት</span>
      </div>
      <div className="col-span-3 flex flex-col items-center mt-32 gap-3">
        <span className="text-4xl text-gray-600">በኢሜይል ይግቡ</span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white grid grid-cols-5 grid-rows-4  item-center rounded-lg shadow.md px-5 py-10"
        >
          <label className="text-lg ">ኢ-ሜይል</label>
          <input
            type="email"
            className="col-span-4 border-2 border-blue-200 h-9 px-3 mb-2 rounded col-span-5 justify-self-start w-full"
            placeholder="some@some.com"
            {...register("email", { required: true })}
          />
          <label className="text-lg ">የይለፍ ቃል</label>
          <input
            type={type}
            className="col-span-4 border-2 border-blue-200 h-9 px-3  rounded col-span-5 justify-self-start w-full"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && errors.password.type === "minLength" && (
            <span className="text-red-800 col-span-5 justfy-self-start">
              የይለፍ ቃል ቢያንስ 8 ፊደላት ማካተት አለበት
            </span>
          )}
          <button type="button" className="col-span-5" onClick={seeHandler}>
            {title}
          </button>
          <div className="col-span-5">
            {current?.error && (
              <div className="text-red-800 col-span-5 justfy-self-start">
                {current.error}
              </div>
            )}
            <button className="border-2 rounded-lg  bg-blue-300 text-gray-800 hover:bg-blue-400/80 py-2  text-[1rem] px-5 mt-4 text-gray-500">
            ይግቡ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
