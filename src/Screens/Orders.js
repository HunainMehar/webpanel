import React, {useState} from "react";


function Orders() {
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
        <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
          <a className="inline-block p-3" href="#" onClick={()=> setisActive("1")}>
            <span className="hidden md:inline">New Orders</span>
          </a>
        </li>
        <li>
          <a className="inline-block p-3" href="#" onClick={()=> setisActive("2")}>
            <span className="hidden md:inline">Active Orders</span>
          </a>
        </li>
        <li>
          <a className="inline-block p-3" href="#" onClick={()=> setisActive("3")}>
            <span className="hidden md:inline">Completed Orders</span>
          </a>
        </li>
      </ul>
      {isActive ==="1" && newOrders()}
      {isActive ==="2" && activeOrders()}
      {isActive ==="3" && completedOrders()}
    
    </div>
  );

  function newOrders() {
    return <div className="flex justify-center ">
      <table className="w-9/12 border-2 text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase">
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
              <span className="sr-only">message</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Detail</span>
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
            <td className="px-6 py-4">
            </td>
            <td className="px-6 py-4 ">
              <a
                href="#"
                className="font-medium text text-blue-600 hover:underline"
              >
              </a>
            </td>
            <td className="px-6 py-4 ">
              <a
                href="#"
                className="font-medium text text-blue-600 hover:underline"
              >
                View Details
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>;
  }
  function completedOrders() {
    return <div className="flex justify-center ">
      <table className="w-9/12 border-2 bg-secondary text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase">
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
              <span className="sr-only">Detail</span>
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
            <td className="px-6 py-4 ">
              <a
                href="#"
                className="font-medium text text-blue-600 hover:underline"
              >
                View Details
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>;
  }

  function activeOrders() {
    return (
      <div class="relative overflow-x-auto shadow-md ">
        <table class="w-full text-sm text-left text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">
                Order ID
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Details</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b hover:bg-gray-50">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
              >
                #12345
              </th>
              <td class="px-6 py-4">Hoodie</td>
              <td class="px-6 py-4">5</td>
              <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 hover:underline">
                  View Details
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Orders;
