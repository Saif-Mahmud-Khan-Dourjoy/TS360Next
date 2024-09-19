// components/CustomModal.js
import React, { useEffect } from "react"
import {
  AiOutlineClose,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai"
import { TiDelete } from "react-icons/ti"

const CustomModal = ({ isOpen, onClose, type, message, onOk, onCancel }) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-11/12 max-w-md p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 ease-out modal-enter"
        style={{ transform: "translateY(0%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="flex flex-col items-center space-y-4">
          {type === "success" && (
            <AiOutlineCheckCircle size={48} className="text-green-500" />
          )}
          {type === "error" && (
            <AiOutlineExclamationCircle size={48} className="text-red-500" />
          )}
          {type === "delete" && <TiDelete size={48} className="text-red-500" />}
          <p className="text-center text-lg font-medium text-gray-700">
            {message}
          </p>
          <div className="flex space-x-4">
            {type === "success" ||
              (type === "delete" && (
                <button
                  onClick={onOk}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-green-300"
                >
                  Ok
                </button>
              ))}
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
            >
              {type === "error" ? "Ok" : "Cancel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomModal
