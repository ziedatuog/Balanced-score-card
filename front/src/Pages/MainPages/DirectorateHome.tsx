import Target from "../../Components/MainComponents/Target";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { typeAction } from "../../Utils/Store/CommonStore";
import Card from "../../Components/Cards/Card";
import OptionCard from "../../Components/Cards/OptionCard";

const DirectorateHome = () => {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(typeAction.setTargetType(false));
  }, [dispatch]);

  return (
    <Card>
      <OptionCard />
      <Target />
    </Card>
  );
};
export default DirectorateHome;
