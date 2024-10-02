
import React, { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { FaRegUser, FaMobileScreenButton } from "react-icons/fa6"
import { HiOutlineBuildingOffice2 } from "react-icons/hi2"
import { MdPeopleOutline } from "react-icons/md"
import { CiMail } from "react-icons/ci"
import { FaPencilAlt } from "react-icons/fa"
import { useFormik } from "formik"
import * as Yup from "yup"

const ContactModal = ({ userId, isOpen, onClose, submitContact }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    organizationName: "",
    numberOfEmployees: "",
    email: "",
    description: "",
    userId: userId,
  })
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
    initialValues: formData,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      phoneNumber: Yup.string()
        .matches(/^\d+$/, "Phone number must contain only digits")
        .nullable(),
      organizationName: Yup.string().required("Organization Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      description: Yup.string().nullable(),
      numberOfEmployees: Yup.number()
        .min(1, "Atlest one employee is required") // Minimum number validation
        .required("Employee Number is required"), // Required validation
    }),
    onSubmit: (values) => {
      submitContact(values)
    },
  })

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: "9999" }}
      onClick={onClose}
    >
      <div
        className="relative w-11/12 max-w-xl p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 ease-out modal-enter"
        style={{ transform: "translateY(0%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
        <div className="absolute top-4 text-[#2F2F2F] font-bold text-2xl left-[50%] transform -translate-x-[50%] ">
          Contact Us
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-14 px-2">
            <div className="sm:flex justify-between">
              <div>
                <div className=" flex items-center gap-2">
                  <FaRegUser color="#486681" />
                  <div>
                    <span className="text-[#818181] mr-2">Name</span>
                    <span className="text-red-600">*</span>
                  </div>
                </div>
                <div className="mt-1">
                  <input
                    type="text"
                    className={`border  text-gray-500   rounded-lg focus:border-blue-600 ${
                      touched.name && errors.name ? "border-red-600" : ""
                    } w-full p-2`}
                    name="name"
                    value={values?.name}
                    onChange={(e) => {
                      setValues({ ...values, name: e.target.value })
                    }}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name && (
                    <div className="text-[12px] text-red-600">
                      {errors.name}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5 sm:mt-0">
                <div className=" flex items-center gap-2">
                  <FaMobileScreenButton color="#486681" />
                  <div>
                    <span className="text-[#818181] mr-2">Phone Number</span>
                  </div>
                </div>
                <div className="mt-1">
                  <input
                    type="text"
                    className={`border  text-gray-500   rounded-lg focus:border-blue-600 ${
                      touched.phoneNumber && errors.phoneNumber
                        ? "border-red-600"
                        : ""
                    } w-full p-2`}
                    name="phoneNumber"
                    value={values?.phoneNumber}
                    onChange={(e) => {
                      setValues({ ...values, phoneNumber: e.target.value })
                    }}
                    onBlur={handleBlur}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <div className="text-[12px] text-red-600">
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="sm:flex flex-wrap justify-between mt-5 gap-y-5">
              <div>
                <div className=" flex items-center gap-2">
                  <HiOutlineBuildingOffice2 color="#486681" />
                  <div>
                    <span className="text-[#818181] mr-2">
                      Organization Name
                    </span>
                    <span className="text-red-600">*</span>
                  </div>
                </div>
                <div className="mt-1">
                  <input
                    type="text"
                    className={`border  text-gray-500   rounded-lg focus:border-blue-600 ${
                      touched.organizationName && errors.organizationName
                        ? "border-red-600"
                        : ""
                    } w-full p-2`}
                    name="organizationName"
                    value={values?.organizationName}
                    onChange={(e) => {
                      setValues({ ...values, organizationName: e.target.value })
                    }}
                    onBlur={handleBlur}
                  />
                  {touched.organizationName && errors.organizationName && (
                    <div className="text-[12px] text-red-600">
                      {errors.organizationName}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5 sm:mt-0">
                <div className=" flex  items-center gap-2">
                  <MdPeopleOutline color="#486681" />
                  <div>
                    <span className="text-[#818181] mr-2">
                      Number of employees
                    </span>
                    <span className="text-red-600">*</span>
                  </div>
                </div>
                <div className="mt-1">
                  <input
                    type="number"
                    className={`border  text-gray-500   rounded-lg focus:border-blue-600 ${
                      touched.numberOfEmployees && errors.numberOfEmployees
                        ? "border-red-600"
                        : ""
                    } w-full p-2`}
                    name="numberOfEmployees"
                    value={values?.numberOfEmployees}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        numberOfEmployees: e.target.value,
                      })
                    }}
                    onBlur={handleBlur}
                  />
                  {touched.numberOfEmployees && errors.numberOfEmployees && (
                    <div className="text-[12px] text-red-600">
                      {errors.numberOfEmployees}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full mt-5">
              <div className=" flex items-center gap-2">
                <CiMail color="#486681" />
                <div>
                  <span className="text-[#818181] mr-2">Business Email</span>
                  <span className="text-red-600">*</span>
                </div>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  className={`border  text-gray-500   rounded-lg focus:border-blue-600 ${
                    touched.email && errors.email ? "border-red-600" : ""
                  } w-full p-2`}
                  name="email"
                  value={values?.email}
                  onChange={(e) => {
                    setValues({ ...values, email: e.target.value })
                  }}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <div className="text-[12px] text-red-600">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="w-full mt-5">
              <div className=" flex items-center gap-2">
                <FaPencilAlt color="#486681" />
                <div>
                  <span className="text-[#818181]">Specific Needs</span>
                </div>
              </div>
              <div className="mt-1">
                <textarea
                  type="text"
                  className={`border focus:border-blue-600 rounded-lg ${
                    touched.description && errors.description
                      ? "border-red-600"
                      : ""
                  } w-full text-gray-500 resize-none focus:outline-none p-2`}
                  name="description"
                  rows="4"
                  value={values?.description}
                  onChange={(e) => {
                    setValues({ ...values, description: e.target.value })
                  }}
                  onBlur={handleBlur}
                ></textarea>
                {touched.description && errors.description && (
                  <div className="text-[12px] text-red-600">
                    {errors.description}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-[#3AB6FF] hover:bg-blue-700 text-white py-[10px] px-5 rounded text-sm font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="text-center mt-5 text-[12px] text-[#A6A6A6] font-extralight">
          You agree to our{" "}
          <span className=" font-semibold underline">Terms</span> and{" "}
          <span className=" font-semibold underline">Privacy</span> Policy by
          submitting this form
        </div>
      </div>
    </div>
  )
}

export default ContactModal
