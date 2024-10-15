"use client"
import React, { useEffect, useRef, useState } from "react"
import Avatar from "react-avatar"
import { FaRegEnvelope } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { CiCirclePlus } from "react-icons/ci"
import { BsFillInfoCircleFill } from "react-icons/bs"
import AddUserModal from "./AddUserModal"
import { SameOrgSuggestion } from "@/API/User/Subscription/contact"
import { useSession } from "next-auth/react"

export default function UserSection({
  totalUser,
  setTotalUser,
  currentStep,
  selectedCycle,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [suggestionIndex, setSuggestionIndex] = useState(null) // Track the index of open suggestion
  const containerSuggestionRefs = useRef([]) // Create an array of refs for each suggestion container
  const [suggestionEmp, setSuggestionEmp] = useState([])
  const [filteredEmp, setFilteredEmp] = useState([])
  const { data: session } = useSession()

  // Handle click outside to close the suggestion
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionIndex !== null) {
        const ref = containerSuggestionRefs.current[suggestionIndex]
        if (ref && !ref.contains(event.target)) {
          setSuggestionIndex(null) // Close suggestion if clicked outside
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [suggestionIndex])

  useEffect(() => {
    console.log(session?.user?.id)
    SameOrgSuggestion(session?.user?.id, session?.accessToken).then((res) => {
      if (res?.[0]) {
        console.log(res?.[0])
        setSuggestionEmp(res?.[0])
        setFilteredEmp(res?.[0])
      }
    })
  }, [])

  useEffect(() => {
    const filteredEmpNew = suggestionEmp.filter(
      (fItem) =>
        !totalUser.some(
          (tItem) => tItem.id === fItem.id || tItem.email === fItem.email
        )
    )
    setFilteredEmp(filteredEmpNew)
  }, [totalUser, currentStep])

  const handleInputChange = (e, i) => {
    const newEmail = e.target.value
    setFieldValue(`users[${i}].email`, newEmail)
    const updatedUsers = [...totalUser]
    updatedUsers[i] = { ...updatedUsers[i], email: newEmail }
    setTotalUser(updatedUsers)
  }

  const handleOk = () => {
    setModalOpen(false)
  }

  const handleCancel = () => {
    setModalOpen(false)
  }

  const AddUser = () => {
    const userObj = { id: "", email: "" }
    setTotalUser([...totalUser, userObj])
    setFieldValue("users", [...totalUser, userObj])
  }

  const DeleteUser = (i) => {
    const updatedUsers = [...totalUser]
    updatedUsers.splice(i, 1)
    setTotalUser(updatedUsers)
    setFieldValue("users", updatedUsers)
  }

  const OpenSuggestion = (index) => {
    setSuggestionIndex(suggestionIndex === index ? null : index) // Toggle suggestion box for the clicked index
  }

  const setInputData = (data, i) => {
    const updatedUsers = [...totalUser]
    updatedUsers[i] = data
    setTotalUser(updatedUsers)
    setFieldValue(`users[${i}]`, data)
    setSuggestionIndex(null)
  }

  return (
    <>
      {isModalOpen && (
        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onOk={handleOk}
          onCancel={handleCancel}
          setTotalUser={setTotalUser}
          totalUser={totalUser}
          selectedCycle={selectedCycle}
        />
      )}
      <div className="text-xl font-semibold ">Number of users</div>
      <div className="border-b-2 mt-2"></div>
      <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%]">
        <div className="flex justify-between items-center gap-2 mt-4">
          <div className="flex gap-3 items-center">
            <div className="font-semibold text-[#818181]">1.</div>
            <div className="flex gap-2 items-center">
              <Avatar
                size="35"
                round={true}
                name={session?.user?.fullName}
                color="#3AB6FF"
                fgColor="white"
                className="font-bold"
              />
              <div>
                <div className="font-medium">{session?.user?.fullName}</div>
                <div className="text-xs text-[#818181] break-all">
                  {session?.user?.userName}
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs text-[#818181] font-semibold">Owner</div>
        </div>

        <div className="mt-4 border-b"></div>
        <div className="text-xs text-[#A6A6A6] mt-4">
          Enter email addresses for your users now, or add them later in your
          profile.
        </div>

        <div className="mt-5 w-full">
          {totalUser?.slice(1).map((user, index) => (
            <div key={`user-${index}`} className="[&:not(:first-child)]:mt-5">
              <div className="flex items-center gap-3">
                <div className="font-semibold text-[#818181]">{index + 2}.</div>
                <div
                  ref={(el) => (containerSuggestionRefs.current[index] = el)} // Assign ref for each suggestion container
                  className={`relative flex items-center border ${
                    errors?.users?.[index + 1]?.email &&
                    touched?.users?.[index + 1]?.email
                      ? "border-red-700"
                      : "border-gray-300"
                  }   rounded-lg p-2 w-full`}
                >
                  <FaRegEnvelope color="#A6A6A6" />
                  <input
                    autoComplete="off"
                    onClick={() => OpenSuggestion(index)}
                    type="text"
                    placeholder="email@company.com"
                    value={user?.email}
                    onBlur={handleBlur}   
                    name={`users[${index + 1}].email`}
                    onChange={(e) => handleInputChange(e, index + 1)}
                    className="flex-grow px-3 py-1 focus:outline-none text-sm"
                  />

                  {filteredEmp?.length > 0 && (
                    <div
                      className={`border absolute left-0 top-[110%] w-full transition-all duration-300 bg-white rounded-md shadow-md p-2 z-50 ${
                        suggestionIndex === index
                          ? "visible opacity-100"
                          : "invisible opacity-0"
                      }`}
                    >
                      {/* Suggestion content */}
                      {filteredEmp?.map((emp, ind) => (
                        <div
                          key={`sugg_emp-${ind}`}
                          className="p-2 cursor-pointer border-b break-all"
                          onClick={() =>
                            setInputData(
                              { id: emp?.id, email: emp?.email },
                              index + 1
                            )
                          }
                        >
                          {ind + 1}. {emp?.email}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <RiDeleteBin6Line
                    color="red"
                    className="cursor-pointer"
                    onClick={() => DeleteUser(index + 1)}
                  />
                </div>
              </div>
              {errors?.users?.[index + 1]?.email &&
                touched?.users?.[index + 1]?.email && (
                  <div className="text-red-500 text-xs mt-1 ml-6">
                    {errors.users[index + 1].email}
                  </div>
                )}
            </div>
          ))}

          {typeof errors?.users !== "object" && errors?.users?.length > 0 && (
            <div className="text-red-500 text-xs mt-2 ml-6">{errors.users}</div>
          )}
        </div>

        <div className="mt-8 ml-5 sm:ml-0">
          <div
            onClick={totalUser.length > 1 ? AddUser : () => setModalOpen(true)}
            className="rounded-md text-white flex items-center gap-3 px-5 py-2 bg-[#486681] w-fit shadow-2xl cursor-pointer"
          >
            <CiCirclePlus size={24} /> Add more users
          </div>
        </div>

        <div className="mt-4 border-b"></div>
        <div className="mt-5 flex gap-2">
          <BsFillInfoCircleFill color="#3AB6FF" />
          <span className="text-xs text-[#A6A6A6]">
            An invite link will be sent to these emails. You can only invite
            users from your organization.
          </span>
        </div>
      </div>
    </>
  )
}
