import AddButton from "../../Components/SubComponents/AddButton";
import Target from "../../Components/MainComponents/Target";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { typeAction } from "../../Utils/Store/CommonStore";
import Card from "../../Components/Cards/Card";
import EachResult from "../../Components/SubComponents/EachResult";
const PlanningHome = () => {
  const dispatch: any = useDispatch();
  const type = {
    type: "target",
    id: null,
  };
  useEffect(() => {
    dispatch(typeAction.setTargetType(true));
  }, [dispatch]);
  return (
    <Card>
      <div className="w-full flex  justify-end mr-36 items-center gap-5">
        <AddButton inputType={type} header="አዲስ ግብ" />
        <EachResult type='all' />
      </div>
    <Target />
    </Card>
  );
};
export default PlanningHome;
