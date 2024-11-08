import Image from "next/image";
import React from "react";
import { FaStar, FaPencilAlt, FaTrash, FaPlusCircle } from "react-icons/fa";
import VisaCard from "../../../../public/Subscription/Visaa.png";

export default function PaymentMethod() {
  return (
    <>
      <div class="text-[#2f2f2f] text-base font-extrabold mb-6">
        EXISTING PAYMENT METHODS
      </div>
      <div className="flex gap-4">
        <div className="p-4 rounded-xl shadow-lg border border-gray-300 w-[350px]">
          {/* Left Side */}
          <div className="flex-grow">
            <Image
              src={VisaCard}
              alt="Visa Logo"
              className="w-14 h-auto mb-10"
            />

            {/* Card Number */}
            <p className="text-lg font-semibold tracking-widest text-gray-600">
              **** **** **** 7654
            </p>
            {/* Expiry and Name */}
            <div className="mt-1 mb-2 text-gray-500">
              <p className="text-base">
                <span className="font-semibold">06/25</span> | David Fernando
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex flex-col  space-y-2">
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white hover:bg-gray-800">
            <FaStar />
          </button>
          <button className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100">
            <FaPencilAlt />
          </button>
          <button className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100">
            <FaTrash />
          </button>
        </div>
      </div>

      <button className="flex items-center gap-2 justify-center w-[350px] py-3 mt-12 text-white bg-[#3AB6FF] rounded-lg hover:bg-[#239ade] ">
        <FaPlusCircle />
        Add payment method
      </button>
    </>
  );
}
