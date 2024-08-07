

"use client"
import logo from "/public/logo.png";
import Auth2 from "/public/Auth/auth2.png"
import Auth3 from "/public/Auth/auth3.png"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import Image from "next/image";


export default function NewPassword() {
  const [reset, setReset] = useState(false);



  return (
    <>
     <Link href='/'>
    <div className="absolute top-8 lg:left-24 left-7">
        <div className="font-medium text-xl cursor-pointer flex items-center gap-1">
          <Image className="w-11 h-11" src={logo} alt="logo" />
          <h1 className="font-bold text-lg ml-2">
            <span className="text-[#82D955]">Test</span>
            <span className="text-[#3AB6FF]">Sprint</span>360
          </h1>
        </div>
    </div>
    </Link>
      {/*  */}
      <div className="py-8 lg:px-24 px-7 flex justify-between items-center h-screen">

      

          {!reset ? (
            <div className=" w-full lg:w-[45%]">

              <div className="font-bold text-2xl md:text-[30px] text-gray-950 mt-8">
                Set a new password
              </div>


              <div className="mt-14">
                <form>


                  <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="Enter new password" required />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                    <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Re-enter new password" required />
                  </div>


                  <div className="w-full">
                    <button onClick={() => setReset(true)} type="submit" className={`shadow-lg w-full  text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600  cursor-pointer  font-medium rounded-md text-lg   px-5 py-2.5 text-center `}>Reset Password</button>
                  </div>

                </form>


              </div>
              <hr className="my-6" />
              <div className="text-center text-gray-400 ">
                <Link href='/login' className="text-blue-500 flex justify-center items-center"><FontAwesomeIcon icon={faArrowAltCircleLeft} className="mr-1 max-h-4 max-w-4" /> Sign In </Link>
              </div>


            </div>) : (
            <div className=" w-full lg:w-[45%]">

              <div className="font-bold text-2xl md:text-[30px] text-gray-950 mt-8 text-center">
                Password Reset Completed <FontAwesomeIcon color="green" icon={faCircleCheck} />
              </div>


              <div className="mt-8 text-sm text-gray-900 space-y-3 text-center">
                <div>
                  Your password has been successfully reset.
                </div>
                <div>
                  You will automatically be re-directed to the sign in page.
                </div>


              </div>

              <div className="text-center text-gray-400 mt-6">
                <Link href='/login' className="text-blue-500 flex justify-center items-center"><FontAwesomeIcon icon={faArrowAltCircleLeft} className="mr-1 max-h-4 max-w-4" /> Sign In </Link>
              </div>


            </div>
          )

          }

          <div className="hidden lg:block w-[45%] ">
            {!reset ? <Image src={Auth2} alt="" /> : <Image src={Auth3} alt="" />}
          </div>
        

      </div>

    </>
  );
}


