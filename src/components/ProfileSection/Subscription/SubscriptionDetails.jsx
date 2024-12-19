import {
  AddNewUsers,
  CancelSubs,
  GetSubscription,
  ResendEmail,
  UnassignUser,
} from "@/API/User/Subscription/ProfileSubscription"
import { showErrorAlert, showSuccessAlert } from "@/components/Alerts/Alert"
import ComponentLoader from "@/components/Custom/ComponentLoader"
import useProfile from "@/hook"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { useEffect, useRef, useState } from "react"
import Avatar from "react-avatar"
import { FaUser, FaUserMinus, FaUserPlus } from "react-icons/fa"
import { FaRegEnvelope } from "react-icons/fa6"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { IoArrowUp } from "react-icons/io5"

const SubscriptionDetails = () => {
  const [subscription, setSubscription] = useState(null)
  const [teams, setTeams] = useState([])
  const [reload, setReload] = useState(false)
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(null)

  const { profile } = useProfile()

  const tooltipRef = useRef()

  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    GetSubscription(session?.user?.id, session?.accessToken).then((res) => {
      setLoading(false)
      if (res?.[0]) {
        setSubscription(res?.[0]);

        const sortedUserList = res?.[0]?.teams?.sort((a, b) => {
          if (a.id === session?.user?.id) return -1 
          if (b.id === session?.user?.id) return 1
          return 0 
        })
        setTeams(sortedUserList)
      } else {
        setSubscription(null)
        // showErrorAlert("You have no subscription", "center", 2000)
      }
    })
  }, [reload])

  // useEffect(() => {

  //   const handleClickOutside = (event) => {
  //     if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
  //       setTooltipOpen(null)
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside)
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside)
  //   }
  // }, [])

  const openTooltip = (id) => {
    if (tooltipOpen == id) {
      setTooltipOpen(null)
    } else {
      setTooltipOpen(id)
    }
  }

  console.log(subscription)
  console.log(profile)

  const updateSubscription = () => {
    router.push("/subscription-update")
  }
  const cancelSubs = () => {
    setLoading(true)
    CancelSubs(subscription?.id, session?.accessToken).then((res) => {
      setLoading(false)
      
      if (res?.[0]) {
        setReload(!reload)
      } else {
        showErrorAlert(res?.[1], "center", 2000)
      }
    })
  }

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .test(
          "domain-check",
          `Must end with ${session?.user?.userName?.split("@")[1]}`,
          (value) => {
            return value?.endsWith(`${session?.user?.userName?.split("@")[1]}`)
          }
        )
        .email("Invalid email"),
    }),
    onSubmit: (values) => {
      setLoading(true)
      AddUser(values)
    },
  })

  const AddUser = (values) => {
    AddNewUsers(
      subscription?.id,
      [`${values?.email}`],
      session?.accessToken
    ).then((res) => {
      setLoading(false)
      if (res?.[0]) {
        resetForm()
        setReload(!reload)
        showSuccessAlert("Successfully Added", "center", 2000)
        setTooltipOpen(null)
      } else {
        showErrorAlert(res?.[1], "center", 2000)
      }
    })
  }
  const UnAssign = (userId) => {
    setLoading(true)
    UnassignUser(subscription?.id, userId, session?.accessToken).then((res) => {
      setLoading(false)
      if (res?.[0]) {
        setReload(!reload)
        showSuccessAlert("Successfully Unassigned", "center", 2000)
        setTooltipOpen(null)
      } else {
        showErrorAlert(res?.[1], "center", 2000)
      }
    })
  }

  const Resend = (userId) => {
    setLoading(true)
    ResendEmail(subscription?.id, userId, session?.accessToken).then((res) => {
      setLoading(false)
      if (res?.[0]) {
        setReload(!reload)
        showSuccessAlert("Successfully Resend Email", "center", 2000)
        setTooltipOpen(null)
      } else {
        showErrorAlert(res?.[1], "center", 2000)
      }
    })
  }

  console.log(subscription)
  return (
    <>
      {loading && <ComponentLoader />}
      {subscription ? (
        <div className="flex justify-center">
          <div className="bg-white w-full flex flex-col lg:flex-row gap-6">
            {/* Left Column - Current Plan Details */}
            <section className="flex-1">
              <h2 className="text-[#2f2f2f] text-base font-extrabold mt-2 mb-6">
                CURRENT PLAN DETAILS
              </h2>
              <div className="text-sm text-[#A6A6A6] space-y-2">
                <p>
                  Plan Type:
                  <span className="text-black ml-2">
                    {subscription?.plan?.name}
                  </span>
                </p>
                <p>
                  Subscription Type:
                  <span className="text-black ml-2">
                    {subscription?.planFrequency?.frequencyInterval}
                  </span>
                  {profile?.user?.pgCustomerId === subscription?.pgCustomerId &&
                    subscription?.plan?.name.toLowerCase() != "free" && (
                      <span
                        className="text-blue-600 ml-2 pointer-events-none underline"
                        onClick={() => updateSubscription()}
                      >
                        Change
                      </span>
                    )}
                </p>
                <p>
                  Next Billing Date:
                  <span className="text-black ml-2">August 20, 2024</span>
                </p>
                <p>
                  Price:
                  <span className="text-black ml-2">
                    {" "}
                    ${subscription?.planFrequency?.price}/user/
                    {subscription?.planFrequency?.frequencyInterval
                      .slice(0, -2)
                      .toLowerCase()}
                  </span>
                </p>
                <p>
                  Number of Users:
                  <span className="text-black ml-2">
                    {" "}
                    {subscription?.teams?.length}
                  </span>
                  {profile?.user?.pgCustomerId === subscription?.pgCustomerId &&
                    subscription?.plan?.name.toLowerCase() != "free" && (
                      <span
                        className="text-blue-600 ml-2 pointer-events-none underline"
                        onClick={() => updateSubscription()}
                      >
                        Add
                      </span>
                    )}
                </p>
                <p>
                  Auto Renew:
                  <span className="text-black ml-2">
                    {subscription?.autoRenewal ? "Yes" : "No"}
                  </span>
                </p>
              </div>
              {profile?.user?.pgCustomerId === subscription?.pgCustomerId &&
                subscription?.plan?.name.toLowerCase() != "free" && (
                  <div
                    className="text-[#FF5656] text-sm underline mt-20 cursor-pointer"
                    onClick={() => cancelSubs()}
                  >
                    Cancel Subscription
                  </div>
                )}

              {subscription?.plan?.name.toLowerCase() == "free" && (
                <div className="w-fit text-white text-sm mt-20 flex items-center gap-3 py-2 px-4 bg-[#3AB6FF] rounded-md shadow-2xl">
                  <span>
                    <IoArrowUp color="white" />
                  </span>
                  <span className="pointer-events-none">Upgrade Plan</span>
                </div>
              )}
            </section>

            {/* Right Column - User Management */}
            <section className="flex-auto mb-20">
              <h2 className="text-[#2f2f2f] text-base font-extrabold mt-2 mb-6">
                USER MANAGEMENT
              </h2>
              <div className="flex justify-evenly rounded-lg items-center bg-blue-50 py-4 mb-6">
                <div className="flex flex-col items-center">
                  <FaUser className="text-gray-500" size={22} />
                  <p className="text-gray-500 text-base">Users Limit</p>
                  <p className="text-xl font-semibold">
                    {subscription?.numberOfUsers}
                  </p>
                </div>
                <div className="border-l h-12 border-gray-300"></div>
                <div className="flex flex-col items-center">
                  <FaUserPlus className="text-gray-500" size={24} />
                  <p className="text-gray-500 text-base">Joined</p>
                  <p className="text-xl font-semibold">
                    {subscription?.teams?.length}
                  </p>
                </div>
                <div className="border-l h-12 border-gray-300"></div>
                <div className="flex flex-col items-center">
                  <FaUserMinus className="text-gray-500" size={24} />
                  <p className="text-gray-500 text-base">Free</p>
                  <p className="text-xl font-semibold">
                    {subscription?.numberOfUsers - subscription?.teams?.length}
                  </p>
                </div>
              </div>
              <section className="space-y-3">
                {/* Users List */}
                {teams?.map((member) => {
                  console.log(member)
                  let position
                  if (subscription?.pgCustomerId === member?.pgCustomerId) {
                    position = "Owner"
                  } else {
                    if (member?.active) {
                      position = "Team Member"
                    } else {
                      position = "Invite Sent"
                    }
                  }

                  return (
                    <div
                      className="flex items-center justify-between gap-x-4"
                      key={member?.id}
                    >
                      <div className="flex items-center">
                        {/* <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
                      JS
                    </div> */}
                        {member?.active ? (
                          <Avatar
                            size="33"
                            round={true}
                            name={`${member?.firstName} ${member?.lastName}`}
                            color="#3b82f6"
                            fgColor="white"
                            className="font-bold"
                          />
                        ) : (
                          <div className="border-2 border-dashed border-gray-400 text-gray-400 rounded-full h-8 w-8 flex items-center justify-center font-bold">
                            <FaUser />
                          </div>
                        )}

                        <span className="ml-3 text-gray-700 text-xs">
                          {member?.username}
                        </span>
                      </div>
                      <div className="flex gap-x-4 items-center ">
                        <span
                          className={`text-xs ${
                            member?.active ? "text-gray-500" : "text-[#82D955]"
                          }  `}
                        >
                          {position}
                        </span>
                        <div
                          className={`relative ${
                            profile?.user?.pgCustomerId ===
                              subscription?.pgCustomerId &&
                            subscription?.plan?.name.toLowerCase() != "free"
                              ? ""
                              : "invisible"
                          }`}
                        >
                          <HiOutlineDotsVertical
                            className={`cursor-pointer ${
                              profile?.user?.pgCustomerId ===
                              member?.pgCustomerId
                                ? "invisible"
                                : ""
                            } `}
                            onClick={() => openTooltip(member?.id)}
                          />

                          {tooltipOpen && tooltipOpen == member?.id && (
                            <div
                              ref={tooltipRef}
                              className="z-[9999] absolute left-1/2 top-[150%]  transform -translate-x-1/2  px-5 py-4 text-sm bg-white rounded-md text-center"
                              style={{
                                boxShadow:
                                  "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                              }}
                            >
                              <p
                                className="text-[#FF5656] text-xs cursor-pointer"
                                onClick={() => UnAssign(member?.id)}
                              >
                                Unassign
                              </p>
                              {!member?.active && (
                                <p
                                  className="text-[#3AB6FF] text-xs text-nowrap mt-2 cursor-pointer"
                                  onClick={() => Resend(member?.id)}
                                >
                                  Resend Invite
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </section>
              {profile?.user?.pgCustomerId === subscription?.pgCustomerId &&
                subscription?.numberOfUsers - subscription?.teams?.length > 0 &&
                subscription?.plan?.name.toLowerCase() != "free" && (
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between gap-4 mt-7">
                        <div
                          className={`relative flex items-center border border-gray-300 rounded-lg p-2 w-full`}
                        >
                          <FaRegEnvelope color="#A6A6A6" />
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder="email@company.com"
                            className="flex-grow px-3 py-1 focus:outline-none text-sm"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="email"
                            value={values?.email}
                          />
                        </div>
                        <button
                          type="submit"
                          className="shadow-xl rounded-md bg-[#3AB6FF] font-semibold text-sm text-white py-2 px-5 w-fit text-nowrap flex justify-center items-center"
                        >
                          Send Invite
                        </button>
                      </div>
                      <p className="text-red-500 text-[12px] mt-1">
                        {touched?.email && errors?.email}
                      </p>
                    </form>
                  </>
                )}
              {profile?.user?.pgCustomerId != subscription?.pgCustomerId &&
                subscription?.plan?.name.toLowerCase() != "free" && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => UnAssign(profile?.user?.id)}
                      className="mt-8 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-[10px] px-8 rounded-md cursor-pointer"
                    >
                      Leave Plan
                    </button>
                  </div>
                )}

              {profile?.user?.pgCustomerId === subscription?.pgCustomerId &&
                subscription?.plan?.name.toLowerCase() == "free" && (
                  <div
                    className="text-[#FF5656] text-sm underline mt-20 cursor-pointer text-end"
                    onClick={() => cancelSubs()}
                  >
                    Cancel Subscription
                  </div>
                )}
            </section>
          </div>
        </div>
      ) : (
        <div className="text-red-500 text-center font-bold">
          You have no subscription
        </div>
      )}
    </>
  )
}

export default SubscriptionDetails
