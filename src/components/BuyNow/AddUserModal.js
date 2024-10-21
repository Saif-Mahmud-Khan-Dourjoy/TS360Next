"use client"
import React, { useEffect, useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa6"

const AddUserModal = ({
  isOpen,
  onClose,
  onOk,
  onCancel,
  setTotalUser,
  totalUser,
  selectedCycle,
}) => {
  const [user, setUser] = useState(1)
  const [total, setTotal] = useState(0)
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

  useEffect(() => {
    let total = selectedCycle?.price * user
    setTotal(total)
  }, [user])

  const AddUser = (number) => {
    if (user + number > 0) {
      setUser(user + number)
    }
  }
  const finalAdd = () => {
    const newList = Array.from({ length: user - 1 }, (item, index) => ({
      id: "",
      email: "",
    }))

    setTotalUser([...totalUser, ...newList])

    onClose()
  }
  if (!isOpen) return null

  return (
    <div
      style={{ zIndex: "9999" }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-11/12 max-w-md p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 ease-out modal-enter"
        style={{ transform: "translateY(0%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button> */}
        <div className="text-center text-lg font-semibold text-[#2F2F2F]">
          Add Users to this Plan
        </div>
        <div className="mt-10 flex gap-3 items-center">
          <div className="text-[#A6A6A6] font-semibold text-sm">
            Number of Users:
          </div>
          <div className="flex gap-2 items-center">
            <div
              className="cursor-pointer hover:bg-[#3AB6FF] group hover:rounded-full p-2"
              onClick={() => AddUser(-1)}
            >
              <FaMinus className="group-hover:text-white" />
            </div>
            <input
              type="number"
              value={user}
              name="user"
              onChange={(e) => setUser(e.target.value)}
              className="bg-[#F6F6F6]  max-w-[100px]  px-2 py-1"
            />
            <div
              className="cursor-pointer hover:bg-[#3AB6FF] group hover:rounded-full p-2"
              onClick={() => AddUser(1)}
            >
              <FaPlus className="group-hover:text-white" />
            </div>
          </div>
        </div>
        <div className="text-[#A6A6A6] font-semibold text-sm mt-5 w-fit h-fit">
          In Current Plan:
        </div>
        {Object.keys(selectedCycle).length > 0 && (
          <div className="mt-5 flex justify-center gap-3">
            <div className="text-[#818181] text-sm lg:text-xl font-semibold">
              ${selectedCycle?.price}
            </div>
            <div className="text-[#818181] text-sm lg:text-xl font-semibold">
              x
            </div>
            <div className="text-[#818181] text-sm lg:text-xl font-semibold">
              {user} users
            </div>
            <div className="text-[#818181] text-sm lg:text-xl font-semibold">
              x
            </div>
            <div className="text-[#818181] text-sm lg:text-xl font-semibold">
              1{" "}
              {selectedCycle?.frequencyInterval
                ?.slice(0, -2)
                .toLowerCase()
                .replace(/^./, (char) => char.toUpperCase())}
            </div>
            <div className="text-[#818181] text-sm lg:text-xl font-semibold">
              =
            </div>
            <div className="text-[#2F2F2F] text-sm lg:text-2xl font-semibold">
              ${total}
            </div>
          </div>
        )}

        <div className="flex justify-center space-x-4 mt-10">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-white bg-black rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={finalAdd}
            className="px-4 py-2 text-white  bg-[#3AB6FF] rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddUserModal
