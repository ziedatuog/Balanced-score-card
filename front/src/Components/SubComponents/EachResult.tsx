import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
const EachResult: React.FC<{ type: string }> = (props) => {
  const current = useSelector((state: { type: any }) => state.type.current);
  const [show, setShow] = useState<boolean>(false);

  let types = [
    { type: "deputy", title: "የምክትል ኮሚሽነር ቢሮ" },
    { type: "directorate", title: "ዳይሬክቶሬት" },
    { type: "team", title: "ቡድን" },
    { type: "employee", title: "የምክትል ኮሚሽነር ቢሮ" },
  ];
  let type = [] as any;
  if (props.type === "all") {
    type = types;
  } else {
    if (current.type === "deputy") {
      type = types.slice(1);
    } else if (current.type === "directorate") {
      type = types.slice(2);
    } else if (current.type === "team") {
      type = types.slice(3);
    }
  }
  
  return (
    <div className="h-8 px-2 border-2 rounded-lg relative">
      <button onClick={() => setShow(!show)}>results</button>
      {show && (
        <div className="bg-blue-400  absolute top-7 flex flex-col w-40  left-0 ">
          {type.map((item: any, index: number) => {
            return (
              <Link
                to={`/each/${item.type}`}
                key={index}
                className="p-1 border-2 border-black rounded"
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EachResult;
