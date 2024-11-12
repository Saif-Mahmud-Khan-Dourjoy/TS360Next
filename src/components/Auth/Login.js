"use client"
import { useEffect, useState } from "react"
import logo from "../../../public/logo.png"
import L1 from "../../../public/Auth/L1.png"
import L2 from "../../../public/Auth/L2.png"
import L3 from "../../../public/Auth/L3.png"
import Slider from "react-slick"
import "../../../public/css/slickSlider.css"
import Image from "next/image"
import Link from "next/link"
import { useFormik } from "formik"
import * as Yup from "yup"

import { signIn, signOut, useSession } from "next-auth/react"
import CustomModal from "../Custom/Modal"
import LoaderModal from "../Custom/Loader"
import { useRouter, useSearchParams } from "next/navigation"

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
export default function Login() {
  const [keepLogin, setKeepLogin] = useState(false)
  const { data: session } = useSession()
  const [isLoaderOpen, setIsLoaderOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState("success")
  const [modalMessage, setModalMessage] = useState("Operation was successful!")
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect")

  useEffect(() => {
    if (session) {
      if (redirectTo) {
        router.push(`${redirectTo}`)
      } else {
        setIsLoaderOpen(false)
        if (session?.user?.role == "ADMIN") {
          router.push(`/admin/blog`)
        } else {
          router.push(`/`)
        }
      } 
    }
  }, [session])

  const checkBoxValue = (e) => {
    setKeepLogin(e.target.checked)
  }

  const openModal = (type, message) => {
    setModalType(type)
    setModalMessage(message)
    setModalOpen(true)
  }

  const handleOk = () => {
    setModalOpen(false)
    // router.push(`/otp-varification?email=${values.email}`);
  }

  const handleCancel = () => {
    setModalOpen(false)
  }

  // const handleSubmitLogin = async (e) => {
  //     e.preventDefault();

  //     const result = await signIn("credentials", {
  //         redirect: false,
  //         email: "email@email.com",
  //         password: "password", // Hardcoded password for testing

  //     });

  //     if (result.error) {
  //         console.error("Failed to sign in:", result.error);
  //     } else {
  //         console.log("Successfully signed in");
  //     }
  // };
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
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoaderOpen(true)
      console.log(values)
      // setSubmitting(true);

      const result = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      })

      // setSubmitting(false);

      if (result.error) {
        setIsLoaderOpen(false)
        openModal("error", "Failed to sign in!")
        console.error("Failed to sign in:", result.error)
      } else {
        // setIsLoaderOpen(false);

        if (redirectTo) {
          console.log(redirectTo)
          router.push(`${redirectTo}`)
        }

        if (session) {
          if (redirectTo) {
            router.push(`${redirectTo}`)
          } else{
             setIsLoaderOpen(false)
             if (session?.user?.role == "ADMIN") {
               router.push(`/admin/blog`)
             } else {
               router.push(`/`)
             }
          } 
        }
      }
    },
  })
  const [isPasswordVisible, setPasswordVisible] = useState(false);

const togglePasswordVisibility = () => {
  var i_ele = document.getElementById("eyeIcon");
  i_ele.classList.toggle('fa-eye-slash');
  setPasswordVisible(!isPasswordVisible);
};
  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <Link href="/">
        <div className="absolute top-8 lg:left-24 left-7">
          <div className="font-medium text-xl cursor-pointer flex items-center gap-1">
            <Image height={44} width={44} src={logo} alt="logo" />
            <h1 className="font-bold text-lg ml-2">
              <span className="text-[#82D955]">Test</span>
              <span className="text-[#3AB6FF]">Sprint</span>360
            </h1>
          </div>
        </div>
      </Link>
      <div className="py-8 lg:px-24 px-7 flex justify-between items-center h-screen">
        <div className=" w-full lg:w-[45%]">
          <div className="font-bold text-2xl md:text-[30px]  text-gray-950 mt-8">
            Sign In
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Company username
                </label>
                <input
                  type="text"
                  id="email"
                  className={`bg-gray-50 border ${
                    touched?.username && errors?.username
                      ? "border-red-700"
                      : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                  placeholder="Enter Username"
                  value={values?.username}
                  onChange={(e) => {
                    setValues({ ...values, username: e.target.value })
                  }}
                  onBlur={handleBlur}
                  name="username"
                />
                <p className="text-red-500 text-[12px] mt-1">
                  {touched?.username && errors.username}
                </p>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    className={`bg-gray-50 border ${
                      touched?.password && errors?.password
                        ? "border-red-700"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10`}
                    placeholder="Enter password"
                    value={values?.password}
                    onChange={(e) => {
                      setValues({ ...values, password: e.target.value });
                    }}
                    onBlur={handleBlur}
                    name="password"
                  />
                  <i
                    class ="fa fa-eye absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={togglePasswordVisibility} id="eyeIcon"
                  ></i>
                </div>
                <p className="text-red-500 text-[12px] mt-1">
                  {touched?.password && errors.password}
                </p>
              </div>

              <div className="sm:flex justify-between mb-6">
                <div className="flex items-start h-5">
                  <input
                    id="remember"
                    checked={keepLogin}
                    onChange={(e) => checkBoxValue(e)}
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  cursor-pointer"
                  />
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-400 "
                  >
                    Keep me logged in
                  </label>
                </div>
                <div className="text-end sm:mt-0 mt-2">
                  <Link href="/forgot-password" className="text-blue-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className={`shadow-lg w-full  text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   cursor-pointer  font-medium rounded-md text-lg   px-5 py-2.5 text-center `}
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <hr className="my-6" />
          <div className="text-center text-gray-400 ">
            {`Don’t have an account?`}{" "}
            <Link href="/register" className="text-blue-500">
              Sign up{" "}
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
                  to
                </div>
                <div className="font-bold text-2xl text-gray-600 text-center">
                  Quality Testing
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
                  Simple Interface
                </div>
                <div className="font-bold text-xl text-gray-500 text-center my-1 font-pacifico">
                  but
                </div>
                <div className="font-bold text-2xl text-gray-600 text-center">
                  Powerful Results
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
    </>
  )
}
