"use client"
import logo from "../../../public/logo.png"
import Auth2 from "../../../public/Auth/auth2.png"
import Link from "next/link"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft"
import Image from "next/image"
import { SendOTP } from "@/app/(auth)/Api/AuthenticationApi"
import { showErrorAlert } from "@/components/Alerts/Alert"
import { useRouter } from "next/navigation"

export default function Forgot() {
  const [email, setEmail] = useState("")
  const router = useRouter()

  function handleSendOTP(event) {
    event.preventDefault() // Prevent the default form submission
    SendOTP(email).then((res) => {
      if (res?.[0]) {
        router.push(`/reset-password?email=${email}`)
      } else {
        console.log(res[1])
        alert(res?.[1])
      }
    })
  }

  return (
    <>
      <Link href="/">
        <div className="absolute top-8 lg:left-24 left-7">
          <div className="font-medium text-xl cursor-pointer flex items-center gap-1">
            <Image className="w-11 h-11" src={logo} alt="logo" />
            <h1 className="font-bold text-lg ml-2">
              <span className="text-[#82D955]">Test</span>
              <span className="text-[#3AB6FF]">Sprint</span>360
            </h1>
          </div>
        </div>
      </Link>
      <div className="py-8 lg:px-24 px-7 flex justify-between items-center h-screen">
        <div className=" w-full lg:w-[45%]">
          <div className="font-bold text-2xl md:text-[30px] text-gray-950 mt-8">
            Forgot Password?
          </div>
          <div className="text-sm font-medium text-gray-400 mt-2">
            No worries. We will send you a code to reset your password
          </div>

          <div className="mt-14">
            <form>
              <div className="mb-14">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Company Email
                  <span style={{ color: "red" }}> *</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="you@yourcompany.com"
                  required
                />
              </div>

              <div className="w-full">
                {/* <Link href='/reset-password'><button type="submit" disabled={email === ""} onClick={handleSendOTP} className={`shadow-lg w-full  text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  cursor-pointer  font-medium rounded-md text-lg   px-5 py-2.5 text-center `}>Send Code</button></Link> */}
                <button
                  type="submit"
                  disabled={email === ""}
                  onClick={handleSendOTP}
                  className={`shadow-lg w-full  text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  cursor-pointer  font-medium rounded-md text-lg   px-5 py-2.5 text-center `}
                >
                  Send Code
                </button>
              </div>
            </form>
          </div>
          <hr className="my-6" />
          <div className="text-center text-gray-400 ">
            <Link
              href="/login"
              className="text-blue-500 flex justify-center items-center"
            >
              <FontAwesomeIcon
                icon={faArrowAltCircleLeft}
                className="mr-1 max-h-4 max-w-4"
              />{" "}
              Sign In{" "}
            </Link>
          </div>
        </div>

        <div className="hidden lg:block w-[45%] ">
          <Image src={Auth2} alt="" />
        </div>
      </div>
    </>
  )
}
