import React, { useState, useEffect } from "react";
import axios from "axios";
function Dashboard() {
  const [data, setData] = useState([]);
  const getDashboardData = async () => {
    await axios
      .get("https://backend-fashionhub.herokuapp.com/designer/dashboard", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6  px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          {/* <button className="px-8 py-3 text-md text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Withdraw
          </button> */}
        </div>
      </header>
      <div class="mx-auto container mt-36 mb-24 px-16">
        <div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          <div class="flex justify-center items-center w-full h-52 border-r-4 border-b-4  border-yellow-300 rounded-3xl">
            <div class="text-gray-800 flex justify-center items-center  flex-col">
              <h2 class="text-base lg:text-lg leading-8 tracking-wide ">
                Net Income
              </h2>
              <h1 class="font-bold text-2xl lg:text-5xl tracking-1px">
                PKR {data.netIncome}
              </h1>
            </div>
          </div>
          <div class="flex justify-center items-center w-full h-52 border-r-4 border-b-4  border-blue-300 rounded-3xl">
            <div class="text-gray-800 flex justify-center items-center w-1/2 flex-col">
              <h2 class="text-base lg:text-lg leading-8 tracking-wide ">
                Completed Orders
              </h2>
              <h1 class="font-bold text-2xl lg:text-5xl tracking-1px">
                {data.totalCompletedOrders}
              </h1>
            </div>
          </div>
          <div class="flex justify-center items-center w-full h-52 border-r-4 border-b-4 border-red-300 rounded-3xl">
            <div class="text-gray-800 flex justify-center items-center w-1/2 flex-col">
              <h2 class="text-base lg:text-lg leading-8 tracking-wide ">
                Total Designs
              </h2>
              <h1 class="font-bold text-2xl lg:text-5xl tracking-1px">
                {data.totalDesigns}
              </h1>
            </div>
          </div>
          <div class="flex justify-center items-center w-full h-52 border-r-4 border-b-4 border-green-300 rounded-3xl">
            <div class="text-gray-800 flex justify-center items-center w-1/2 flex-col">
              <h2 class="text-base lg:text-lg leading-8 tracking-wide ">
                Followers
              </h2>
              <h1 class="font-bold text-2xl lg:text-5xl tracking-1px">
                {data.followers}
              </h1>
            </div>
          </div>
        </div>

        {/* <div class="flex justify-center w-full items-center lg:border-r border-gray-300 py-6">
            <div class="text-gray-800 w-1/2 ">
              <h2 class="text-base lg:text-lg mt-4 leading-8 tracking-wide">
                Withdrawn
              </h2>
              <h1 class="font-bold text-2xl lg:text-5xl tracking-1px">
                ${"450"}
              </h1>
            </div>
          </div>
          <div class="flex justify-center items-center w-full border-r border-gray-300 py-6">
            <div class="text-gray-800 w-1/2 ">
              <h2 class="text-base lg:text-lg mt-4 leading-8 tracking-wide">
                Pending Clearance
              </h2>
              <h1 class="font-bold text-2xl lg:text-5xl tracking-1px">
                ${"450"}
              </h1>
            </div>
          </div>
          <div class="flex justify-center items-center w-full py-6">
            <div class="text-gray-800 w-1/2 ">
              <h2 class="text-base lg:text-lg mt-4 leading-8 tracking-wide">
                Available for Withdrawal
              </h2>
              <h1 class="font-bold text-2xl lg:text-5xl tracking-1px">
                ${"450"}
              </h1>
            </div>
          </div> */}
      </div>
    </>
  );
}

export default Dashboard;
