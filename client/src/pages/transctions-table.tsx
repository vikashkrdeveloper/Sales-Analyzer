import { Button, Card, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
interface TransactionProps {
  transactions: Array<TransactionsDataProps>;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}
interface TransactionsDataProps {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  sold: boolean;
  image: string;
}
export const TransctionsTable = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(3);
  const [transactions, setTransactions] = useState<Array<TransactionProps>>([]);
  const [isTransactionsLoading, setIsTransactionsLoading] =
    useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
  const fetchData = async () => {
    try {
      setIsTransactionsLoading(true);
      const url = `${baseURL}/api/v1/all-transactions?month=${currentMonth}&page=${currentPage}`;
      const response = await axios.get(url);
      const data = await response.data;
      setTransactions(data);
      setIsTransactionsLoading(false);
    } catch (error) {
      console.log(`Error: ${error}`);
      setTransactions([]);
      setIsTransactionsLoading(false);
    }
  };
  const nextPage = () => {
    if (currentPage < Object(transactions).pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentMonth, currentPage]);
  let cancelTokenSource = axios.CancelToken.source();
  const searchTransactions = async (search: string) => {
    if (search === "") {
      fetchData();
      return;
    }
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Request canceled due to new request.");
    }
    cancelTokenSource = axios.CancelToken.source();
    try {
      setIsTransactionsLoading(true);
      const url = `${baseURL}/api/v1/transactions/search?search=${String(
        search
      ).trim()}&month=${currentMonth}`;
      const response = await axios.get(url, {
        cancelToken: cancelTokenSource.token,
      });
      const data = await response.data;
      setTransactions(data);
      setIsTransactionsLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.log(`Error: ${error}`);
      }
      setTransactions([]);
      setIsTransactionsLoading(false);
    }
  };
  console.log(transactions);

  return (
    <>
      <div className="bg-[#e6fffef9] rounded-[5px] p-5 pt-4 mt-[70px] max-sm:mt-[100px] pb-0 w-full">
        <div className="w-full pb-5 ">
          <div className="col-[1.5px]2">
            <center>
              <h1 className=" text-center select-none font-[700] text-[20px] bg-white  w-[150px] h-[150px] border-[1px] border-[#e2e2e2]  shadow-[0px_0px_10px_#e2e2e2] rounded-full flex justify-center items-center">
                Transctions <br />
                Dashboard
              </h1>
            </center>
            <div className=" w-full p-2 flex max-sm:flex-col max-sm:gap-3 max-sm:justify-center max-sm:items-end justify-between items-center mb-5 mt-4">
              <div className="w-[220px] h-[40px] flex justify-center items-center  rounded-[4px] bg-[#ffffff] shadow-[0px_0px_10px_#f0f0f0] border-[1px] border-[#e2e2e2]">
                <input
                  type="text"
                  name="search"
                  id="search"
                  onChange={(e) => {
                    searchTransactions(e.target.value);
                  }}
                  className=" w-full h-full p-2 bg-transparent text-[14px] outline-none border-none"
                  placeholder="Search"
                />
              </div>
              <div className="w-[220px] h-[40px] flex justify-center items-center  rounded-[4px] bg-[#ffffff] shadow-[0px_0px_10px_#f0f0f0] border-[1px] border-[#e2e2e2]">
                <select
                  name="month"
                  defaultValue={3}
                  value={currentMonth}
                  onChange={(e) => {
                    setCurrentMonth(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                  id="month"
                  className="max-w-xs w-full bg-transparent text-[#000000] mr-2 outline-none  border-none p-2  "
                >
                  <option value={-1}>All Month</option>
                  {month.map((month, index) => (
                    <option key={`MN-${index}`} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className=" overflow-auto overflow-y-hidden border-[#898989] border-2 rounded-lg">
              <table className="  p-2 w-full">
                <thead>
                  <tr>
                    <th className="p-4 text-center border-[1.5px] border-l-0    border-[#898989] border-t-0 rounded-tl-lg ">
                      <div className="text-center  w-[40px] overflow-auto  overflow-y-hidden text-wrap select-none ">
                        ID
                      </div>
                    </th>
                    <th className="p-4 text-center border-[1.5px] border-l-0 border-[#898989] border-t-0 select-none">
                      <div className="text-center  w-[200px] overflow-auto  overflow-y-hidden text-wrap select-none ">
                        Title
                      </div>
                    </th>
                    <th className="p-4 text-center border-[1.5px] border-l-0   border-[#898989] border-t-0 select-none">
                      <div className="text-center  w-[250px] overflow-auto  overflow-y-hidden text-wrap select-none ">
                        Description
                      </div>
                    </th>
                    <th className="p-4 text-center border-[1.5px] border-l-0 w-[150px] border-[#898989] border-t-0 select-none">
                      <div className="text-center  w-[150px] overflow-auto  overflow-y-hidden text-wrap select-none ">
                        Price
                      </div>
                    </th>
                    <th className="p-4 text-center border-[1.5px] border-l-0 w-[250px] border-[#898989] border-t-0 select-none">
                      <div className="text-center  w-[200px] overflow-auto  overflow-y-hidden text-wrap select-none ">
                        Category
                      </div>
                    </th>
                    <th className="p-4 border-[1.5px] border-l-0 border-[#898989] border-t-0 select-none">
                      <div className=" text-center w-[200px] select-none">
                        Sold
                      </div>
                    </th>
                    <th className="p-4 text-center border-[1.5px] border-r-0 border-[#898989] border-t-0 rounded-tr-lg select-none">
                      <div className="text-center  w-[100px] overflow-auto  overflow-y-hidden text-wrap select-none ">
                        Image
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isTransactionsLoading ? (
                    Array.from("VikashKum").map((_, index) => (
                      <tr key={`TSL-${index}`}>
                        <td colSpan={7} className="p-1 text-center">
                          <Card className="p-1 rounded-[4px]">
                            <Skeleton className="rounded-lg h-[60px]">
                              <div className="h-24 rounded-lg bg-default-300"></div>
                            </Skeleton>
                          </Card>
                        </td>
                      </tr>
                    ))
                  ) : Object(transactions).transactions ? (
                    Object(transactions).transactions.length > 0 ? (
                      Object(transactions).transactions.map(
                        (transaction: TransactionsDataProps, index: number) => (
                          <tr key={`TRD-${index}`}>
                            <td className="p-4 text-center border-[1.5px]   border-[#898989] border-l-0">
                              <div className="text-center  w-[40px] overflow-auto  overflow-y-hidden  ">
                                {transaction.id}
                              </div>
                            </td>
                            <td className="p-4 text-left border-[1.5px] border-[#898989] border-l-0">
                              <div className="text-left  w-[200px]  h-[20px]  overflow-auto  overflow-y-hidden  ">
                                {transaction.title}
                              </div>
                            </td>
                            <td className="p-4 text-left border-[1.5px] border-[#898989] border-l-0">
                              <div className="text-left  w-[250px] h-[20px] overflow-auto  overflow-y-hidden  ">
                                {transaction.description}
                              </div>
                            </td>
                            <td className="p-4 text-left border-[1.5px] border-[#898989]  border-l-0">
                              <div className="text-left  w-[150px]  h-[20px]  overflow-auto  overflow-y-hidden ">
                                {transaction.price}
                              </div>
                            </td>
                            <td className="p-4 text-left border-[1.5px] border-[#898989]   border-l-0">
                              <div className="text-left  w-[200px]  h-[20px]  overflow-auto  overflow-y-hidden ">
                                {transaction.category}
                              </div>
                            </td>
                            <td className="p-4 border-[1.5px] border-[#898989] border-l-0">
                              <div
                                className={`text-center  w-[200px] overflow-auto  overflow-y-hidden font-[700] ${
                                  transaction.sold
                                    ? "text-[green] "
                                    : "text-[#ff0000]"
                                }`}
                              >
                                {transaction.sold ? "Yes" : "No"}
                              </div>
                            </td>
                            <td className="p-1 text-left border-[1.5px] border-[#898989] border-r-0 rounded-tr-lg">
                              <div className="w-full h-[60px] overflow-auto">
                                <img
                                  className="w-full h-full object-cover rounded-[5px]"
                                  src={transaction.image}
                                  alt={transaction.title}
                                />
                              </div>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-4 text-center">
                          <div className="w-full h-[400px] flex justify-center items-center">
                            <h1 className="text-[20px] font-[700]">
                              No Transactions Found
                            </h1>
                          </div>
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-4 text-center">
                        <div className="w-full h-[400px] flex justify-center items-center">
                          <h1 className="text-[20px] font-[700]">
                            No Transactions Found
                          </h1>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className=" flex w-full max-sm:flex-col  p-5 max-sm:pb-0 pl-1 mt-8 pr-1 justify-between select-none items-center">
              <div className="max-sm:hidden">
                <p className="  text-[15px] font-[600]">
                  Page No:{" "}
                  <span className="ml-1 text-[14px] font-[700]">
                    {currentPage}
                  </span>
                </p>
              </div>
              <div className=" flex gap-2 justify-center items-center">
                <Button
                  onClick={prevPage}
                  isDisabled={currentPage < 2}
                  className="rounded-[5px] bg-[#464c4e] text-[#e0f9f8]"
                >
                  Previous
                </Button>
                <span className="text-[30px] mb-1 font-[600] select-none">
                  -
                </span>
                <Button
                  onClick={nextPage}
                  isDisabled={
                    currentPage >= Object(transactions)?.pagination?.totalPages
                  }
                  className="rounded-[5px] bg-[#464c4e] text-[#e0f9f8] "
                >
                  Next
                </Button>
              </div>
              <div className=" max-sm:flex justify-between items-center max-sm:w-full max-sm:p-1  max-sm:mt-4">
                <p className="  text-[15px] font-[600] sm:hidden">
                  Page No:{" "}
                  <span className="ml-1 text-[14px] font-[700]">
                    {currentPage}
                  </span>
                </p>
                <p className=" text-[15px] font-[600]">
                  Per Page:{" "}
                  <span className="ml-1 text-[14px] font-[700]">{10}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
