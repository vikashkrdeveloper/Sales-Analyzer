import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
interface BarCharProps {
  priceRange: number;
  items: number;
}
interface ChartData {
  options: {
    chart: {
      id: string;
    };
    xaxis: {
      categories: number[];
    };
  };
  series: {
    name: string;
    data: number[];
  }[];
}
const baseURL = import.meta.env.VITE_BASE_URL;
export const BarChar = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(3);
  const [isBarCharLoading, setIsBarCharLoading] = useState<boolean>(true);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [items, setItems] = useState<number[]>([]);
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
  const fetchDataBarChar = async () => {
    try {
      setIsBarCharLoading(true);
      const url = `${baseURL}/api/v1/bar-chart?month=${currentMonth}`;
      const res = await axios.get(url);
      const data = await res.data;
      const labels = data.data.map((entry: BarCharProps) => entry.priceRange);
      const items = data.data.map((entry: BarCharProps) => entry.items);
      setPriceRange(labels);
      setItems(items);
      setIsBarCharLoading(false);
    } catch (err) {
      console.log(err);
      setIsBarCharLoading(false);
    }
  };
  useEffect(() => {
    fetchDataBarChar();
  }, [currentMonth]);

  const state: ChartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: priceRange,
      },
    },
    series: [
      {
        name: "series",
        data: items,
      },
    ],
  };
  return (
    <div className="  w-full h-full  flex flex-col max-sm:p-2 justify-center items-center">
      <div className="w-[220px] h-[40px] flex justify-center mb-4 -mr-[380px] max-sm:mr-0 items-center  rounded-[4px] bg-[#ffffff] shadow-[0px_0px_10px_#f0f0f0] border-[1px] border-[#e2e2e2]">
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
      <div className=" bg-[#e0f9f8] max-sm:w-full w-[600px] max-sm:h-[300px] h-[400px] rounded-[10px]">
        {isBarCharLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className=" border-2 border-[#000] w-[40px] h-[40px] rounded-full border-t-[#cfcfcf]  animate-spin "></div>
          </div>
        ) : (
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="100%"
            height="100%"
          />
        )}
      </div>
    </div>
  );
};
