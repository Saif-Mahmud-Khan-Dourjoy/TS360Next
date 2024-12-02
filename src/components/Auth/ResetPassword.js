"use client"
import logo from "../../../public/logo.png";
import Auth2 from "../../../public/Auth/auth2.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {useSearchParams, useRouter} from "next/navigation";
import { VerifyOTP } from "@/app/(auth)/Api/AuthenticationApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Reset() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [sendCode, setSendCode] = useState(false);
  const inputRef = useRef(null);
  const param = useSearchParams();
  const [email, setEmail] = useState('');
  const newPassRouter = useRouter();

  useEffect(() => {
    inputRef.current.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    console.log(otp)
    const hasEmptyString = otp.some((item) => item === "" || item === undefined);
    setSendCode(!hasEmptyString);
  }, [otp]);

  useEffect(()=>{
    setEmail(param.get("email"));
  }, [email]);

  const handleChange = (e, i) => {
    if (isNaN(e.target.value)) return false;

    const newOtp = [...otp];
    newOtp[i] = e.target.value;

    setOtp(newOtp);

    // if (e.target.value !== "" && i < otp.length - 1) {
    //   setActiveOtpIndex((prev) => prev + 1);
    // }
    if (!e.target.value) {
      if (i > 0) {
        setActiveOtpIndex((prev) => prev - 1);
      }
    }
    else {
      if (e.target.value !== "" && i < otp.length - 1) {
        setActiveOtpIndex((prev) => prev + 1);
      }
    }
  };

  function handleOTPVerification(){
    let otp_str = ''
    otp.forEach(ele=>{
      otp_str = otp_str+ele;
    })
    let send_data = {};
    send_data['username'] = email;
    send_data['otp'] = otp_str;
    VerifyOTP(send_data).then((res)=>{
      if(res?.[0]){
        localStorage.setItem("otp_val", otp_str);
        newPassRouter.push(`/new-password?email=${email}`);
      }
      else{
        toast.error("Incorrect OTP", {
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
    })

  }

  console.log(otp)

  return (
    <>
      <div className="absolute top-8 lg:left-24 left-7">
        <Link href='/'>
          <div className="font-medium text-xl cursor-pointer flex items-center gap-1">
            <Image className="w-11 h-11" src={logo} alt="logo" />
            <h1 className="font-bold text-lg ml-2">
              <span className="text-[#82D955]">Test</span>
              <span className="text-[#3AB6FF]">Sprint</span>360
            </h1>
          </div>
        </Link>
      </div>

      <div className="py-8 lg:px-24 px-7 flex justify-between items-center h-screen">


        <div className=" w-full lg:w-[45%]">

          <div className="font-bold text-2xl md:text-[30px] text-gray-950 mt-8">
            Password Reset
          </div>
          <div className="text-sm font-medium text-gray-400 mt-2">
            OTP was sent to <span className="text-gray-700 font-semibold">{email}</span>
          </div>

          <div className="mt-14">
            <div className="mb-6 text-gray-900 text-sm font-semibold">
              Enter OTP
            </div>




            <div className="mb-14">
              <div className="w-full flex justify-center space-x-5">
                {otp.map((data, i) => {
                  return <input ref={i === activeOtpIndex ? inputRef : null} className={`border-b-2 ${i === activeOtpIndex ? " border-gray-900" : ""} w-11 sm:w-16   h-16 outline-none text-center text-xl font-semibold`} type="text" key={`input-${i}`} value={data} maxLength={1} onChange={(e) => handleChange(e, i)} />
                })}
              </div>
            </div>


            <div className="w-full">
              {/* <Link href='/new-password'><button type="submit" className={`shadow-lg w-full  text-white ${sendCode ? "bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   cursor-pointer" : "bg-gray-400  focus:ring-4 focus:outline-none focus:ring-gray-300  cursor-not-allowed"}   font-medium rounded-md text-lg   px-5 py-2.5 text-center `}>Verify</button></Link> */}

              <button type="button" onClick={handleOTPVerification} className={`shadow-lg w-full  text-white ${sendCode ? "bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   cursor-pointer" : "bg-gray-400  focus:ring-4 focus:outline-none focus:ring-gray-300  cursor-not-allowed"}   font-medium rounded-md text-lg   px-5 py-2.5 text-center `}>Verify</button>
              <ToastContainer/>

              {/* <Link to='/new-password'><button type="submit" className={`shadow-lg w-full  text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   cursor-pointer font-medium rounded-md text-lg   px-5 py-2.5 text-center `}>Send Code</button></Link>  */}
            </div>




          </div>
          <hr className="mt-6 mb-3" />

          <div className="text-sm text-center text-gray-400 ">
            {`Didn’t receive the code?`} <span className="text-blue-400 cursor-pointer">Resend it</span>
          </div>
          <div className="text-center text-gray-400 mt-6">
            <Link href='/login' className="text-blue-500 flex justify-center items-center"><FontAwesomeIcon icon={faArrowAltCircleLeft} className="mr-1 max-h-4 max-w-4" /> Sign In </Link>
          </div>


        </div>

        <div className="hidden lg:block w-[45%] ">
          <Image src={Auth2} alt="" />
        </div>
      </div>



    </>
  );
}


