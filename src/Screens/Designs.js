import React, { useEffect } from "react";
import useState from "react-usestateref";
import axios from "axios";
import toast from "react-hot-toast";

function Designs(props) {
  const [designs, setDesigns, designsRef] = useState([]);
  const [upload, setUpload, uploadRef] = useState(null);
  const [title, setTitle, titleRef] = useState("");
  const [description, setDescription, descriptionRef] = useState("");
  const [price, setPrice, priceRef] = useState("");
  const [file, setFile, fileRef] = useState();

  //create a function to upload post
  const uploadPost = async (e) => {
    const toastId = toast.loading("Loading...")
    e.preventDefault();
    var formData = new FormData();
    formData.append("title", titleRef.current);
    formData.append("description", descriptionRef.current);
    formData.append("price", priceRef.current);
    formData.append("file", fileRef.current);
    formData.append("category", "Dress");
    try {
      const response = await axios.post(
        "http://backend-fashionhub.herokuapp.com/designer/createpost",
        formData,
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );
      setUpload(response);
      toast.dismiss(toastId)
      toast.success("Post Uploaded Successfully")
    } catch (error) {
      toast.dismiss(toastId)
      toast.error("Some error occured")
    }
  };

 

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Designs</h1>
        </div>
      </header>
      <main className="overflow-y-auto">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <form className="mt-8 space-y-6" 
            action="#" 
            method="POST"
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className=" shadow-sm space-y-3">
                <div>
                  <label htmlFor="title" className="sr-only ">
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
                  <label htmlFor="description" className="text-gray-500">
                    Description
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    cols="20"
                    rows="5"
                    placeholder="write here.."
                    className="w-full font-serif  p-4 mt-2 text-gray-600 bg-indigo-50 outline-none rounded-md"
                  />
                  <label className="inline-block m-2 text-gray-500">
                    Price
                  </label>
                  <div>
                    <label htmlFor="title" className="sr-only ">
                      Price
                    </label>
                    <input
                      onChange={(e) => setPrice(e.target.value)}
                      id="Price"
                      name="Price"
                      type="Price"
                      required
                      className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none  mb-3 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Price"
                    ></input>
                  </div>
                  <h1 className="mb-2 pt-2 mx-auto text-gray-500">
                    Available for Order
                  </h1>
                  <div class="flex items-center mb-4">
                    <input
                      id="country-option-1"
                      type="radio"
                      name="countries"
                      value="USA"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      aria-labelledby="country-option-1"
                      aria-describedby="country-option-1"
                      checked
                    />
                    <label
                      for="country-option-1"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Yes
                    </label>
                  </div>
                  <div class="flex items-center mb-4">
                    <input
                      id="country-option-1"
                      type="radio"
                      name="countries"
                      value="USA"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      aria-labelledby="country-option-1"
                      aria-describedby="country-option-1"
                      checked
                    />
                    <label
                      for="country-option-1"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      No
                    </label>
                  </div>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full h-32 border-4 border-grey-500 cursor-pointer border-dashed hover:bg-gray-100 hover:border-gray-300">
                      <div className="flex flex-col items-center justify-center pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          {fileRef.current
                            ? fileRef.current.name
                            : "Upload File"}
                        </p>
                      </div>
                      <input
                        type="file"
                        className="opacity-0"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                          // console.log(e.target.files);
                        }}
                      ></input>
                    </label>
                  </div>
                </div>
                <div className="flex justify-center p-2">
                  <button
                    type="submit"
                    onClick={uploadPost}
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl"
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
       
          </div>
        </div>
        <div className="p-10 grid grid-cols-4 gap-4">
          
        </div>
      </main>
    </div>
  );
  function ProductsCards(props) {
    return (
      <div className="content-center  py-4 rounded overflow-hidden shadow-lg">
        <div className="content-center px-4 py-4">
          <img
            className="self-center 	aspect-ratio: 1 / 1"
            src={props.post.image}
            alt="River"
            resize="contain"
          />
          <div className="font-bold text-xl mb-2">{props.post.title}</div>
          <p className="text-gray-700 text-base">{props.post.description}</p>
          <div className=" flex px-6 pt-6 justify-evenly">
            <span className=" bg-gray-200 w-28  rounded-full px-3 py-1 text-md font-semibold text-gray-700 mb-2">
              {props.post.price}
            </span>

            <button
              className="block text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mb-2 px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              data-modal-toggle="popup-modal"
            >
              Edit
            </button>
            <button
              className="block text-white  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm mb-2 px-3 py-1.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              type="button"
              data-modal-toggle="popup-modal"
            >
              Delete
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Designs;
