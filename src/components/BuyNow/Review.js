import React from "react"
import visa from "../../../public/Subscription/visa.png"
import Image from "next/image"
export default function Review({
  setCurrentStep,
  currentStep,

}) {
  return (
    <>
      <div className="text-xl font-semibold ">Review and Confirm</div>
      <div className="border-b-2 mt-2"></div>
      <div className="mt-5 text-[#818181] font-bold">Users</div>
      <div className="flex flex-wrap justify-between items-center mt-5">
        <div className="">
          <div className="flex gap-3">
            <div className="text-[#2F2F2F] font-semibold text-sm">
              Account Owner:
            </div>
            <div className="flex gap-1">
              <div className="text-[#818181] font-semibold text-sm">
                John Smith
              </div>
              <div className="text-[#818181] font-semibold text-sm break-all">
                (john_smith@gmail.com)
              </div>
            </div>
          </div>
          <div className="mt-3 flex gap-3 text-sm">
            <div className="text-[#2F2F2F]  font-semibold">
              Total Number of Users:
            </div>
            <div className="text-[#818181]  font-semibold">03</div>
          </div>
        </div>
        <div
          onClick={() => setCurrentStep(0)}
          className="border rounded-md text-[#CBCACA] font-semibold px-5 py-2 cursor-pointer"
        >
          Edit
        </div>
      </div>
      <div className="border-b mt-5"></div>
      <div className="text-[#818181] font-bold mt-5 ">Payment</div>
      <div className="flex flex-wrap justify-between items-center">
        <div className="mt-3">
          <div className="flex gap-3 items-center">
            <div className="text-[#2F2F2F] font-semibold text-sm">
              Card Number:
            </div>
            <div className="flex gap-3 border p-2 rounded-md">
              <div className=" rounded-md  text-sm text-[#818181]">
                <div>**** **** **** 7765</div>
              </div>
              <div className="border-r"></div>
              <div>
                <Image src={visa} alt="visa_logo" className="" />
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => setCurrentStep(1)}
          className="border rounded-md text-[#CBCACA] font-semibold px-5 py-2 cursor-pointer"
        >
          Edit
        </div>
      </div>
      <div className="border-b mt-5"></div>
      <div className="mt-5 text-sm">
        <div className="flex gap-3">
          <div className="text-[#2F2F2F] font-semibold">Plan Start Date:</div>
          <div className="text-[#818181] font-bold">28/08/2024</div>
        </div>
        <div className="flex flex-wrap gap-10 mt-3">
          <div className="flex gap-3">
            <div className="text-[#2F2F2F] font-semibold">Plan End Date:</div>
            <div className="text-[#818181] font-bold">28/09/2024</div>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" />
            <span className="text-[#2F2F2F]">
              Renew subscription automatically
            </span>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex gap-2">
            <input type="checkbox" />
            <span className="text-[#2F2F2F]">Send invoice through email</span>
          </div>
        </div>
      </div>
      <div className=" mt-10 w-full py-3 text-center text-white font-semibold bg-[#CBCACA] rounded-md shadow-2xl">
        Confirm
      </div>
    </>
  )
}
