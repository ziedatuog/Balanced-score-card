import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificMeasurements } from "../../Utils/Store/PlanningStore/PlannigAsync";
import { getStatus } from "../../Utils/Store/ReportAaync";
const Table = () => {
  const current = useSelector((state: { type: any }) => state.type.current);
  const mainData = useSelector(
    (state: { specificMeasurements: any }) => state.specificMeasurements
  );
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getSpecificMeasurements(current.id));
    dispatch(getStatus(current.id));
  }, [dispatch, current]);
  const mainLength = mainData.items.map((items: any) => {
    let len: any = 0;
    items.subtargetData.map((item: any) => {
      return (len = len + item.measurements.length);
    });
    return len;
  });

  if (mainData.items.length === 0) {
    return <div>የተሠጠ  መለኪያ የለም</div>;
  } else {
    return (
      <table
        className="border-2 border-black bg-white shadow-xl"
        border={1}
        cellSpacing={0}
      >
        <thead className="border-2 border-black bg-blue-200/50 ">
          <tr className="border-2 border-black">
            <th className="border-2 border-black w-12" rowSpan={2}>
              ተ.ቁ
            </th>
            <th rowSpan={2} className="border-2 border-black w-28">
              የሚከናወኑ ግቦች/ ግብ ተኮር ተግባራት
            </th>
            <th rowSpan={2} className="border-2 border-black w-40">
              የግብ ተኮር ተግባራት
            </th>
            <th rowSpan={2} className="border-2 border-black w-16">
              የግቡ ክብደት
            </th>
            <th colSpan={2} className="border-2 border-black ">
              መለኪያ
            </th>
            <th rowSpan={2} className="border-2 border-black w-16">
              የመለኪያ ክብደት
            </th>
            <th rowSpan={2} className="border-2 border-black w-16">
              የ 6 ወራት ኢላማ
            </th>
            <th colSpan={2} className="border-2 border-black ">
              የድርጊት መርሀግብር
            </th>
            <th colSpan={5} className="border-2 border-black ">
              የአፈፃፀም ደረጃ
            </th>
          </tr>
          <tr>
            <th className="border-2 border-black w-16">መለኪያ</th>
            <th className="border-2 border-black w-[28rem]">ተግባራት</th>
            <th className="border-2 border-black w-16">1ኛ ሩብ ዓመት</th>
            <th className="border-2 border-black w-16">2ኛ ሩብ ዓመት</th>
            <th className="border-2 border-black w-16">5</th>
            <th className="border-2 border-black w-16">4</th>
            <th className="border-2 border-black w-16">3</th>
            <th className="border-2 border-black w-16">2</th>
            <th className="border-2 border-black w-16">1</th>
          </tr>
        </thead>
        <tbody>
          {mainData.items.map((items: any, index: any) => {
            const subLength = items.subtargetData[0].measurements.length;
            const measureData = items.subtargetData[0].measurements.slice(1);
            const subData = items.subtargetData.slice(1);
            return (
              <>
                <tr>
                  <td
                    rowSpan={mainLength[index]}
                    className="border-2 border-black "
                  >
                    {index + 1}
                  </td>
                  <td
                    rowSpan={mainLength[index]}
                    className="border-2 border-black "
                  >
                    {items.targetTitle}
                  </td>
                  <td rowSpan={subLength} className="border-2 border-black ">
                    {items.subtargetData[0].subTitle}
                  </td>
                  <td rowSpan={subLength} className="border-2 border-black ">
                    {items.subtargetData[0].subWeight}
                  </td>
                  <td className="border-2 border-black">
                    {" "}
                    {items.subtargetData[0].measurements[0].metrics}
                  </td>
                  <td className="border-2 border-black ">
                    {" "}
                    {items.subtargetData[0].measurements[0].description}
                  </td>
                  <td className="border-2 border-black ">
                    {" "}
                    {items.subtargetData[0].measurements[0].weight}
                  </td>
                  <td className="border-2 border-black text-sm">
                    {" "}
                    {items.subtargetData[0].measurements[0].halfYearTarget}
                  </td>
                  <td className="border-2 border-black text-sm">
                    {" "}
                    {items.subtargetData[0].measurements[0].firstQuarter}
                  </td>
                  <td className="border-2 border-black text-sm">
                    {" "}
                    {items.subtargetData[0].measurements[0].halfYearTarget -
                      items.subtargetData[0].measurements[0].firstQuarter}
                  </td>
                  <td className="border-2 border-black text-sm">
                  {">"} {items.subtargetData[0].measurements[0].resultData.first}
                  </td>
                  <td className="border-2 border-black text-sm">
                  {">"} {items.subtargetData[0].measurements[0].resultData.second}
                  </td>
                  <td className="border-2 border-black text-sm">
                  {">"} {items.subtargetData[0].measurements[0].resultData.third}
                  </td>
                  <td className="border-2 border-black ">
                  {">"} {items.subtargetData[0].measurements[0].resultData.fourth}
                  </td>
                  <td className="border-2 border-black text-sm">
                  {"<"}  {items.subtargetData[0].measurements[0].resultData.fifth}
                  </td>
                </tr>
                {measureData.map((items: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td className="border-2 border-black ">
                        {items.metrics}
                      </td>
                      <td className="border-2 border-black ">
                        {items.description}
                      </td>
                      <td className="border-2 border-black ">{items.weight}</td>
                      <td className="border-2 border-black text-sm">
                        {items.halfYearTarget}
                      </td>
                      <td className="border-2 border-black text-sm">
                        {items.firstQuarter}
                      </td>
                      <td className="border-2 border-black ">
                        {items.halfYearTarget - items.firstQuarter}
                      </td>
                      <td className="border-2 border-black text-sm">
                      {">"} {items.resultData.first}
                      </td>
                      <td className="border-2 border-black text-sm">
                      {">"} {items.resultData.second}
                      </td>
                      <td className="border-2 border-black text-sm">
                      {">"} {items.resultData.third}
                      </td>
                      <td className="border-2 border-black text-sm">
                      {">"} {items.resultData.fourth}
                      </td>
                      <td className="border-2 border-black text-sm">
                      {"<"} {items.resultData.fifth}
                      </td>
                    </tr>
                  );
                })}
                {subData.map((item: any, index: any) => {
                  const leng = item.measurements.length;
                  const measureData = item.measurements.slice(1);
                  return (
                    <>
                      <tr>
                        <td rowSpan={leng} className="border-2 border-black ">
                          {item.subTitle}
                        </td>
                        <td rowSpan={leng} className="border-2 border-black ">
                          {item.subWeight}
                        </td>
                        <td className="border-2 border-black ">
                          {item.measurements[0].metrics}
                        </td>
                        <td className="border-2 border-black ">
                          {item.measurements[0].description}
                        </td>
                        <td className="border-2 border-black ">
                          {item.measurements[0].weight}
                        </td>
                        <td className="border-2 border-black text-sm">
                          {item.measurements[0].halfYearTarget}
                        </td>
                        <td className="border-2 border-black text-sm">
                          {item.measurements[0].firstQuarter}
                        </td>
                        <td className="border-2 border-black text-sm">
                          {item.measurements[0].halfYearTarget -
                            item.measurements[0].firstQuarter}
                        </td>
                        <td className="border-2 border-black text-sm">
                        {">"}  {item.measurements[0].resultData.first}
                        </td>
                        <td className="border-2 border-black text-sm">
                        {">"} {item.measurements[0].resultData.second}
                        </td>
                        <td className="border-2 border-black text-sm">
                        {">"}  {item.measurements[0].resultData.third}
                        </td>
                        <td className="border-2 border-black text-sm">
                        {">"}  {item.measurements[0].resultData.fourth}
                        </td>
                        <td className="border-2 border-black text-sm">
                        {"<"} {item.measurements[0].resultData.fifth}
                        </td>
                      </tr>
                      {measureData.map((items: any, index: any) => {
                        return (
                          <tr key={index}>
                            <td className="border-2 border-black ">
                              {items.metrics}
                            </td>
                            <td className="border-2 border-black ">
                              {items.description}
                            </td>
                            <td className="border-2 border-black ">
                              {items.weight}
                            </td>
                            <td className="border-2 border-black text-sm">
                              {items.halfYearTarget}
                            </td>
                            <td className="border-2 border-black text-sm">
                              {items.firstQuarter}
                            </td>
                            <td className="border-2 border-black text-sm">
                              {items.halfYearTarget - items.firstQuarter}
                            </td>
                            <td className="border-2 border-black text-sm">
                            {">"}  {items.resultData.first}
                            </td>
                            <td className="border-2 border-black text-sm">
                            {">"}  {items.resultData.second}
                            </td>
                            <td className="border-2 border-black text-sm">
                            {">"}  {items.resultData.third}
                            </td>
                            <td className="border-2 border-black text-sm">
                            {">"}  {items.resultData.fourth}
                            </td>
                            <td className="border-2 border-black text-sm">
                              {" "}
                              {"<"}  {items.resultData.fifth}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  );
                })}
              </>
            );
          })}
        </tbody>
      </table>
    );
  }
};

export default Table;
