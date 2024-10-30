import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  editPlanningAssignees,
  editMeasurementAssignees,
} from "../../Utils/Store/PlanningStore/PlannigAsync";
import SaveButton from "./SaveButton";
import helper from "../../Utils/Store/helper/helper";
const SetAssignees = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch: any = useDispatch();
  const type = useSelector((state: { type: any }) => state.type);
  const titleData = useSelector(
    (state: { inputType: any }) => state.inputType.titleData
  );
  const assignees = useSelector((state: { assignees: any }) => state.assignees);

  let assigneeData = assignees.subItems;
  if (type.assigneeType === "measurement") {
    assigneeData = assignees.measurementItems;
  }

  const onSubmit = (data: any) => {
    let someData: any = [];
    if (type.assigneeType === "measurement") {
      data.sendedData.map((items: any, index: any) => {
        if (items === "") {
          let halfYearTarget = null;
          let firstQuarter = null;
          if (data.halfYearTarget[index] === "") {
            halfYearTarget = assigneeData[index].halfYearTarget;
          } else {
            halfYearTarget = data.halfYearTarget[index];
          }

          if (data.firstQuarter[index] === "") {
            firstQuarter = assigneeData[index].firstQuarter;
          } else {
            firstQuarter = data.firstQuarter[index];
          }
          const assigneeId = assigneeData[index].assigneeId;
          const assignedWeight = assigneeData[index].assignedWeight;
          return someData.push({
            assigneeId,
            assignedWeight,
            halfYearTarget,
            firstQuarter,
          });
        } else {
          let halfYearTarget = null;
          let firstQuarter = null;
          if (data.halfYearTarget[index] === "") {
            halfYearTarget = assigneeData[index].halfYearTarget;
          } else {
            halfYearTarget = data.halfYearTarget[index];
          }

          if (data.firstQuarter[index] === "") {
            firstQuarter = assigneeData[index].firstQuarter;
          } else {
            firstQuarter = data.firstQuarter[index];
          }
          const assigneeId = assigneeData[index].assigneeId;
          const assignedWeight = items;
          return someData.push({
            assigneeId,
            assignedWeight,
            halfYearTarget,
            firstQuarter,
          });
        }
      });
      const dataToSend: {
        activityId: string;
        data: {};
        type?: string | null;
        id?: string | null;
      } = {
        activityId: titleData.id,
        data: someData,
      };
      if (type.current.type === "team") {
        dataToSend.type = type.current.type;
        dataToSend.id = type.current.teamId;
      }

      dispatch(editMeasurementAssignees(dataToSend));
    } else {
      data.sendedData.map((items: any, index: any) => {
        if (items === "") {
          const assigneeId = assigneeData[index].assigneeId;
          const assignedWeight = assigneeData[index].assignedWeight;
          return someData.push({
            assigneeId,
            assignedWeight,
          });
        } else {
          const assigneeId = assigneeData[index].assigneeId;
          const assignedWeight = items;
          return someData.push({
            assigneeId,
            assignedWeight,
          });
        }
      });
      const dataToSend = {
        type: "planning",
        subId: titleData.id,
        data: someData,
        id: null,
      };
      if (type.current.type === "deputy") {
        dataToSend.type = "deputy";
        dataToSend.id = type.current.deputyId;
      }
      dispatch(editPlanningAssignees(dataToSend));
    }
  helper(dispatch);
  };

  return (
    <div className="w-[35rem] text-gray-700 pb-3">
      <header className="w-full bg-blue-400 text-2xl p-1 text-gray-300">
      ፈፃሚ
      </header>

      <div className="grid grid-cols-12 p-2 text-xl text-gray-800">
        <span>ተግባር</span>
        <span className=" col-span-8 text-blue-400">{titleData.title}</span>
        <span>ክብደት</span>
        <span className=" text-blue-400">{titleData.weight}</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="grid grid-cols-6 px-3 gap-2">
          <span className="justify-self-start col-span-3">ፈፃሚ</span>
          <span>ክብደት</span>
          {type.assigneeType === "measurement" && (
            <>
              {" "}
              <span>የ6 ወራት ኢላማ</span>
              <span>1ኛ ሩብ ዓመት</span>
            </>
          )}
        </div>
        {assigneeData.map((items: any, index: any) => {
          return (
            <div key={index} className="grid grid-cols-6 gap-2 px-3 mb-1">
              <label className="justify-self-start col-span-3">{items.assigneeName}</label>
              <input
                type="number"
                placeholder={items.assignedWeight}
                className='border-2 border-blue-200 h-8 rounded  w-full'
                {...register(`sendedData.${index}`, { required: false })}
              />
              {type.assigneeType === "measurement" && (
                <>
                  <input
                    type="number"
                    placeholder={items.halfYearTarget}
                    className='border-2 border-blue-200 h-8 rounded  w-full'
                    {...register(`halfYearTarget.${index}`, {
                      required: false,
                    })}
                  />
                  <input
                    type="number"
                    placeholder={items.firstQuarter}
                    className='border-2 border-blue-200 h-8 rounded  w-full'
                    {...register(`firstQuarter.${index}`, {
                      required: false,
                    })}
                  />
                </>
              )}
            </div>
          );
        })}
      <SaveButton />
      </form>
    </div>
  );
};

export default SetAssignees;
