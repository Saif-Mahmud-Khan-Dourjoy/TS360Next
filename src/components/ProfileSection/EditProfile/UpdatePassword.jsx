"use client"
import React, { use, useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { FiEye, FiEyeOff } from "react-icons/fi"
import CheckOwnershipModal from "./CheckOwnershipModal"

export default function UpdatePassword({ isEditClicked }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [Confirmed, setConfirmed] = useState(false)

  return (
    <>
      {isModalOpen && (
        <CheckOwnershipModal
          setConfirmed={setConfirmed}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
      <div className="text-[#2f2f2f] text-base font-extrabold mb-6">
        UPDATE PASSWORD
      </div>
      <button
        className={`w-[200px] h-[50px] ${
          isEditClicked
            ? "bg-[#CBCACA] pointer-events-none"
            : "bg-[#3ab6ff] cursor-pointer"
        } rounded-[5px] shadow flex justify-center items-center  hover:bg-[#239ade]`}
        onClick={() => setModalOpen(true)}
      >
        <div className="text-white text-sm font-semibold flex items-center gap-2">
          <FaRegEdit size={20} />
          Set New Password
        </div>
      </button>
      {Confirmed && (
        <section>
          {/* New Password Field */}
          <div className="mt-8">
            <div className="w-full">
              <div className="text-[#808080] text-sm font-normal mb-1">
                New Password
              </div>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="w-full h-12 px-3 py-3.5 bg-white rounded-md border border-[#c4cdd5] text-sm focus:border-blue-600"
                  placeholder="********"
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <FiEye size={20} />
                  ) : (
                    <FiEyeOff size={20} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mt-8">
            <div className="w-full">
              <div className="text-[#808080] text-sm font-normal mb-1">
                Confirm Password
              </div>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="w-full h-12 px-3 py-3.5 bg-white rounded-md border border-[#c4cdd5] text-sm focus:border-blue-600"
                  placeholder="********"
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? (
                    <FiEye size={20} />
                  ) : (
                    <FiEyeOff size={20} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
