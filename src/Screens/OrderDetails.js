import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function OrderDetails() {
  return (
    <div>
      <div>
        <header className="bg-white shadow ">
          <div className="max-w-7xl mx-auto py-6 px-4 flex justify-around items-center">
            <h1 className="text-3xl font-bold text-gray-900">Order #4765</h1>
            <h3>22/09/2021</h3>
            <h3>05:48 AM</h3>
          
            <Menu as="div" className="inline-block item-center justify-center text-left py-2">
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  ">
                  Status
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                >
                <Menu.Items className="absolute origin-top-right mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                          active
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700",
                          "block px-4 py-2 text-sm"
                          )}
                          >
                          Active
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                          active
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700",
                          "block px-4 py-2 text-sm"
                          )}
                          >
                          Pending
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                        href="#"
                        className={classNames(
                          active
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700",
                          "block px-4 py-2 text-sm"
                          )}
                          >
                          Completed
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
                      
          </div>
        </header>
      </div>
      <div className="max-w-7xl  mx-auto py-6 px-4 mt-6 flex flex-wrap shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">Product</h1>
        <div className="">
          <img
            src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/10/4k-Best-Latest-Whatsapp-Dp-Profile-Images-photo.gif"
            className="max-w-lg h-96  object-contain shadow-lg m-8"
            alt=""
          />
          </div>
          <div className="max-w-7xl mx-auto py-6 px-4 grid justify-items-center">
          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10">
              <div className="border-t border-gray-500 pt-1">
                <dt className="font-bold text-gray-900">Product</dt>
                <dd className="mt-2 text-sm text-gray-700">Shirt</dd>
              </div>
              <div className="border-t border-gray-500 pt-1">
                <dt className="font-bold text-gray-900">Quantity</dt>
                <dd className="mt-2 text-sm text-gray-700">2</dd>
              </div>
              <div className="border-t border-gray-500 pt-1">
                <dt className="font-bold text-gray-900">Size</dt>
                <dd className="mt-2 text-sm text-gray-700">XL</dd>
              </div>
              <div className="border-t border-gray-500 pt-1">
                <dt className="font-bold text-gray-900">Total Price</dt>
                <dd className="mt-2 text-sm text-gray-700"><b>Rs 5700</b></dd>
              </div>
          </dl>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-4 px-4">
      <h1 className="text-3xl font-bold text-gray-900">Customer #101</h1>
            <h2>Talha Bukhari</h2>
            <h2>230 Awais Qarni Bahria Town Lahore</h2>
      </div>
    </div>
  );
}

export default OrderDetails;
