"use client"
import { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useFormik } from "formik"
import * as Yup from "yup"
import { checkCurrentPassword } from "@/API/User/Profile/Profile"
import { useSession } from "next-auth/react"
import { showErrorAlert } from "@/components/Alerts/Alert"
const CheckOwnershipModal = ({ isOpen, onClose, setConfirmed }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const { data: session } = useSession()
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible)
  }

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
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log(values)
      checkCurrentPassword(
        session?.user?.id,
        session?.accessToken,
        values
      ).then((res) => {
        if (res?.[0]) {
          onClose(), setConfirmed(true)
        } else {
          onClose(),
           showErrorAlert(res?.[1], "center", 2000)
        }
      })
    },
  })

  if (!isOpen) return null

  return (
    <div
      style={{ zIndex: "9999" }}
      className="fixed inset-0 flex  justify-center items-start  bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:w-11/12 sm:max-w-xl p-6 bg-white sm:rounded-lg shadow-lg transform transition-transform duration-300 ease-out modal-enter-from-top"
        style={{ transform: "translateY(0%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="text-[#818181] text-lg md:text-xl font-bold mt-8 text-center">
          Confirm Account Ownership
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-7 sm:w-[60%] mx-auto">
            <label
              htmlFor="ownershipPassword"
              className="text-xs text-[#818181]"
            >
              Please enter account password:
            </label>

            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
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
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
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

          <div className="my-10 w-full flex justify-center">
            <button
              type="submit"
              className="px-10 py-[8px] text-white  bg-[#3AB6FF] rounded-md text-sm"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckOwnershipModal
