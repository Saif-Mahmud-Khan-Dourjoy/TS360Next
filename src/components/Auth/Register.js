"use client"
import { useEffect, useState } from "react"
import logo from "../../../public/logo.png"
// import Auth1 from "/public/Auth/auth1.svg"
import L1 from "../../../public/Auth/L1.png"
import L2 from "../../../public/Auth/L2.png"
import L3 from "../../../public/Auth/L3.png"
import "../../../public/css/slickSlider.css"
import Slider from "react-slick"
import { useRouter } from "next/navigation"
import { Registration } from "@/app/(auth)/Api/AuthenticationApi"
import { useFormik } from "formik"
import Image from "next/image"
import Link from "next/link"
import Select from "react-select"
import * as Yup from "yup"
import "/public/css/slickSlider.css"
import CustomModal from "../Custom/Modal"
import LoaderModal from "../Custom/Loader"

// import ReactFlagsSelect from "react-flags-select";
const settings = {
  dots: true, // Show dots for navigation
  infinite: true, // Infinite looping of slides
  speed: 2000, // Transition speed
  slidesToShow: 1, // Number of slides to show at a time
  slidesToScroll: 1, // Number of slides to scroll at a time
  arrows: false, // Disable the arrows
  autoplay: true, // Enable autoplay
  autoplaySpeed: 3000, // Autoplay speed in milliseconds (3000ms = 3 seconds)
}
// const customStyles = {
//   control: (provided, state) => ({
//     ...provided,
//     minHeight: '41px',
//     backgroundColor: '#F9FAFB',
//     borderRadius: '7px',
//     borderColor: state.isFocused ? 'black' : provided.borderColor, // Change border color on focus
//     outline: state.isFocused ? 'none' : 'none', // Remove default outline
//     boxShadow: state.isFocused ? '0 0 0 1px black' : provided.boxShadow, // Change box shadow on focus
//     '&:hover': {
//       borderColor: state.isFocused ? 'black' : provided.borderColor, // Change border color on hover

//     },
//   })
// };
const customStyles = (error) => ({
  control: (provided, state) => ({
    ...provided,
    minHeight: "41px",
    backgroundColor: "#F9FAFB",
    borderRadius: "7px",
    borderColor: error
      ? "red"
      : state.isFocused
      ? "black"
      : provided.borderColor,
    outline: "none",
    boxShadow: error
      ? "0 0 0 1px red"
      : state.isFocused
      ? "0 0 0 1px black"
      : provided.boxShadow,
    "&:hover": {
      borderColor: error
        ? "red"
        : state.isFocused
        ? "black"
        : provided.borderColor,
    },
  }),
})
const pursposeOpArr = [
  { value: "Dev", label: "Development" },
  { value: "Test", label: "Testing/QA" },
  { value: "OP", label: "Operations" },
  { value: "BS", label: "Business Strategy" },
  { value: "TS", label: "Technology Strategy" },
  { value: "Other", label: "Other" },
]
export default function Register() {
  // const [checked, setChecked] = useState(false);
  const [countries, setCountries] = useState([])
  const [purposeOptions, setPurposeOptions] = useState(pursposeOpArr)
  const router = useRouter()
  // const [selectedCountry, setSelectedCountry] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    orgName: "",
    phone: "",
    country: "",
    intendedPurpose: "Dev",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [isLoaderOpen, setIsLoaderOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState("success")
  const [modalMessage, setModalMessage] = useState("Operation was successful!")

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCountries(data.countries)
        setValues({ ...values, country: data.userSelectValue.value })
      })
  }, [])

  const openModal = (type, message) => {
    setModalType(type)
    setModalMessage(message)
    setModalOpen(true)
  }

  const handleOk = () => {
    setModalOpen(false)
    router.push(`/otp-varification?email=${values.email}`)
  }

  const handleCancel = () => {
    setModalOpen(false)
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
    initialValues: formData,
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        // .min(2, 'First name must be at least 2 characters')
        // .max(50, 'First name cannot exceed 50 characters')
        .required("First name is required"),
      lastName: Yup.string()
        // .min(2, 'Last name must be at least 2 characters')
        // .max(50, 'Last name cannot exceed 50 characters')
        .required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      orgName: Yup.string().required("Organization name is required"),
      phone: Yup.string()
        // .matches(/^[0-9]+$/, 'Phone number must be numeric')
        // .min(10, 'Phone number must be at least 10 digits')
        // .max(15, 'Phone number cannot exceed 15 digits')
        .required("Phone number is required"),
      country: Yup.string().required("Country is required"),
      intendedPurpose: Yup.string().required("Purpose  is Required"),
      password: Yup.string()
        // .min(8, 'Password must be at least 8 characters')
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
      agreeToTerms: Yup.bool()
        .oneOf([true], "You must agree to the terms and conditions")
        .required("You must agree to the terms and conditions"),
    }),
    onSubmit: (values) => {
      const { confirmPassword, agreeToTerms, ...filteredData } = {
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.email,
        orgName: values?.orgName,
        phone: values?.phone,
        country: values?.country,
        intendedPurpose: values?.intendedPurpose,
        password: values?.password,
        confirmPassword: values?.confirmPassword,
        agreeToTerms: values?.agreeToTerms,
      }
      handleRegistration(filteredData)
      console.log(filteredData)
    },
  })

  const handleRegistration = async (data) => {
    setIsLoaderOpen(true)
    Registration(data).then((res) => {
      if (res?.[0]) {
        setIsLoaderOpen(false)
        console.log(res?.[0])

        // showSuccessAlertOnReg('OTP code sent to your registered email', 'center', 2000);
        // router.push(`/otp-varification?email=${values.email}`);
        openModal("success", "We have Sent you an OTP. Press ok to submit!")
      } else {
        setIsLoaderOpen(false)
        console.log(
          res[1]?.response?.data?.errors?.[0]?.message ||
            "Something went wrong!"
        )
        // showErrorAlert(res[1]?.response?.data?.message || "Something went wrong!", 'center', 2000);
        openModal(
          "error",
          res[1]?.response?.data?.errors?.[0]?.message ||
            "Something went wrong!"
        )

        // router.push(`/otp-varification?email=${values.email}`);
        // setErrorMessage(res[1]?.response?.data?.message || "Something went wrong!");
        // setShowErrorModal(true);
      }
    })
  }

  // const checkBoxValue = (e) => {
  //   setChecked(e.target.checked);
  // }

  return (
    <>
      <div className="py-8 lg:px-24 px-7 ">
        <Link href="/">
          <div className="font-medium text-xl cursor-pointer flex items-center gap-1">
            <Image height={44} width={44} src={logo} alt="logo" />
            <h1 className="font-bold text-lg ml-2">
              <span className="text-[#82D955]">Test</span>
              <span className="text-[#3AB6FF]">Sprint</span>360
            </h1>
          </div>
        </Link>
        <div className="flex justify-between items-center">
          <div className=" w-full lg:w-[45%]">
            <div className="font-bold text-2xl md:text-[30px] text-gray-950 mt-8">
              Sign Up
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className={`bg-gray-50 border ${
                        touched?.firstName && errors?.firstName
                          ? " border-red-700"
                          : "border-gray-300"
                      }   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                      placeholder="Enter first name"
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
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className={`bg-gray-50 border ${
                        touched?.lastName && errors?.lastName
                          ? "border-red-700"
                          : "border-gray-300"
                      }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                      placeholder="Enter last name"
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
                  <div>
                    <label
                      htmlFor="company"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      className={`bg-gray-50 border ${
                        touched?.orgName && errors?.orgName
                          ? "border-red-700"
                          : "border-gray-300"
                      }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                      placeholder="Enter your company name"
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
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Company Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`bg-gray-50 border ${
                        touched?.email && errors?.email
                          ? "border-red-700"
                          : "border-gray-300"
                      }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                      placeholder="you@yourcompany.com"
                      value={values?.email}
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value })
                      }}
                      onBlur={handleBlur}
                      name="email"
                    />
                    <p className="text-red-500 text-[12px] mt-1">
                      {touched?.email && errors.email}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className={`bg-gray-50 border ${
                        touched?.phone && errors?.phone
                          ? "border-red-700"
                          : "border-gray-300"
                      }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                      placeholder="Enter your phone number"
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
                  <div>
                    <label
                      htmlFor="country"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Country
                    </label>

                    {/* <ReactFlagsSelect
                      className="rounded-lg"
                      selected={selectedCountry}
                      onSelect={(code) => setSelectedCountry(code)}
                    /> */}
                    <Select
                      styles={customStyles(errors.country && touched.country)}
                      options={countries}
                      value={countries.filter(
                        (item) => item.value == values?.country
                      )}
                      onChange={(e) =>
                        setValues({ ...values, country: e.value })
                      }
                      onBlur={handleBlur}
                    />
                    {errors.country && touched.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Intended Purpose
                  </label>
                  <Select
                    styles={customStyles(
                      errors.intendedPurpose && touched.intendedPurpose
                    )}
                    options={purposeOptions}
                    value={purposeOptions.filter(
                      (item) => item.value == values?.intendedPurpose
                    )}
                    onChange={(e) =>
                      setValues({ ...values, intendedPurpose: e.value })
                    }
                    onBlur={handleBlur}
                  />
                  {errors.intendedPurpose && touched.intendedPurpose && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.intendedPurpose}
                    </p>
                  )}
                </div>
                <div className="grid gap-6 mb-1 sm:grid-cols-2">
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className={`bg-gray-50 border ${
                        touched?.password && errors?.password
                          ? "border-red-700"
                          : "border-gray-300"
                      } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                      placeholder="Enter password"
                      value={values?.password}
                      onChange={(e) => {
                        setValues({ ...values, password: e.target.value })
                      }}
                      onBlur={handleBlur}
                      name="password"
                    />
                    <p className="text-red-500 text-[12px] mt-1">
                      {touched?.password && errors.password}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="confirm_password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      id="confirm_password"
                      className={`bg-gray-50 border ${
                        touched?.confirmPassword && errors?.confirmPassword
                          ? "border-red-700"
                          : "border-gray-300"
                      } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                      placeholder="Re-enter password"
                      value={values?.confirmPassword}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          confirmPassword: e.target.value,
                        })
                      }}
                      onBlur={handleBlur}
                      name="confirmPassword"
                    />
                    <p className="text-red-500 text-[12px] mt-1">
                      {touched?.confirmPassword && errors.confirmPassword}
                    </p>
                  </div>
                </div>
                <div className="flex items-start mb-8 relative">
                  <div className="flex items-center h-5">
                    <input
                      checked={values.agreeToTerms}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="checkbox"
                      id="agree_to_terms"
                      name="agreeToTerms"
                      className={`w-4 h-4 border ${
                        touched?.agreeToTerms && errors?.agreeToTerms
                          ? "border-red-700"
                          : "border-gray-300"
                      } rounded bg-gray-50 focus:ring-3 focus:ring-blue-300`}
                    />
                  </div>
                  <label
                    htmlFor="agree_to_terms"
                    className="ms-2 text-sm font-medium text-gray-900 "
                  >
                    I agree to the Terms of Service & Privacy Policy and receive
                    emails from TestSprint360{" "}
                    <a href="#" className="text-blue-600 hover:underline ">
                      terms and conditions
                    </a>
                    .
                  </label>
                  <p className="text-red-500 text-[12px] mt-1 absolute top-[95%]">
                    {touched?.agreeToTerms && errors.agreeToTerms}
                  </p>
                </div>

                <div className="w-full">
                  <button
                    type="submit"
                    className={`shadow-lg w-full  text-white ${
                      values.agreeToTerms
                        ? "bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   cursor-pointer"
                        : "bg-gray-400  focus:ring-4 focus:outline-none focus:ring-gray-300  cursor-not-allowed"
                    } font-medium rounded-md text-lg   px-5 py-2.5 text-center `}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
            <hr className="my-6" />
            <div className="text-center text-gray-400 ">
              {`Already have an account`}{" "}
              <Link href="/login" className="text-blue-500">
                Sign In{" "}
              </Link>
            </div>
          </div>

          <div className="hidden lg:block w-[45%] ">
            <Slider {...settings}>
              <div className="">
                <div className="flex flex-col justify-center items-center">
                  <div className="font-bold text-2xl text-gray-600 text-center">
                    Simplify Test Scripting
                  </div>
                  <div className="font-bold text-xl text-gray-500 text-center my-1 font-pacifico">
                    with
                  </div>
                  <div className="font-bold text-2xl text-gray-600 text-center">
                    No Code Test Automation
                  </div>
                  <div className="mt-5">
                    <Image
                      className=""
                      width={500}
                      height={500}
                      src={L1}
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-col justify-center items-center">
                  <div className="font-bold text-2xl text-gray-600 text-center">
                    The Efficient Path
                  </div>
                  <div className="font-bold text-xl text-gray-500 text-center my-1 font-pacifico">
                    with
                  </div>
                  <div className="font-bold text-2xl text-gray-600 text-center">
                    No Code Test Automation
                  </div>
                  <div className="mt-5">
                    <Image
                      className=""
                      width={500}
                      height={500}
                      src={L2}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col justify-center items-center">
                  <div className="font-bold text-2xl text-gray-600 text-center">
                    Simplify Test Scripting
                  </div>
                  <div className="font-bold text-xl text-gray-500 text-center my-1 font-pacifico">
                    with
                  </div>
                  <div className="font-bold text-2xl text-gray-600 text-center">
                    No Code Test Automation
                  </div>
                  <div className="mt-5">
                    <Image
                      className=""
                      width={500}
                      height={500}
                      src={L3}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>

        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          type={modalType}
          message={modalMessage}
          onOk={handleOk}
          onCancel={handleCancel}
        />
        <LoaderModal isOpen={isLoaderOpen} />
      </div>
    </>
  )
}
