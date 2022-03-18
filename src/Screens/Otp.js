import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

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
            try {
                const response = axios.post("http://localhost:3001/designer/verifysignup", {
                    otp,
                    user: state.user,

                });
                console.log(response);
                alert("Account verified successfully");
                navigate("/");
            } catch (error) {
                alert(error.response.data);
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
                <input
                  class="m-2 border border-gray-300  h-10 w-10 text-center form-control rounded"
                  type="text"
                  onChange={(e) => {setOtp(e.target.value)}}
                  id="first"
                  maxlength="4"
                />
                <input
                  class="m-2 border border-gray-300 h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="second"
                  maxlength="1"
                />
                <input
                  class="m-2 border border-gray-300 h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="third"
                  maxlength="1"
                />
                <input
                  class="m-2 border border-gray-300 h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="fourth"
                  maxlength="1"
                />{" "}
              </div>
              <button
                type="submit"
                onClick={handleOtp} class="group relative w-full flex justify-center py-2 px-4 mt-6 border border-transparent  text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Resend OTP
              </button>
              {/* <div class="flex justify-center text-center mt-5"> <a class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Resend OTP</span><i class='bx bx-caret-right ml-1'></i></a> </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
