import Link from "next/link"
import logo from "../../../public/logo.png"
import { FaEnvelope, FaLocationDot } from "react-icons/fa6"
import Image from "next/image"
export default function Footer() {
  return (
    <div className="bg-gray-900 pt-14 pb-6 px-10  w-full z-10 relative">
      <div className="flex justify-between md:items-center mb-10 flex-col md:flex-row gap-x-3 gap-y-10  md:gap-y-0">
        <div className="hidden lg:block w-fit">
          <Link href="/">
            <div className="font-medium text-xl cursor-pointer flex items-center gap-1">
              <Image className="w-11 h-11" src={logo} alt="logo" />
              <h1 className="font-bold text-lg ml-2">
                <span className="text-[#82D955]">Test</span>
                <span className="text-[#3AB6FF]">Sprint</span>{" "}
                <span className="text-white">360</span>
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex sm:justify-between text-white gap-x-14 md:gap-x-8 xl:gap-x-14 ">
          <div className="sm:flex sm:justify-between md:gap-x-8 xl:gap-x-14 w-full">
            <div className="font-bold">
              <Link className="cursor-pointer" href="/">
                Home
              </Link>
            </div>
            <hr className="w-full h-0.5 bg-gray-500 border-0 sm:hidden block  my-3" />
            <div>
              <div className="font-bold">Resources</div>
              <div className="mt-2">
                <Link className="cursor-pointer text-gray-400" href="/blog">
                  Blogs
                </Link>
              </div>
              <div className="mt-2">
                <Link
                  className="cursor-pointer text-gray-400"
                  href="/demo-video"
                >
                  Demo Videos
                </Link>
              </div>
            </div>
            <hr className="w-full h-0.5 bg-gray-500 border-0 sm:hidden block  my-3" />
          </div>
          <div className="sm:flex justify-between gap-x-8 xl:gap-x-14 w-full">
            <div>
              <div className="font-bold">Company</div>
              <div className="mt-2">
                <Link className="cursor-pointer text-gray-400" href="/about-us">
                  About Us
                </Link>
              </div>
              <div className="mt-2">
                <Link className="cursor-pointer text-gray-400" href="/career">
                  Careers
                </Link>
              </div>
            </div>
            <hr className="w-full h-0.5 bg-gray-500 border-0 sm:hidden block  my-3" />
            <div className="font-bold ">
              <Link href="/pricing">Pricing</Link>
            </div>
            <hr className="w-full h-0.5 bg-gray-500 border-0 sm:hidden block  my-3" />
            <div className="font-bold ">
              <Link href="/contact">Contact</Link>
            </div>
            <hr className="w-full h-0.5 bg-gray-500 border-0 sm:hidden block  my-3" />
          </div>
        </div>
        <div className="text-white">
          <div className="mb-5 flex  break-all">
            <FaEnvelope className="mr-2.5 relative top-1" />{" "}
            contact@testsprint360.com
          </div>
          <div className="flex ">
            <FaLocationDot className=" mr-2.5 relative top-1" /> San Jose,
            California, USA
          </div>
        </div>
      </div>
      <hr className="w-full h-[1px] bg-gray-500 border-0" />
      <div className="flex justify-between  mt-4 text-sm text-gray-300">
        <div>&copy; {new Date().getFullYear()} TS360</div>
        <Link className="cursor-pointer text-gray-400" href="/terms-policy">
          Terms & Policy
        </Link>
      </div>
    </div>
  )
}
