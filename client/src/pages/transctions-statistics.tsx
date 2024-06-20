import axios from "axios";
import { useEffect, useState } from "react";
const baseURL = import.meta.env.VITE_BASE_URL;
interface TransctionsStatisticsProps {
  totalSale: number;
  totalSoldItems: number;
  totalNotSoldItems: number;
}
export const TransctionsStatistics = () => {
  const [statistics, setStatistics] = useState<TransctionsStatisticsProps>();
  const [currentMonth, setCurrentMonth] = useState<number>(3);
  const [isStatisticsLoading, setIsStatisticsLoading] = useState<boolean>(true);
  const month = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
  const fetchDataStatistics = async () => {
    try {
      setIsStatisticsLoading(true);
      const url = `${baseURL}/api/v1/one-month-sale-report?month=${currentMonth}`;
      const res = await axios.get(url);
      const data = await res.data;
      setStatistics(data);
      setIsStatisticsLoading(false);
    } catch (err) {
      console.log(err);
      setIsStatisticsLoading(false);
    }
  };
  useEffect(() => {
    fetchDataStatistics();
  }, [currentMonth]);
  return (
    <>
      <div className=" w-full h-full flex max-sm:p-2 flex-col justify-center items-center">
        <div className="w-[220px] max-sm:mr-0 h-[40px] flex justify-center mb-4 -mr-[130px] items-center  rounded-[4px] bg-[#ffffff] shadow-[0px_0px_10px_#f0f0f0] border-[1px] border-[#e2e2e2]">
          <select
            name="month"
            defaultValue={3}
            value={currentMonth}
            onChange={(e) => {
              setCurrentMonth(parseInt(e.target.value));
            }}
            id="month"
            className="max-w-xs w-full bg-transparent text-[#000000] mr-2 outline-none  border-none p-2  "
          >
            {month.map((month, index) => (
              <option key={`MN-${index}`} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[350px] max-sm:w-full h-[200px] bg-[#e0f9f8] rounded-[10px] flex flex-col justify-center items-start gap-0">
          {isStatisticsLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <div className=" border-2 border-[#000] w-[40px] h-[40px] rounded-full border-t-[#cfcfcf]  animate-spin "></div>
            </div>
          ) : !statistics ? (
            <div className="w-full h-full flex justify-center items-center text-[#000]">
              <h1>This Month No Data</h1>
            </div>
          ) : (
            <>
              <h1 className="flex justify-between w-full p-3 text-[16px] font-[700]">
                <span className="text-[#00000] ">Total sale</span>
                <span>{statistics?.totalSale}</span>
              </h1>
              <h1 className="flex justify-between w-full p-3  text-[16px] font-[700]">
                <span>Total sold item</span>
                <span>{statistics?.totalSoldItems}</span>
              </h1>
              <h1 className="flex justify-between w-full p-3  text-[16px] font-[700]">
                <span>Total not sold item</span>
                <span>{statistics?.totalNotSoldItems}</span>
              </h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};
