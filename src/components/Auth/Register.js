"use client"
import { useEffect, useState } from "react";
import logo from "/public/logo.png";
// import Auth1 from "/public/Auth/auth1.svg"
import L1 from "/public/Auth/L1.png"
import L2 from "/public/Auth/L2.png"
import L3 from "/public/Auth/L3.png"
import "/public/css/slickSlider.css"
import Slider from "react-slick";
import Image from "next/image";
import Select from "react-select";
import Link from "next/link";
// import ReactFlagsSelect from "react-flags-select";
const settings = {
  dots: true,         // Show dots for navigation
  infinite: true,     // Infinite looping of slides
  speed: 2000,         // Transition speed
  slidesToShow: 1,    // Number of slides to show at a time
  slidesToScroll: 1,  // Number of slides to scroll at a time
  arrows: false,      // Disable the arrows
  autoplay: true,     // Enable autoplay
  autoplaySpeed: 3000 // Autoplay speed in milliseconds (3000ms = 3 seconds)
};
const customStyles = {
  control: (provided,state) => ({
    ...provided,
    minHeight: '41px',
    backgroundColor: '#F9FAFB',
    borderRadius:'7px',
    borderColor: state.isFocused ? 'black' : provided.borderColor, // Change border color on focus
    outline: state.isFocused ? 'none' : 'none', // Remove default outline
    boxShadow: state.isFocused ? '0 0 0 1px black' : provided.boxShadow, // Change box shadow on focus
    '&:hover': {
      borderColor: state.isFocused ? 'black' : provided.borderColor, // Change border color on hover
      
    },
  })
};
export default function Register() {
  const [checked, setChecked] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
      
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);

      });
  }, []);
  const checkBoxValue = (e) => {
    setChecked(e.target.checked);
  }

  return (
    <>


      <div className="py-8 lg:px-24 px-7 ">
      <Link href='/'>
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
              <form>
                <div className="grid gap-6 mb-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">First name</label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter first name" required />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 ">Last name</label>
                    <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter last name" required />
                  </div>
                  <div>
                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Company</label>
                    <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter your company name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Company Email</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="you@yourcompany.com" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                    <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter your phone number" required />
                  </div>
                  <div>
                    <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 ">Country</label>
                    {/* <select id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Select your country">
                      <option selected>Choose a country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                    </select> */}
                    {/* <ReactFlagsSelect
                      className="rounded-lg"
                      selected={selectedCountry}
                      onSelect={(code) => setSelectedCountry(code)}
                    /> */}
                    <Select
                      styles={customStyles}
                      options={countries}
                      value={selectedCountry}
                      onChange={(selectedOption) => setSelectedCountry(selectedOption)}
                    />

                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 ">Intended Purpose</label>
                  <select id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Select the application’s intended purpose">
                    <option selected>Select the application’s intended purpose</option>
                    <option value="">Development</option>
                    <option value="">Testing/QA</option>
                    <option value="">Operations</option>
                    <option value="">Business Strategy</option>
                    <option value="">Technology Strategy</option>
                    <option value="">Other</option>
         

                  </select>
                </div>
                <div className="grid gap-6 mb-1 sm:grid-cols-2">
                  <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter password" required />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                    <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Re-enter password" required />
                  </div>
                </div>
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input id="remember" checked={checked} onChange={(e) => checkBoxValue(e)} type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " required />
                  </div>
                  <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 ">I agree to the Terms of Service & Privacy Policy and receive emails from
                    TestSprint360 <a href="#" className="text-blue-600 hover:underline ">terms and conditions</a>.</label>
                </div>
                <div className="w-full">
                  <button type="submit" className={`shadow-lg w-full  text-white ${checked ? "bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   cursor-pointer" : "bg-gray-400  focus:ring-4 focus:outline-none focus:ring-gray-300  cursor-not-allowed"} font-medium rounded-md text-lg   px-5 py-2.5 text-center `}>Sign Up</button>
                </div>

              </form>


            </div>
            <hr className="my-6" />
            <div className="text-center text-gray-400 ">
              {`Already have an account`} <Link href='/login' className="text-blue-500">Sign In </Link>
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
                    <Image className="" width={500} height={500} src={L1} alt="" />
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
                    <Image className="" width={500} height={500} src={L2} alt="" />
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
                    <Image className="" width={500} height={500} src={L3} alt="" />
                  </div>
                </div>
              </div>

            </Slider>
          </div>
        </div>

      </div>

    </>
  );
}
