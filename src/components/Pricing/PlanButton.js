"use client"
import React, { useState } from "react"
import ContactModal from "../Custom/ContactModal"

export default function PlanButton({ plan }) {
  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <>
      <ContactModal
       
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      {plan?.isRecommended && (
        <div className=" absolute left-0 bottom-14  w-full flex justify-center items-center ">
          <div className="cursor-pointer text-lg font-medium py-2 px-6 bg-[#3AB6FF] text-white rounded-md hover:bg-[#40a5df]">
            Buy Now
          </div>
        </div>
      )}

      {plan?.startingPrice == null && (
        <div className=" absolute left-0 bottom-14  w-full flex justify-center items-center ">
          <div
            onClick={() => setModalOpen(true)}
            className="cursor-pointer text-lg font-medium py-2 px-6 bg-white outline outline-1 outline-[#3AB6FF] text-[#3AB6FF] rounded-md hover:bg-[#3AB6FF] hover:text-white"
          >
            Contact
          </div>
        </div>
      )}

      {!plan?.isRecommended && plan?.startingPrice != null && (
        <div className=" absolute left-0 bottom-14  w-full flex justify-center items-center ">
          <div className="cursor-pointer text-lg font-medium py-2 px-6 bg-white outline outline-1 outline-[#3AB6FF] text-[#3AB6FF] rounded-md hover:bg-[#3AB6FF] hover:text-white">
            Buy Now
          </div>
        </div>
      )}

      {plan?.startingPrice == 0 && (
        <div className=" absolute left-0 bottom-14  w-full flex justify-center items-center ">
          <div className="cursor-pointer text-lg font-medium py-2 px-6 bg-white outline outline-1 outline-[#3AB6FF] text-[#3AB6FF] rounded-md hover:bg-[#3AB6FF] hover:text-white">
            Start Trial
          </div>
        </div>
      )}
    </>
  )
}
