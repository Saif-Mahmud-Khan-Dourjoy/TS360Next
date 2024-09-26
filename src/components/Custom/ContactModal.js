// components/CustomModal.js
import React, { useEffect } from "react"
import {
  AiOutlineClose,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai"
import { TiDelete } from "react-icons/ti"
import { FaRegUser, FaMobileScreenButton } from "react-icons/fa6"
import { HiOutlineBuildingOffice2 } from "react-icons/hi2"
import { MdPeopleOutline } from "react-icons/md"
import { CiMail } from "react-icons/ci"
import { FaPencilAlt } from "react-icons/fa"

const ContactModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [isOpen])
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-11/12 max-w-xl p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 ease-out modal-enter"
        style={{ transform: "translateY(0%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
        <div className="absolute top-4 text-[#2F2F2F] font-bold text-2xl left-[50%] transform -translate-x-[50%] ">
          Contact Us
        </div>
        <div className="mt-14 px-2">
          <div className="sm:flex justify-between">
            <div>
              <div className=" flex items-center gap-2">
                <FaRegUser color="#486681" />
                <div>
                  <span className="text-[#818181] mr-2">Name</span>
                  <span className="text-red-600">*</span>
                </div>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  class=" border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                />
              </div>
            </div>
            <div className="mt-5 sm:mt-0">
              <div className=" flex items-center gap-2">
                <FaMobileScreenButton color="#486681" />
                <div>
                  <span className="text-[#818181] mr-2">Phone Number</span>
                </div>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  class=" border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                />
              </div>
            </div>
          </div>
          <div className="sm:flex justify-between mt-5">
            <div>
              <div className=" flex items-center gap-2">
                <HiOutlineBuildingOffice2 color="#486681" />
                <div>
                  <span className="text-[#818181] mr-2">Organization Name</span>
                  <span className="text-red-600">*</span>
                </div>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  class=" border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                />
              </div>
            </div>
            <div className="mt-5 sm:mt-0">
              <div className=" flex items-center gap-2">
                <MdPeopleOutline color="#486681" />
                <div>
                  <span className="text-[#818181] mr-2">
                    Number of employees
                  </span>
                  <span className="text-red-600">*</span>
                </div>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  class=" border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-5">
            <div className=" flex items-center gap-2">
              <CiMail color="#486681" />
              <div>
                <span className="text-[#818181] mr-2">Business Email</span>
                <span className="text-red-600">*</span>
              </div>
            </div>
            <div className="mt-1">
              <input
                type="text"
                id="name"
                class=" border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
              />
            </div>
          </div>

          <div className="w-full mt-5">
            <div className=" flex items-center gap-2">
              <FaPencilAlt color="#486681" />
              <div>
                <span className="text-[#818181] mr-2">Specific Needs</span>
                <span className="text-red-600">*</span>
              </div>
            </div>
            <div className="mt-1">
              <textarea
                rows="4"
                className="border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                placeholder="Write your message"
              >
                {" "}
              </textarea>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button className="bg-[#3AB6FF] hover:bg-blue-700 text-white py-[10px] px-5 rounded text-sm font-semibold">
            Submit
          </button>
        </div>
        <div className="text-center mt-5 text-[12px] text-[#A6A6A6] font-extralight">
          You agree to our{" "}
          <span className=" font-semibold underline">Terms</span> and{" "}
          <span className=" font-semibold underline">Privacy</span> Policy by
          submitting this form
        </div>
      </div>
    </div>
  )
}

export default ContactModal
