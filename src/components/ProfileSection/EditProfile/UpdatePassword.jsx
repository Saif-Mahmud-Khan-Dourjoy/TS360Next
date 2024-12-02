"use client"
import React, { use, useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { FiEye, FiEyeOff } from "react-icons/fi"
import CheckOwnershipModal from "./CheckOwnershipModal"
import { IoSaveOutline } from "react-icons/io5"
import { useFormik } from "formik"
import * as Yup from "yup"
import { UpdateCurrentPassword } from "@/API/User/Profile/Profile"
import { useSession } from "next-auth/react"
import { showErrorAlert, showSuccessAlert } from "@/components/Alerts/Alert"
import useProfile from "@/hook"

export default function UpdatePassword({ isEditClicked }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const { data: session } = useSession()
  const { isUpdate, setIsUpdate } = useProfile()

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(10, "Password must be at least 10 characters")
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&])/,
          "Password must have 1 uppercase, 1 lowercase, 1 number and 1 of !,@,#,$,&"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      let obj = {
        password: values?.password,
      }
      UpdateCurrentPassword(session?.user?.id, session?.accessToken, obj).then(
        (res) => {
          if (res?.[0]) {
            showSuccessAlert("Password updated successfully", "center", 2000)
            setConfirmed(false)
            setIsUpdate(!isUpdate)
          } else {
            showErrorAlert(res?.[1], "center", 2000)
          }
        }
      )
    },
  })

  return (
    <>
      {isModalOpen && !confirmed && (
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
          isEditClicked || confirmed
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
      {confirmed && !isEditClicked && (
        <>
          <form onSubmit={handleSubmit}>
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
                      className={`w-full h-12 px-3 py-3.5 bg-white rounded-md border ${
                        touched?.password && errors?.password
                          ? "border-red-700"
                          : "border-[#c4cdd5]"
                      }  text-sm focus:border-blue-600`}
                      placeholder="********"
                      value={values?.password}
                      onChange={(e) => {
                        setValues({ ...values, password: e.target.value })
                      }}
                      onBlur={handleBlur}
                      name="password"
                      id="password"
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
                    <p className="text-red-500 text-[12px] mt-1">
                      {touched?.password && errors.password}
                    </p>
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
                      className={`w-full h-12 px-3 py-3.5 bg-white rounded-md border ${
                        touched?.confirmPassword && errors?.confirmPassword
                          ? "border-red-700"
                          : "border-[#c4cdd5]"
                      }  text-sm focus:border-blue-600`}
                      placeholder="********"
                      value={values?.confirmPassword}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          confirmPassword: e.target.value,
                        })
                      }}
                      onBlur={handleBlur}
                      name="confirmPassword"
                      id="confirmPassword"
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
                    <p className="text-red-500 text-[12px] mt-1">
                      {touched?.confirmPassword && errors.confirmPassword}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                className="w-[150px] h-10 bg-[#3ab6ff] rounded-[5px] shadow flex justify-center items-center hover:bg-[#239ade]"
              >
                <div className="text-white text-sm font-semibold flex items-center gap-2">
                  <IoSaveOutline size={16} /> Save
                </div>
              </button>
            </div>
          </form>
        </>
      )}
    </>
  )
}
