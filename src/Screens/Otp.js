import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

//function to obscure email
const obscureEmail = (email) => {
  const [name, domain] = email.split("@");
  return `${name[0] + name[1]}${
    new Array(name.length - 2).join("*") + name[name.length - 1]
  }@${domain}`;
};

function Otp(props) {
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

  const handleOtp = (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      const toastId = toast.loading("Loading...");
      try {
        const response = axios.post(
          "https://backend-fashionhub.herokuapp.com/designer/verifysignup",
          {
            otp,
            user: state.user,
          }
        );
        console.log(response);
        toast.dismiss(toastId);
        toast.success("Verification Successful");
        navigate("/signin");
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Invalid OTP");
      }
    }
  };

  return (
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="">
          <div class="w-full">
            <div class="bg-white h-64 py-3 rounded text-center">
              <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create a new account
              </h2>
              <div class="flex flex-col mt-4 text-xl text-gray-900">
                {" "}
                <span>Enter the OTP you received at</span>
                {obscureEmail(state.user.email)}
                <span class="font-bold"></span>{" "}
              </div>
              <div
                id="otp"
                class="flex flex-row justify-center text-center px-2 mt-5"
              >
                {/* <input
                  class="m-2 border border-gray-300  h-10 w-10 text-center form-control rounded"
                  type="text"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  id="first"
                  maxlength="1"
                />
                <input
                  class="m-2 border border-gray-300 h-10 w-10 text-center form-control rounded"
                  type="text"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  id="second"
                  maxlength="1"
                />
                <input
                  class="m-2 border border-gray-300 h-10 w-10 text-center form-control rounded"
                  type="text"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  id="third"
                  maxlength="1"
                /> */}
                <input
                  class="m-2 border border-gray-300 h-10 w-40 text-center form-control rounded"
                  type="text"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                 // id="fourth"
                  maxlength="4"
                />{" "}
              </div>
              <button
                type="submit"
                onClick={handleOtp}
                
                class="group relative w-full flex justify-center py-2 px-4 mt-6 border border-transparent  text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
