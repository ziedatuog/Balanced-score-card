import "../../Style/Input.css";
import { useSelector } from "react-redux";
import AddEmoloyee from "../SubComponents/AddEmoloyee";
import ArchitectureInput from "../SubComponents/ArchitectureInput";
import NewMainTarget from "../SubComponents/NewMainTarget";
import SetAssignees from "../SubComponents/SetAssignees";
import NewMeasurement from "../SubComponents/NewMeasurement";
import Password from "./ChangePassword";
const Input = () => {
  const inputHeader = useSelector(
    (state: { inputType: any }) => state.inputType
  );
  const archtectureInput =
    inputHeader.setType === "deputy" ||
    inputHeader.setType === "directorate" ||
    inputHeader.setType === "team";

  return (
    <>
      {archtectureInput && <ArchitectureInput />}
      {inputHeader.setType === "employee" && <AddEmoloyee />}
      {inputHeader.setType === "target" && <NewMainTarget />}
      {inputHeader.setType === "measurement" && <NewMeasurement />}
      {inputHeader.setType === "assignees" && <SetAssignees />}
      {inputHeader.setType === "password" && <Password />}
    </>
  );
};

export default Input;
