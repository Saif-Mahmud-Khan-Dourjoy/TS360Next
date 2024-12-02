

"use client"
import logo from "../../../public/logo.png";
import Auth2 from "../../../public/Auth/auth2.png"
import Auth3 from "../../../public/Auth/auth3.png"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faCircleCheck, faL } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {ChangePassword} from "@/app/(auth)/Api/AuthenticationApi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


export default function NewPassword() {
  const [reset, setReset] = useState(false);
  const [newpass, setNewPass] = useState('');
  const [confpass, setConfPass] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [spanmsgstate, setSpanMsgState] = useState(true);
  const [spanmsg, setSpanMsg] = useState('');
  const newParam = useSearchParams();
  const [passVisible, setPassVisible] = useState(false);
  const [cnfPassVisible, setCnfPassVisible] = useState(false);
  
  useEffect(()=>{
    setEmail(newParam.get("email"));
    setOtp(localStorage.getItem("otp_val"));
  },[email, otp])

  function handlePassChange(){
    if(newpass != confpass){
      setSpanMsg(false);
      toast.error("Passwords are not matching", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return
    }
    let changeData = {}
    changeData['username'] = email;
    changeData['otp'] = otp;
    changeData['password'] = newpass;
    localStorage.setItem("otp_val", '');
    ChangePassword(changeData).then((res)=>{
      if(res?.[0]){
        setReset(true);
      }
      else{
        toast.error(res?.[1], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setReset(false);
        return
      }
    })
  };

  function togglePassVisibility(){
    setPassVisible(!passVisible);
  };

  function toggleCnfPassVisibility(){
    setCnfPassVisible(!cnfPassVisible);
  };

  function verifyPass(e){
    let new_pass = e.target.value;
    setNewPass(new_pass);
    if(new_pass.length<10){
      setSpanMsg("Password must conatin atleast 10 characters")
      setSpanMsgState(true);
    }
    else if(!(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&])/.test(new_pass))){
      setSpanMsg("Password must have 1 uppercase, 1 lowercase, 1 number and 1 of !,@,#,$,&");
      setSpanMsgState(true);
    }
    else{
      setSpanMsgState(false);
    }

  }



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


              <div>
                <form>
                  <div className="relative w-full mt-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <div className="relative">
                    <input
                     type={!passVisible?"password":"string"}
                     id="password"
                     value={newpass}
                    onChange={(e)=>verifyPass(e)} 
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                     placeholder="Enter new password" required />
                     <i className ={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer`}
                     onClick={togglePassVisibility}>
                      {!passVisible?<FiEye size={20}/>:<FiEyeOff size={20}/>}
                     </i>
                     </div>
                     {spanmsgstate?<span style={{color:"red"}}>{spanmsg}</span>:null}
                  </div>
                  <div className="relative w-full mt-6 mb-6">
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                    <input
                     type={!cnfPassVisible?"password":"string"} 
                     id="confirm_password"
                     value={confpass}
                     onChange={(e) => setConfPass(e.target.value)} 
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                     placeholder="Re-enter new password" required />
                     <i className ={`absolute right-3 top-1/2 transform text-gray-500 cursor-pointer`}
                     onClick={toggleCnfPassVisibility}>
                      {!cnfPassVisible?<FiEye size={20}/>:<FiEyeOff size={20}/>}
                     </i>
                  </div>


                  <div className="w-full">
                    <button onClick={handlePassChange} type="button" className={`shadow-lg w-full  text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600  cursor-pointer  font-medium rounded-md text-lg   px-5 py-2.5 text-center `}>Reset Password</button>
                    <ToastContainer/>
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


