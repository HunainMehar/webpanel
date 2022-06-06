import React, { useEffect, useState } from "react";
import { useFileUpload } from "use-file-upload";
import axios from "axios";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";

function Settings() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [file, selectFile] = useFileUpload();
  const [profilepicture, setProfilePicture] = useState(null);

  const token = localStorage.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
  }

  const [firstname, setFirstname] = useState(decodedToken.firstname);
  const [lastname, setLastname] = useState(decodedToken.lastname);
  const [email, setEmail] = useState(decodedToken.email);
  const [phone, setPhone] = useState(decodedToken.phone);
  const [oldpass, setOldpass] = useState();
  const [newpass, setNewpass] = useState();
  const [confirmpass, setConfirmpass] = useState();

  //create a function to upload a profile picture
  const uploadProfilePicture = async () => {
    await axios
      .post(
        "https://backend-fashionhub.herokuapp.com/designer/uploadprofilepicture",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
          file: file,
        }
      )
      .then((response) => {
        console.log(response.data);
        //get the profile picture
        getProfilePicture();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  //create a function to delete a profile picture
  const deleteProfilePicture = async () => {
    const toastId = toast.loading("Loading...");
    await axios
      .delete(
        "https://backend-fashionhub.herokuapp.com/designer/deleteprofilepicture",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        getProfilePicture();
        toast.dismiss(toastId);
        toast.success("Profile Picture Deleted Successfully");
        setShowEditProfile(false);
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(toastId);
        toast.error(error);
      });
  };

  useEffect(async () => {
    await getProfilePicture();
  }, []);

  //create a function to get designer details
  const getDesignerDetails = async () => {
    await axios
      .get(
        "https://backend-fashionhub.herokuapp.com/designer/getdesignerdetails/",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
        setEmail(response.data.email);
        setPhone(response.data.phone);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(async () => {
    await getDesignerDetails();
  }, []);

  //create a function to change the password
  const changePassword = async () => {
    const toastId = toast.loading("Loading...");
    await axios
      .post(
        "https://backend-fashionhub.herokuapp.com/designer/changepassword",
        {
          oldpassword: oldpass,
          newpassword: newpass,
        },
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.dismiss(toastId);
        toast.success("Password Changed Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(toastId);
        toast.error("Some error occured.");
      });
  };

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
                      src={
                        profilepicture
                          ? profilepicture
                          : "https://st2.depositphotos.com/47577860/45635/v/950/depositphotos_456355278-stock-illustration-users-dots-profile-account-loading.jpg?forcejpeg=true"
                      }
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
                      <p
                        onChange={async () => {
                          getProfilePicture();
                        }}
                        className="text-xs text-gray-100"
                      ></p>
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
                      First Name
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="firstName"
                      placeholder={firstname}
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
                      placeholder={lastname}
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
                      placeholder={email}
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
                      placeholder={phone ? phone : "Not Provided"}
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
                      Old Password
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="password"
                      placeholder="Enter Old Password"
                      onChange={(e) => setOldpass(e.target.value)}
                    />
                  </div>
                  <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="confirmPassword"
                    >
                      New Password
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="NewPassword"
                      onChange={(e) => setNewpass(e.target.value)}
                      placeholder="Enter New Password "
                    />
                  </div>
                </div>
                <div class="md:flex items-center lg:ml-24 mt-8">
                  <div class="md:w-64 ">
                    <label
                      class="text-sm leading-none text-gray-800"
                      id="altPhone"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="name"
                      tabindex="0"
                      class="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                      aria-labelledby="ConfirmPassword"
                      onChange={(e) => setConfirmpass(e.target.value)}
                      placeholder="Re-enter Your Password"
                    />
                  </div>
                  <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
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
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center">
              <button
                className="mx-3 mb-4 px-8 py-3 text-md text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={async () => {
                  //check new password and confirm password
                  if (newpass === confirmpass && oldpass.length > 0) {
                    await changePassword();
                  } else {
                    toast.error("Password doesn't matched. Please try again.");
                  }
                }}
              >
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
                <button
                  className=" pb-4 pt-4 text-md border-b text-blue-600"
                  onClick={() => {
                    selectFile({}, async ({ source, name, size, file }) => {
                      const formData = new FormData();
                      formData.append("file", file);
                      const toastId = toast.loading("Uploading...");
                      await axios
                        .post(
                          "https://backend-fashionhub.herokuapp.com/designer/uploadprofilepicture",
                          formData,
                          {
                            headers: {
                              "x-token": localStorage.getItem("token"),
                            },
                          }
                        )
                        .then((response) => {
                          console.log(response.data);
                          //get the profile picture
                          getProfilePicture();
                          toast.dismiss(toastId);
                          toast.success(
                            "Profile Picture Uploaded Successfully"
                          );
                          setShowEditProfile(false);
                        })
                        .catch((error) => {
                          console.log(error);
                          toast.dismiss(toastId);
                          toast.error("Upload Failed");
                        });
                    });
                  }}
                >
                  Upload Photo
                </button>
                <button
                  className=" pb-4 pt-4 border-b text-md text-red-600"
                  onClick={async () => {
                    await deleteProfilePicture();
                  }}
                >
                  Remove Current Photo
                </button>
                <button
                  className=" pb-4 pt-4 text-md"
                  onClick={() => setShowEditProfile(false)}
                >
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
