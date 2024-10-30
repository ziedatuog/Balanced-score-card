import { useDispatch } from "react-redux";
import { layoutActions } from "../../Utils/Store/LayoutStore";
const ShowCommissioner = () => {
  const dispatch: any = useDispatch();
  const showCommissioner = () => {
    dispatch(layoutActions.layoutStatus(true));
    dispatch(layoutActions.setLayOutType("commissioner"));
  };

  return (
    <button
      className="border-2 rounded-lg  bg-blue-300 text-gray-800 hover:bg-blue-400/80 py-1  text-[1rem] w-32"
      onClick={showCommissioner}
    >
      ኮሚሽነር
    </button>
  );
};

export default ShowCommissioner;
