import React from "react"
import { FiEdit2 } from "react-icons/fi"
import { RxCross2 } from "react-icons/rx"
import { IoSaveOutline } from "react-icons/io5"

export default function EditAccount() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div class="text-[#2f2f2f] text-base font-extrabold">ACCOUNT DATA</div>

        <div class="w-[115px] h-9 bg-[#3ab6ff] rounded-[5px] shadow flex justify-center items-center cursor-pointer">
          <div class=" text-white text-sm font-semibold flex items-center gap-2">
            <FiEdit2 size={16} />
            Edit
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-5 w-full gap-5">
        <div className="flex-1">
          <div class="text-[#808080] text-sm font-normal mb-1">First Name</div>
          <input
            class="w-full h-12 px-3 py-3.5 bg-white rounded-md border border-[#c4cdd5] text-sm focus:border-blue-600"
            placeholder="First Name"
          ></input>
        </div>
        <div className="flex-1">
          <div class="text-[#808080] text-sm font-normal mb-1">Last Name</div>
          <input
            class="w-full h-12 px-3 py-3.5 bg-white rounded-md border border-[#c4cdd5] text-sm focus:border-blue-600"
            placeholder="Last Name"
          ></input>
        </div>
      </div>
      <div className="flex justify-between mt-5 w-full gap-5">
        <div className="flex-1">
          <div class="text-[#808080] text-sm font-normal mb-1">
            Organization
          </div>
          <input
            class="w-full h-12 px-3 py-3.5 bg-white rounded-md border border-[#c4cdd5] text-sm focus:border-blue-600"
            placeholder="Organization X"
          ></input>
        </div>
        <div className="flex-1">
          <div class="text-[#808080] text-sm font-normal mb-1">Country</div>
          <select className="w-full h-12 px-3 py-3.5 bg-white rounded-md border border-[#c4cdd5] text-sm focus:border-blue-600 text-[#97999b]">
            <option>Ban</option>
            <option>Usa</option>
            <option>Ind</option>
            <option>Pak</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between mt-5 w-full gap-5">
        <div className="flex-1">
          <div class="text-[#808080] text-sm font-normal mb-1">Phone</div>
          <input
            class="w-full h-12 px-3 py-3.5 bg-white rounded-md border border-[#c4cdd5] text-sm focus:border-blue-600"
            placeholder="01674324577"
          ></input>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="flex justify-end mt-5 w-full gap-5">
        <div class="w-[150px] h-10 bg-[#2f2f2f] rounded-[5px] shadow flex justify-center items-center cursor-pointer">
          <div class=" text-white text-sm font-semibold flex items-center gap-2">
            <RxCross2 size={20} /> Cancle
          </div>
        </div>
        <div class="w-[150px] h-10 bg-[#3ab6ff] rounded-[5px] shadow flex justify-center items-center">
          <div class=" text-white text-sm font-semibold flex items-center gap-2">
            <IoSaveOutline size={16} /> Save
          </div>
        </div>
      </div>
    </>
  )
}
