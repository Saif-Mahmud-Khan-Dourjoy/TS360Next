import React, { useEffect, useState } from "react"
import { FiEdit2 } from "react-icons/fi"
import { RxCross2 } from "react-icons/rx"
import { IoSaveOutline } from "react-icons/io5"
import useProfile from "@/hook"
import { useFormik } from "formik"
import * as Yup from "yup"
import Select from "react-select"
import { updateUser } from "@/API/User/Profile/Profile"
import { useSession } from "next-auth/react"
import { showErrorAlert, showSuccessAlert } from "@/components/Alerts/Alert"
const customStyles = (error, isEditClicked) => ({
  control: (provided, state) => ({
    ...provided,
    minHeight: "46px",
    backgroundColor: isEditClicked ? "white" : "#E0E0E0", // Disabled style
    borderRadius: "7px",
    borderColor: !isEditClicked
      ? "#B0B0B0" // Disabled border
      : error
      ? "red" // Error border
      : state.isFocused
      ? "blue" // Focus border
      : provided.borderColor,
    outline: "none",
    boxShadow: !isEditClicked
      ? "none" // Disabled box shadow
      : error
      ? "0 0 0 1px red" // Error box shadow
      : state.isFocused
      ? "0 0 0 1px blue" // Focus box shadow
      : provided.boxShadow,
    "&:hover": {
      borderColor: !isEditClicked
        ? "#B0B0B0" // Disabled hover
        : error
        ? "red"
        : state.isFocused
        ? "blue"
        : provided.borderColor,
    },

    opacity: isEditClicked ? 1 : 0.6, // Dim the field when disabled
  }),
})

export default function EditAccount({
  isEditClicked,
  handleEditClick,
  handleCancelClick,
}) {
  const { profile } = useProfile()
  const [countries, setCountries] = useState([])
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { isUpdate, setIsUpdate } = useProfile()

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCountries(data.countries)
      })
  }, [])

  useEffect(() => {
    if (profile) {
      setValues({
        firstName: profile?.user?.firstName,
        lastName: profile?.user?.lastName,
        orgName: profile?.user?.orgName,
        phone: profile?.phone,
        country: profile?.country,
      })
    }
  }, [profile])

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
      firstName: "",
      lastName: "",
      orgName: "",
      phone: "",
      country: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      orgName: Yup.string().required("Organization name is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be numeric")
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number cannot exceed 10 digits")
        .required("Phone number is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true)

      const obj = {
        phone: values?.phone,
        country: values?.country,
        user: {
          firstName: values?.firstName,
          lastName: values?.lastName,
          orgName: values?.orgName,
        },
      }

      updateUser(session?.user?.id, session?.accessToken, obj).then((res) => {
        setLoading(false)
        if (res?.[0]) {
          showSuccessAlert("Updated successfully", "center", 2000)
          setIsUpdate(!isUpdate)
        } else {
          showErrorAlert("Something went wrong", "center", 2000)
        }
      })
    },
  })

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-[#2f2f2f] text-base font-extrabold">
          ACCOUNT DATA
        </div>

        {!isEditClicked && (
          <button
            className="w-[115px] h-9 bg-[#3ab6ff] rounded-[5px] shadow flex justify-center items-center cursor-pointer hover:bg-[#239ade]"
            onClick={handleEditClick}
          >
            <div className="text-white text-sm font-semibold flex items-center gap-2">
              <FiEdit2 size={16} />
              Edit
            </div>
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row justify-between mt-5 w-full gap-5">
          <div className="flex-1">
            <div className="text-[#808080] text-sm font-normal mb-1">
              First Name
            </div>
            <input
              className={`w-full h-12 px-3 py-3.5 rounded-md border text-sm focus:border-blue-600 ${
                isEditClicked
                  ? touched?.firstName && errors?.firstName
                    ? "border-red-700 bg-white cursor-text"
                    : "border-[#c4cdd5] bg-white cursor-text"
                  : "bg-[#f0f0f0] border-[#e0e0e0] cursor-not-allowed text-gray-500"
              } `}
              placeholder="First Name"
              disabled={!isEditClicked}
              value={values?.firstName}
              onChange={(e) => {
                setValues({ ...values, firstName: e.target.value })
              }}
              onBlur={handleBlur}
              name="firstName"
            />
            <p className="text-red-500 text-[12px] mt-1">
              {touched?.firstName && errors.firstName}
            </p>
          </div>
          <div className="flex-1">
            <div className="text-[#808080] text-sm font-normal mb-1">
              Last Name
            </div>
            <input
              className={`w-full h-12 px-3 py-3.5 rounded-md border text-sm focus:border-blue-600 ${
                isEditClicked
                  ? touched?.lastName && errors?.lastName
                    ? "border-red-700 bg-white cursor-text"
                    : "border-[#c4cdd5] bg-white cursor-text"
                  : "bg-[#f0f0f0] border-[#e0e0e0] cursor-not-allowed text-gray-500"
              } `}
              placeholder="First Name"
              disabled={!isEditClicked}
              value={values?.lastName}
              onChange={(e) => {
                setValues({ ...values, lastName: e.target.value })
              }}
              onBlur={handleBlur}
              name="lastName"
            />
            <p className="text-red-500 text-[12px] mt-1">
              {touched?.lastName && errors.firstName}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-5 w-full gap-5">
          <div className="flex-1">
            <div className="text-[#808080] text-sm font-normal mb-1">
              Organization
            </div>
            <input
              className={`w-full h-12 px-3 py-3.5 rounded-md border text-sm focus:border-blue-600 ${
                isEditClicked
                  ? touched?.orgName && errors?.orgName
                    ? "border-red-700 bg-white cursor-text"
                    : "border-[#c4cdd5] bg-white cursor-text"
                  : "bg-[#f0f0f0] border-[#e0e0e0] cursor-not-allowed text-gray-500"
              } `}
              placeholder="First Name"
              disabled={!isEditClicked}
              value={values?.orgName}
              onChange={(e) => {
                setValues({ ...values, orgName: e.target.value })
              }}
              onBlur={handleBlur}
              name="orgName"
            />
            <p className="text-red-500 text-[12px] mt-1">
              {touched?.orgName && errors.orgName}
            </p>
          </div>

          <div className="flex-1">
            <div className="text-[#808080] text-sm font-normal mb-1">
              Country
            </div>

            <Select
              styles={customStyles(
                errors.country && touched.country,
                isEditClicked
              )}
              options={countries}
              value={countries.filter((item) => item.value == values?.country)}
              onChange={(e) => setValues({ ...values, country: e.value })}
              onBlur={handleBlur}
              isDisabled={!isEditClicked}
            />
            {errors.country && touched.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-5 w-full gap-5 flex-col md:flex-row">
          <div className="flex-1">
            <div className="text-[#808080] text-sm font-normal mb-1">Phone</div>
            <input
              className={`w-full h-12 px-3 py-3.5 rounded-md border text-sm focus:border-blue-600 ${
                isEditClicked
                  ? touched?.phone && errors?.phone
                    ? "border-red-700 bg-white cursor-text"
                    : "border-[#c4cdd5] bg-white cursor-text"
                  : "bg-[#f0f0f0] border-[#e0e0e0] cursor-not-allowed text-gray-500"
              } `}
              placeholder="First Name"
              disabled={!isEditClicked}
              value={values?.phone}
              onChange={(e) => {
                setValues({ ...values, phone: e.target.value })
              }}
              onBlur={handleBlur}
              name="phone"
            />
            <p className="text-red-500 text-[12px] mt-1">
              {touched?.phone && errors.phone}
            </p>
          </div>
          <div className="flex-1"> </div>
        </div>
        {isEditClicked && (
          <div className="flex justify-end mt-10 w-full gap-5">
            <button
              className="w-[150px] h-10 bg-[#2f2f2f] rounded-[5px] shadow flex justify-center items-center cursor-pointer hover:bg-black"
              onClick={handleCancelClick}
            >
              <div className="text-white text-sm font-semibold flex items-center gap-2">
                <RxCross2 size={20} /> Cancel
              </div>
            </button>

            <button
              type="submit"
              className="w-[150px] h-10 bg-[#3ab6ff] rounded-[5px] shadow flex justify-center items-center hover:bg-[#239ade]"
            >
              <div className="text-white text-sm font-semibold flex items-center gap-2">
                <IoSaveOutline size={16} /> Save
              </div>
            </button>
          </div>
        )}
      </form>
    </>
  )
}
