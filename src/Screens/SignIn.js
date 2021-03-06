import React from "react";
import axios from "axios";
//import use navigation from react router dom
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function SignIn(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  //create a function to handle signin
  const handleSignin = async (e) => {
    e.preventDefault();
    if (password.length > 0) {
      const toastId = toast.loading("Loading...");
      try {
        const response = await axios.post(
          "https://backend-fashionhub.herokuapp.com/designer/login",
          {
            email,
            password,
          }
        );
        console.log(response);
        //store token in local storage
        localStorage.setItem("token", response.data.token);
        toast.dismiss(toastId);
        toast.success("Login Successful");
        navigate("/home");
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Invalid Credentials");
      }
    }
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <Navigate to="/home" />
      ) : (
        <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div class="max-w-md w-full space-y-8">
            <div>
              <img
                class="mx-auto h-12 w-auto "
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              ></img>
              <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form class="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" value="true"></input>
              <div class=" shadow-sm space-y-3">
                <div>
                  <label for="email-address" class="sr-only">
                    Email address
                  </label>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    id="email-address"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  ></input>
                </div>
                <div>
                  <label for="password" class="sr-only">
                    Password
                  </label>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  ></input>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  ></input>
                  <label
                    for="remember-me"
                    class="ml-2 block text-sm text-gray-900"
                  >
                    {" "}
                    Remember me{" "}
                  </label>
                </div>

                <div class="text-sm">
                  <a
                    href="#"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => navigate("/forgetpassword")}
                  >
                    {" "}
                    Forgot your password?{" "}
                  </a>
                </div>
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => navigate("/register")}
                  >
                    {" "}
                    Register{" "}
                  </a>
                </div>
              </div>

              <div>
                <button
                  onClick={handleSignin}
                  type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    {/* <!-- Heroicon name: solid/lock-closed --> */}
                    <svg
                      class="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
