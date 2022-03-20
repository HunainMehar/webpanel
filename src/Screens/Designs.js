import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import SellerTopHeader from "./SellerTopHeader";

function Designs(props) {

    
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  //create a function to upload post
  const uploadPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", file);
    formData.append("category", "Dress");
    
    try {
      const response = await axios.post(
        "http://localhost:3001/designer/createpost",
        formData
      );
      console.log(response);
      alert("Post created successfully");
      
    } catch (error) {
      alert(error.response.data);
    }
  };



  return (



    <div class="min-h-full">
        <SellerTopHeader/>

      <main>
        <div class="min-h-full flex items-center bg-gray-800 justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div class="max-w-md w-full space-y-8">
            <form class="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" value="true"></input>
              <div class=" shadow-sm space-y-3">
                <div>
                  <label for="title" class="sr-only ">
                    Title
                  </label>
                  <input
                  onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    name="title"
                    type="title"
                    required
                    class="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Title"
                  ></input>
                </div>
                <div>
                  <label for="description" class=" text-gray-900">
                    Description
                  </label>
                  <textarea
                  onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    cols="20"
                    rows="5"
                    placeholder="write here.."
                    class="w-full font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
                  ></textarea>
                  <label class="inline-block mb-2 text-gray-500">
                    File Upload
                  </label>
                  <div>
                    <label for="title" class="sr-only ">
                      Price
                    </label>
                    <input
                    onChange={(e) => setPrice(e.target.value)}
                      id="Price"
                      name="Price"
                      type="Price"
                      required
                      class="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none  mb-3 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Price"
                    ></input>
                  </div>
                  <div class="flex items-center justify-center w-full">
                    <label class="flex flex-col w-full h-32 border-4 border-grey-500 border-dashed hover:bg-gray-100 hover:border-gray-300">
                      <div class="flex flex-col items-center justify-center pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          {file? file.name : "Upload File"}
                        </p>
                      </div>
                      <input
                        type="file"
                        class="opacity-0"
                        onChange={(e) => {setFile(e.target.files[0])}}
                        
                      />
                    </label>
                  </div>
                </div>
                <div class="flex justify-center p-2">
                  <button onClick={uploadPost} class="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl">
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <div class="inline-block min-w-full align-middle dark:bg-gray-800">
              <div class="p-4">
                <label for="table-search" class="sr-only">
                  Search
                </label>
                <div class="relative mt-1">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for items"
                  ></input>
                </div>
              </div>
              <div class="overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead class="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-search-all"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          ></input>
                          <label for="checkbox-search-all" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Price
                      </th>
                      <th scope="col" class="p-4">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td class="p-4 w-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-search-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          ></input>
                          <label for="checkbox-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple Imac 27"
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        Desktop PC
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        $1999
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                        <a
                          href="#"
                          class="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                    <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td class="p-4 w-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-search-2"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          ></input>
                          <label for="checkbox-search-2" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        Laptop
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        $2999
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                        <a
                          href="#"
                          class="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                    <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td class="p-4 w-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-search-3"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          ></input>
                          <label for="checkbox-search-3" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        iPhone 13 Pro
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        Phone
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        $999
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                        <a
                          href="#"
                          class="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>

                    <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td class="p-4 w-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-search-5"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          ></input>
                          <label for="checkbox-search-5" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple Watch Series 7
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        Accessories
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        $599
                      </td>
                      <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                        <a
                          href="#"
                          class="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Designs;
