import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();
  const [isActive, setisActive] = useState("1");
  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-grey-900">Orders</h1>
        </div>
      </header>
      <ul
        className="flex items-center justify-around md:justify-center space-x-12  
                    uppercase tracking-widest font-semibold text-xs text-gray-600
                    border-t"
      >
        {/* posts tab is active */}
        <li className={isActive === "1"?"border-t border-gray-700":""}>
          <a
            className="inline-block p-3"
            href="#"
            onClick={() => setisActive("1")}
          >
            <span className="hidden md:inline">New Orders</span>
          </a>
        </li>
        <li className={isActive === "2"?"border-t border-gray-700":""}>
          <a
            className="inline-block p-3"
            href="#"
            onClick={() => setisActive("2")}
          >
            <span className="hidden md:inline">Active Orders</span>
          </a>
        </li>
        <li className={isActive === "3"?"border-t border-gray-700":""}>
          <a
            className="inline-block p-3"
            href="#"
            onClick={() => setisActive("3")}
          >
            <span className="hidden md:inline">Completed Orders</span>
          </a>
        </li>
      </ul>
      {isActive === "1" && newOrders()}
      {isActive === "2" && activeOrders()}
      {isActive === "3" && completedOrders()}
    </div>
  );

  function newOrders() {
    return (
      <div className="flex justify-center ">
        <table className="w-9/12 border-2 text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase border-b">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Customer ID
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Detail</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {New()}
            {New()}
            {New()}
            {New()}
          </tbody>
        </table>
      </div>
    );

    function New() {
      return <tr className="bg-white border-b hover:bg-gray-50">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          #12345
        </th>
        <td className="px-6 py-4">Hoodie</td>
        <td className="px-6 py-4">3</td>
        <td className="px-6 py-4">#7657</td>
        {/* <td className="px-6 py-4"></td> */}

        <td className="px-6 py-4 ">
          <div className="bg-gray-800 h-8 w-24 rounded-md flex items-center justify-center">
            <div className="flex items-center">
              <button
                className="text-md text-white font-normal"
                onClick={() => navigate("/orderdetails")}
              >
                Details
              </button>
            </div>
          </div>
        </td>
      </tr>;
    }
  }
  function completedOrders() {
    return (
      <div className="flex justify-center ">
        <table className="w-9/12 border-2 text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase border-b">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Customer ID
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                #12345
              </th>
              <td className="px-6 py-4">Hoodie</td>
              <td className="px-6 py-4">3</td>
              <td className="px-6 py-4">#5023</td>
              {/* <td className="px-6 py-4"></td> */}
              <td className="px-6 py-4 ">
                <div className="border-gray-700 h-8 w-24 rounded-md flex items-center justify-center">
                  <div className="bg-gray-800 h-8 w-24 rounded-md flex items-center justify-center">
                    <div className="flex items-center">
                      <div className="h-1 w-1 rounded-full bg-gray-600 dark:bg-gray-400  mr-1" />
                      <span className="text-xs text-white font-normal">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  function activeOrders() {
    return (
      <div class="flex justify-center">
        <table className="w-9/12 border-2 text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase border-b">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Customer ID
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                #12345
              </th>
              <td className="px-6 py-4">Hoodie</td>
              <td className="px-6 py-4">3</td>
              <td className="px-6 py-4">#9876</td>
              <td className="px-6 py-4 ">
                <div className="bg-gray-800 h-8 w-24  rounded-md flex items-center justify-center">
                  <div className="flex items-center">
                    <div className="h-1 w-1 rounded-full bg-gray-400  mr-1" />
                    <span className="text-xs text-white font-normal">
                      Active
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Orders;
