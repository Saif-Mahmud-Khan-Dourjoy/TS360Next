
"use client"
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

import { FaLocationDot,FaClock  } from "react-icons/fa6";

import Link from "next/link";

export default function Career() {
    useEffect(()=>{
        AOS.init({
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 2000, // values from 0 to 3000, with step 50ms
            easing: 'ease',
          });
    },[])
  return (
    <div className=" mt-40 md:mt-44 lg:px-24 px-7 overflow-hidden">
      <div className="flex  items-center flex-col">

        <div className="flex gap-x-2 md:flex-row flex-col gap-y-2" data-aos="flip-left">
          <div className="text-center"><span className="text-sky-400 text-3xl sm:text-4xl md:text-5xl font-bold mb-0">Automate</span> </div>
          <div className="text-center"> <span className="text-zinc-800 text-3xl sm:text-4xl md:text-5xl font-bold "> your Career Path</span></div>
        </div>

        <div data-aos="flip-right" className=" w-full md:w-[80%] xl:w-1/2 mt-6 text-center text-slate-600 text-lg md:text-[22px] font-normal ">{`We're passionate about making testing accessible. Help us empower everyone with the power of automation.`}</div>
       
        </div>

        <div className="my-20">
        
          <div className="border-2 sm:p-8 px-4 py-4  rounded-lg border-[#2F2F2F] bg-[#F6F6F6]" data-aos="zoom-in">
            <div className="text-black text-2xl font-bold  leading-snug">JavaScript Developer</div>
            <div className="text-black text-lg font-medium leading-snug my-8">We are looking for an experienced Javascript developer to join our team.</div>
            <div className="flex justify-between sm:flex-row flex-col">
              <div className="flex gap-x-4">
                  <div className="bg-[#486681] h-fit px-3 sm:px-6 py-2 rounded-full text-white shadow-2xl hover:bg-[#426d94] cursor-pointer flex items-center">
                  <FaLocationDot className="mr-2" />
                 Remote
                  
                  </div>
                  <div className="bg-[#486681] h-fit px-3 sm:px-6 py-2 rounded-full text-white shadow-2xl hover:bg-[#426d94] cursor-pointer flex items-center">
                  <FaClock className="mr-2" />
                 Full-time
                  
                  </div>
              </div>
              <div >
                <Link href='career/1'>
                <div className="bg-[#6EC740] px-10 py-2 rounded-xl text-white shadow-2xl hover:bg-[#7be745] cursor-pointer sm:mt-0 mt-8 w-fit mx-auto sm:mx-0">
                  
              View Job
              </div>
              </Link>
              </div>
            </div>
          </div>
   
        </div>


      
    </div>
  )
}
