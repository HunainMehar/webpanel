import React, { useState, useEffect } from "react";


function Otp(props) {
    return(
        <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div class="">
            <div class="w-full">
                <div class="bg-white h-64 py-3 rounded text-center">
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a new account</h2>
                    <div class="flex flex-col mt-4 text-xl text-gray-900"> <span>Enter the OTP you received at</span> <span class="font-bold">xyz******@gmail.com</span> </div>
                    <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5"> 
                    <input class="m-2 border border-gray-300  h-10 w-10 text-center form-control rounded" type="text" id="first" maxlength="1" /> 
                    <input class="m-2 border border-gray-300 h-10 w-10 text-center form-control rounded" type="text" id="second" maxlength="1" /> 
                    <input class="m-2 border border-gray-300 h-10 w-10 text-center form-control rounded" type="text" id="third" maxlength="1" />
                     <input class="m-2 border border-gray-300 h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxlength="1" />
                      <input class="m-2 border border-gray-300 h-10 w-10 text-center form-control rounded" type="text" id="fifth" maxlength="1" /> 
                      <input class="m-2 border border-gray-300 h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxlength="1" /> </div>
                      <button type="submit" class="group relative w-full flex justify-center py-2 px-4 mt-6 border border-transparent  text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          </span>
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