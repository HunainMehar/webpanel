import React, { Fragment, useRef, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Test(props) {
  const [description, setDescription, descriptionRef] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [profilepicture, setProfilePicture] = useState("");

  //create a function to get the profile picture
  const getProfilePicture = async () => {
    await axios
      .get("https://backend-fashionhub.herokuapp.com/designer/getprofilepic", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        //set the profile picture
        setProfilePicture(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(async () => {
    await getProfilePicture();
  }, []);

  //create a function to edit a post
  const editPost = async () => {
    const toastId = toast.loading("Loading...");
    //make a post request to the server
    await axios
      .put(
        `https://backend-fashionhub.herokuapp.com/designer/editpost`,
        {
          id: props.data._id,
          description: description,
          price: price,
          title: title,
        },
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.dismiss(toastId);
        toast.success("Post Edited Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(toastId);
        toast.error("Some error occured");
      });
  };

  //create a function to delete a post
  const deletePost = async () => {
    const toastId = toast.loading("Loading...");
    //make a post request to the server
    await axios
      .delete(
        `https://backend-fashionhub.herokuapp.com/designer/deletepost/${props.data._id}`,
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.dismiss(toastId);
        toast.success("Post Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(toastId);
        toast.error("Some error occured");
      });
  };

  const [showLikeModal, setShowLikeModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  return (
    <>
      <div className=" justify-center items-center flex overflow-x-hidden fixed inset-0 z-40 outline-none focus:outline-none">
        <div className="w-[80%] relative my-2 mx-auto  rounded-md">
          <div className="border-1 rounded-lg shadow-lg relative flex w-full bg-white outline-none focus:outline-none">
            <div className="min-h-min aspect-square w-[45%]">
              <img
                className="mx-auto h-full"
                src={props.data.image}
                alt="River"
              />
            </div>
            <div className="flex w-[55%]">
              <div className="flex-row w-full px-4 py-4">
                <div className="items-start flex pb-4">
                  <div className="flex pt-2 w-14 justify-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        profilepicture
                          ? profilepicture
                          : "https://st2.depositphotos.com/47577860/45635/v/950/depositphotos_456355278-stock-illustration-users-dots-profile-account-loading.jpg?forcejpeg=true"
                      }
                      alt="Workflow"
                    />
                  </div>
                  <div className="flex-row w-full">
                    <h2 className="px-2 font-bold text-gray-700 text-left">
                      {props.data.name}
                    </h2>
                    <p className="px-2 text-gray-700 text-left">
                      {props.data.description}
                    </p>
                  </div>

                  <Menu
                    as="div"
                    className="inline-block item-center justify-center text-left py-6 pr-2"
                  >
                    <div>
                      <Menu.Button className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-400 hover:text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
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
                      <Menu.Items className="absolute origin-top-right mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                onClick={() => setShowEditModal(true)}
                              >
                                Edit
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                onClick={() => deletePost(props.data._id)}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Delete
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <div
                    className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
                    onClick={() => props.showModal(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Close"
                      className="icon icon-tabler icon-tabler-x"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                  </div>
                </div>
                <div className="w-full max-w-2xl   px-4 ">
                  <div className="border rounded-lg  overflow-y-auto h-80 border-gray-200">
                    <div className="px-6 pt-2 ">
                      <table className="w-full whitespace-nowrap">
                        <tbody className="">
                          {props.data.comments.map((comment) => (
                            <Comment data={comment} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-2xl pt-4 px-4">
                  <div className="border rounded-lg pb-2 border-gray-200">
                    <div className="items-center flex flex-row px-6 pt-2  overflow-x-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="red"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clip-rule="evenodd"
                        />
                      </svg>{" "}
                      <p className="text-gray-700 text-sm pl-2">
                        Liked by and{" "}
                        <a
                          href="#"
                          className="font-bold hover:text-indigo-500"
                          onClick={() => setShowLikeModal(true)}
                        >
                          {props.data?.likes?.length} users
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLikeModal ? (
        <>
          <div className="w-full px-4  justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-[25%] border rounded-lg pb-2 border-gray-500 bg-white ">
              <div className="flex  items-center rounded-t-lg border-b border-gray-600 bg-gray-600 justify-center px-6 py-3 w-full">
                <p className="text-xl font-semibold leading-tight text-white">
                  Likes
                </p>
                <div
                  className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
                  onClick={() => setShowLikeModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Close"
                    className="icon icon-tabler icon-tabler-x"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={18} y1={6} x2={6} y2={18} />
                    <line x1={6} y1={6} x2={18} y2={18} />
                  </svg>
                </div>
              </div>
              <div className=" px-6 pt-2  overflow-x-hidden overflow-y-auto h-64 z-50">
                {props.data.likes.map((like) => (
                  <p className=" pb-4 pt-4 text-md">
                    <b>{like.firstname + " " + like.lastname} </b> liked your
                    photo.
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showEditModal ? (
        <>
          <div>
            <div
              className="flex justify-center items-center overflow-x-hidden overflow-y-auto transition duration-150 ease-in-out z-50 absolute top-0 right-0 bottom-0 left-0"
              id="modal"
            >
              <div
                role="alert"
                className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
              >
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                  <div className="w-full flex justify-start text-gray-600 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                    Edit Product
                  </h1>
                  <label
                    htmlFor="name"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Product Name
                  </label>
                  <input
                    id="name"
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  />
                  <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                    Price
                  </label>
                  <div className="relative mb-5 mt-2">
                    <div className="absolute text-gray-600 flex items-center px-4 border-r h-full">
                      <p>Rs</p>
                    </div>
                    <input
                      onChange={(e) => setPrice(e.target.value)}
                      className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border"
                    />
                  </div>
                  <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                    Description
                  </label>
                  <div className="relative mb-5 mt-2">
                    <input
                      type="text"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-24 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    />
                  </div>
                  <div className="flex items-center justify-start w-full">
                    <button
                      onClick={editPost}
                      className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                    >
                      Save
                    </button>
                  </div>
                  <div
                    className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
                    onClick={() => setShowEditModal(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Close"
                      className="icon icon-tabler icon-tabler-x"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="opacity-50 fixed inset-0 z-30 bg-black"></div>
    </>
  );

  function Comment(props) {
    return (
      <tr className="border-b border-gray-200 ">
        <td className="pt-4 pb-2">
          <div className="flex items-center ">
            <div className="bg-gray-100 rounded-sm p-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={28}
                height={28}
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M13.5613 8.42567C12.5393 8.42567 10.9573 7.26367 9.29134 7.30567C7.09334 7.33367 5.07734 8.57967 3.94334 10.5537C1.66134 14.5157 3.35534 20.3677 5.58134 23.5877C6.67334 25.1557 7.96134 26.9197 9.66934 26.8637C11.3073 26.7937 11.9233 25.7997 13.9113 25.7997C15.8853 25.7997 16.4453 26.8637 18.1813 26.8217C19.9453 26.7937 21.0653 25.2257 22.1433 23.6437C23.3893 21.8237 23.9073 20.0597 23.9353 19.9617C23.8933 19.9477 20.5053 18.6457 20.4633 14.7257C20.4353 11.4497 23.1373 9.88167 23.2633 9.81167C21.7233 7.55767 19.3573 7.30567 18.5313 7.24967C16.3753 7.08167 14.5693 8.42567 13.5613 8.42567ZM17.2013 5.12167C18.1113 4.02967 18.7133 2.50367 18.5453 0.991669C17.2433 1.04767 15.6753 1.85967 14.7373 2.95167C13.8973 3.91767 13.1693 5.47167 13.3653 6.95567C14.8073 7.06767 16.2913 6.21367 17.2013 5.12167Z"
                  fill="#6B7280"
                />
              </svg>
            </div>
            <div className="pl-3">
              <div className="flex text-sm leading-none">
                <p className="font-semibold text-gray-800">
                  {props.data._id.firstname + " " + props.data._id.lastname}
                </p>
              </div>
              <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">
                {props.data.comment}
              </p>
            </div>
          </div>
        </td>
        <td className="self-end">
          <div>
            <p className="text-xs font-medium leading-none text-right text-gray-800">
              {moment(props.data.date).fromNow()}
            </p>
          </div>
        </td>
      </tr>
    );
  }
}
