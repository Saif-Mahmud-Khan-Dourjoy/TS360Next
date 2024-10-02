import React from "react"

const LoaderModal = ({ isOpen }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: "9999" }}
    >
      <div className="relative w-1/3 max-w-sm p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 ease-out modal-enter">
        <div className="flex justify-center">
          <div className="w-16 h-16 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
        </div>
        <div className="mt-8 text-teal-500 text-lg flex justify-center text-center">
          Your Request is being processing
        </div>
      </div>
    </div>
  )
}

export default LoaderModal
