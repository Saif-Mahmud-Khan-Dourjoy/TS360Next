"use client"
import React, { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

const ManagePaymentModal = ({ isOpen, onClose, onOk, children }) => {
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
      style={{ zIndex: "9999" }}
      className="fixed inset-0 flex  justify-center items-center  bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:w-11/12 sm:max-w-7xl p-6 bg-white sm:rounded-lg shadow-lg transform transition-transform duration-300 ease-out modal-enter-from-top"
        style={{ transform: "translateY(0%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">{children}</div>
      </div>
    </div>
  )
}

export default ManagePaymentModal
