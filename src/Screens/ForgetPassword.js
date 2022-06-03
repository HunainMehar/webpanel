import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgetPassword(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  //create a function to handle forget password
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    if (email.length > 0) {
      const toastId = toast.loading("Loading...");
      try {
        const response = await axios.post(
          "http://backend-fashionhub.herokuapp.com/designer/forgotpassword",
          {
            email: email,
          }
        );
        console.log(response);
        toast.dismiss(toastId);
        toast.success("Password reset link sent to your email");
        navigate("/otp");
      
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Some error occured");
      }
    }
  };

  return (
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <img
            class="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          ></img>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Password?
          </h2>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true"></input>
          <div class=" shadow-sm space-y-3">
            <div>
              <div></div>
              <label for="email-address" class="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                class="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              ></input>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleForgetPassword}
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Send Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
