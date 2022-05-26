import React, { useState } from "react";
import { useFileUpload } from 'use-file-upload'

function Settings() {
  const [showEditProfile, setShowEditProfile ] = useState(false);
  const [file,selectFile] = useFileUpload();
  return (
    <>
      <div className="flex items-center justify-center">
        <div class="xl:w-10/12 w-full px-8">
          <div class="xl:px-24">
            <div className="xl:w-full border-b border-gray-300  py-5 bg-white ">
              <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                <p className="text-lg text-gray-800  font-bold">Profile</p>
                <div className="ml-2 cursor-pointer text-gray-600 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={16}
                    height={16}
                  >
                    <path
                      className="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
              <div class="w-80">
                <div class="flex flex-col items-center">
                  <div className="w-48 h-48 rounded-full bg-cover bg-center bg-no-repeat relative shadow flex items-center justify-center">
                    <img
                      src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg"
                      alt
                      className="absolute h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                    />
                    <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full" />
                    <div
                      className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100"
                      onClick={() => setShowEditProfile(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-edit"
                        width={30}
                        height={30}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1={16} y1={5} x2={19} y2={8} />
                      </svg>
                      <p className="text-xs text-gray-100">Edit Picture</p>
                    </div>
                  </div>
                </div>
                <div class="pt-10">
                  <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800">
                    Personal Information
                  </h1>
                  <p class="mt-4 text-sm leading-5 text-gray-600">
                    Information about the section could go here and a brief
                    description of how this might be used.
                  </p>
                </div>
              </div>
              <div>
                <div class="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                  <div class="md:w-64">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="firstName"
                    >
                      First name
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="firstName"
                      placeholder="John"
                      readOnly={true}
                    />
                  </div>
                  <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="lastName"
                    >
                      Last name
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="lastName"
                      placeholder="Doe"
                      readOnly={true}
                    />
                  </div>
                </div>
                <div class="md:flex items-center lg:ml-24 mt-8">
                  <div class="md:w-64">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="emailAddress"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="emailAddress"
                      placeholder="youremail@example.com"
                      readOnly={true}

                    />
                  </div>
                  <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="phone"
                    >
                      Phone number
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="phone"
                      placeholder="123-1234567"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4">
              <div class="w-80">
                <div class="flex items-center">
                  <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800">
                    Security
                  </h1>
                </div>
                <p class="mt-4 text-sm leading-5 text-gray-600">
                  Information about the section could go here and a brief
                  description of how this might be used.
                </p>
              </div>
              <div>
                <div class="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                  <div class="md:w-64">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="password"
                    >
                      New Password
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="password"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="confirmPassword"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
                <div class="md:flex items-center lg:ml-24 mt-8">
                  <div class="md:w-64">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="recoverEmail"
                    >
                      Recovery Email address
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="recoveryEmail"
                      placeholder="Your recovery email"
                    />
                  </div>
                  <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="altPhone"
                    >
                      Alternate phone number
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="altPhone"
                      placeholder="Your alternate phone number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center">
              <button className="mx-3 mb-4 px-8 py-3 text-md text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {showEditProfile ? (
        <>
          <div className="w-full px-4 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative border rounded-lg pb-2 border-gray-500 bg-white ">
              <div className="flex  items-center border-b rounded-t-lg border-gray-600 bg-gray-600 justify-center px-6 py-3">
                <p className="text-xl  leading-tight text-white">
                  Change Profile Photo
                </p>
              </div>
              <div className=" px-6 pt-2 flex flex-col overflow-x-auto">

                <button className=" pb-4 pt-4 text-md border-b text-blue-600" onClick={() => {
                    selectFile();
                }}>
                  Upload Photo
                  
                </button>
                <button className=" pb-4 pt-4 border-b text-md text-red-600">
                  Remove Current Photo
                </button>
                <button className=" pb-4 pt-4 text-md"  onClick={() => setShowEditProfile(false)}>
                  Cancel
                </button>
               
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Settings;
