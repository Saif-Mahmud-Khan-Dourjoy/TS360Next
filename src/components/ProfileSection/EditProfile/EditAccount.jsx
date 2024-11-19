import React, { useState } from "react"
import { FiEdit2 } from "react-icons/fi"
import { RxCross2 } from "react-icons/rx"
import { IoSaveOutline } from "react-icons/io5"

export default function EditAccount({
  isEditClicked,
  handleEditClick,
  handleCancelClick,
}) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-[#2f2f2f] text-base font-extrabold">
          ACCOUNT DATA
        </div>

        {!isEditClicked && (
          <button
            className="w-[115px] h-9 bg-[#3ab6ff] rounded-[5px] shadow flex justify-center items-center cursor-pointer hover:bg-[#239ade]"
            onClick={handleEditClick}
          >
            <div className="text-white text-sm font-semibold flex items-center gap-2">
              <FiEdit2 size={16} />
              Edit
            </div>
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-5 w-full gap-5">
        <div className="flex-1">
          <div className="text-[#808080] text-sm font-normal mb-1">
            First Name
          </div>
          <input
            className={`w-full h-12 px-3 py-3.5 rounded-md border text-sm focus:border-blue-600 ${
              isEditClicked
                ? "bg-white border-[#c4cdd5] cursor-text"
                : "bg-[#f0f0f0] border-[#e0e0e0] cursor-not-allowed text-gray-500"
            }`}
            placeholder="First Name"
            disabled={!isEditClicked}
          />
        </div>
        <div className="flex-1">
          <div className="text-[#808080] text-sm font-normal mb-1">
            Last Name
          </div>
          <input
            className={`w-full h-12 px-3 py-3.5 rounded-md border text-sm focus:border-blue-600 ${
              isEditClicked
                ? "bg-white border-[#c4cdd5] cursor-text"
                : "bg-[#f0f0f0] border-[#e0e0e0] cursor-not-allowed text-gray-500"
            }`}
            placeholder="Last Name"
            disabled={!isEditClicked}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-5 w-full gap-5">
        <div className="flex-1">
          <div className="text-[#808080] text-sm font-normal mb-1">
            Organization
          </div>
          <input
            className={`w-full h-12 px-3 py-3.5 rounded-md border text-sm focus:border-blue-600 ${
              isEditClicked
                ? "bg-white border-[#c4cdd5] cursor-text"
                : "bg-[#f0f0f0] border-[#e0e0e0] cursor-not-allowed text-gray-500"
            }`}
            placeholder="Organization X"
            disabled={!isEditClicked}
          />
        </div>

        <div className="flex-1">
          <div className="text-[#808080] text-sm font-normal mb-1">Country</div>
          <select
            className={`w-full h-12 px-3 py-3.5 rounded-md border text-sm focus:border-blue-600 text-[#97999b] ${
              isEditClicked
                ? "bg-white border-[#c4cdd5] cursor-pointer"
                : "bg-[#f0f0f0] border-[#e0e0e0] cursor-not-allowed text-gray-500"
            }`}
            disabled={!isEditClicked}
          >
            <option>Ban</option>
            <option>Usa</option>
            <option>Ind</option>
            <option>Pak</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-5 w-full gap-5 flex-col md:flex-row">
        <div className="flex-1">
          <div className="text-[#808080] text-sm font-normal mb-1">Phone</div>
          <input
            className={`w-full h-12 px-3 py-3.5 rounded-md border text-sm focus:border-blue-600 ${
              isEditClicked
                ? "bg-white border-[#c4cdd5] cursor-text"
                : "bg-[#f0f0f0] border-[#e0e0e0] cursor-not-allowed text-gray-500"
            }`}
            placeholder="01674324577"
            disabled={!isEditClicked}
          />
        </div>
        <div className="flex-1"> </div>
      </div>

      {isEditClicked && (
        <div className="flex justify-end mt-10 w-full gap-5">
          <button
            className="w-[150px] h-10 bg-[#2f2f2f] rounded-[5px] shadow flex justify-center items-center cursor-pointer hover:bg-black"
            onClick={handleCancelClick}
          >
            <div className="text-white text-sm font-semibold flex items-center gap-2">
              <RxCross2 size={20} /> Cancel
            </div>
          </button>

          <button className="w-[150px] h-10 bg-[#3ab6ff] rounded-[5px] shadow flex justify-center items-center hover:bg-[#239ade]">
            <div className="text-white text-sm font-semibold flex items-center gap-2">
              <IoSaveOutline size={16} /> Save
            </div>
          </button>
        </div>
      )}
    </>
  )
}
