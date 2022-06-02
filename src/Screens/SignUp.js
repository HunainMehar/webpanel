import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";
import toast from "react-hot-toast";


function SignUp(props) {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async(e) => {
     e.preventDefault();
    if (password === confirmPassword && password.length > 0) {
      const toastId = toast.loading("Loading...");
      try {
         const response = await axios.post("http://backend-fashionhub.herokuapp.com/designer/signup", {
          firstname,
          lastname,
          email,
          password,
        });
        
        //send notification to user
        toast.dismiss(toastId);
        toast.success("Please verify your email");
        //redirect to login page
        navigate("/Otp", {state:{user:response.data}});
      }
      catch (error) {
        toast.dismiss(toastId)
        toast.error(error.response.data);
      }
    }
    else{
      toast.error("Enter all fields");
    }
  }

  return ( <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"></img>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a new account</h2>
    </div>
    <form className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true">
      </input>
      <div className=" shadow-sm space-y-3">
        <div >
          <label for="email-address" className="sr-only ">First Name</label>
          <input onChange={(e)=> {setFirstname(e.target.value)}} id="f-name" name="f-name" type="firstname"  required className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="First Name">

        </input>
        </div>
        <div >
          <label for="email-address" className="sr-only">Last Name</label>
          <input onChange={(e)=> {setLastname(e.target.value)}} id="l-name" name="l-name" type="lastname" required className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Last Name">
        </input>
        </div>
        <div>
          <label for="email-address" className="sr-only">Email address</label>
          <input onChange={(e)=> {setEmail(e.target.value)}} id="email-address" name="email" type="email" autocomplete="email" required className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
        </input>
        </div>
       
        <div>
          <label for="password" className="sr-only">Password</label>
          <input onChange={(e)=> {setPassword(e.target.value)}} id="password" name="password" type="password" autocomplete="current-password" required className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
        </input>
        </div>
        <div>
          <label for="password" className="sr-only">Re-enter Password</label>
          <input onChange={(e)=> {setConfirmPassword(e.target.value)}} id="password" name="password" type="password" autocomplete="current-password" required className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Re-enter Password">
        </input>
        </div>
      </div>


      <div>
        <button onClick={handleSignup} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            
            <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign up
        </button>
      </div>
    </form>
  </div>
</div>
);
  }

export default SignUp;