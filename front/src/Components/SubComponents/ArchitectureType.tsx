import { useSelector, useDispatch } from "react-redux";
import { layoutActions } from "../../Utils/Store/LayoutStore";
import { inputAction } from "../../Utils/Store/InputStore";

const ArchitectureType: React.FC<{ type: any }> = (props) => {
  const officesType = useSelector(
    (state: { offices: any }) => state.offices.browsingEach.data.type
  );
  const dispatch = useDispatch();
  const types = ["deputy", "directorate", "team", "employee"];
  const typesType = [{type:"deputy",
title:'የምክትል ኮሚሽነር ቢሮ'},{type:"directorate",
title:'ዳይሬክቶሬት'},{type:"team",
title:'ቡድን'},{type:"employee",
title:'ሠራተኛ'}];
  const mainType = typesType.slice(
    types.indexOf(`${officesType}`) + 1,
    types.length
  );  

  const showInputHandler = (sth: any) => {
    dispatch(layoutActions.layoutStatus(true));
    dispatch(inputAction.setType(sth));
  };

  return (
    <div className="flex flex-col bg-white w-56 rounded-md gap-1">
      {mainType.map((items: any, index: any) => {
        return (
          <button className="border-2 border-blue-200 p-1 hover:bg-blue-200/80 rounded-md" onClick={() => showInputHandler(items.type)} key={index}>
            {items.title}
          </button>
        );
      })}
    </div>
  );
};

export default ArchitectureType;
