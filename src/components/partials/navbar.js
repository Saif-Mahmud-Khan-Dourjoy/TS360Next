"use client"
import { useEffect, useRef, useState } from "react"
import alignRight from "../../../public/align-right.svg"
import { FaAngleDown } from "react-icons/fa6"
// import crossIcon from "../../../public/cross.svg";
import logo from "../../../public/logo.png"
import Pro from "../../../public/proUser.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleDown,
  faAngleUp,
  faXmark,
  faCaretDown,
  faUser,
  faRightFromBracket,
  faBook,
} from "@fortawesome/free-solid-svg-icons"
import Avatar from "react-avatar"
import "../../../public/css/slickSlider.css"
import "../../../public/css/slickSlider.css"
import Slider from "react-slick"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { FaCaretDown } from "react-icons/fa6"
import { Avatar as AvaterNext, AvatarFallback } from "@/components/ui/avatar"
import { useSession, signOut } from "next-auth/react"

const settings = {
  dots: false, // Dont Show dots for navigation
  infinite: true, // Infinite looping of slides
  speed: 5000, // Transition speed
  slidesToShow: 1, // Number of slides to show at a time
  slidesToScroll: 1, // Number of slides to scroll at a time
  arrows: false, // Disable the arrows
  autoplay: true, // Enable autoplay
  autoplaySpeed: 5000, // Autoplay speed in milliseconds (5000ms = 5 seconds)
}
const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)

  const [proUser, setProUser] = useState(false)
  const [authUser, setAuthUser] = useState(true)
  const [sideBarOpen, setSideBarOpen] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)
  const [packageText, setPackageText] = useState("")
  const { data: session } = useSession()
  const [inDropDown, setDropDownPointer] = useState(false)

  const dropdownRef = useRef(null)
  const navbarRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (proUser) {
      setPackageText("Pro User")
    } else {
      setPackageText("Free Trial user")
    }
  }, [proUser])

  let Links = [
    // { name: "HOME", link: "/" },
    {
      name: "Resources",
      link: "/resources",
      child1: "/demo-video",
      child2: "/blog",
      children: true,
      child: [
        {
          name: "Demo Videos",
          link: "/demo-video",
          parent: "RESOURCES",
        },
        {
          name: "Blog",
          link: "/blog",
          parent: "RESOURCES",
        },
      ],
    },
    {
      name: "Company",
      link: "/company",
      child1: "/about-us",
      child2: "/career",
      children: true,
      child: [
        {
          name: "About Us",
          link: "/about-us",
          parent: "COMPANY",
        },
        {
          name: "Career",
          link: "/career",
          parent: "COMPANY",
        },
      ],
    },
    { name: "Pricing", link: "/pricing" },
    { name: "Contact", link: "/contact" },
  ]

  const handleLinkClick = () => {
    setDropdownOpen(null)
    setOpen(false)
  }

  const handleDropdownEnter = (name) => {
    if (dropdownOpen === name) {
      setDropdownOpen(name)
    } else {
      setDropdownOpen(name)
    }
  }

  const handleDropdownLeave = () => {
    setDropdownOpen(null)
  }

  const handleDropdownClick = (name) => {
    if (dropdownOpen === name) {
      setDropdownOpen(null)
    } else {
      setDropdownOpen(name)
    }
  }

  const mouseEventEvent = () => {
    setPackageText("Upgrade")
  }
  const mouseLeaveEvent = () => {
    if (proUser) {
      setPackageText("Pro User")
    } else {
      setPackageText("Free Trial user")
    }
  }

  const pathname = usePathname()

  const getInitials = (fullName) => {
    const nameArray = fullName.trim().split(" ")
    const initials = nameArray
      .map((name) => name.charAt(0).toUpperCase())
      .join("")

    return initials
  }

  return (
    <>
      <div
        className="shadow-md w-full fixed top-0 left-0"
        style={{ zIndex: "9999" }}
        ref={navbarRef}
      >
        <div className="lg:flex items-center justify-between bg-white py-8 lg:px-10 px-7">
          {/* logo section */}

          <div className="w-fit">
            <Link href="/" onClick={handleLinkClick}>
              <div className="font-medium text-xl cursor-pointer flex items-center gap-1">
                <Image className="w-11 h-11" src={logo} alt="logo" />
                <h1 className="font-bold text-lg ml-2">
                  <span className="text-[#82D955]">Test</span>
                  <span className="text-[#3AB6FF]">Sprint</span>360
                </h1>
              </div>
            </Link>
          </div>

          {/* Menu icon */}
          <div
            onClick={() => setOpen(true)}
            className="absolute right-8 top-11 cursor-pointer lg:hidden w-7 h-7"
          >
            {/* {open ? (
              <img src={crossIcon} alt="crossIcon" />
            ) : (
              <img src={alignRight} alt="alignRight" />
            )} */}
            {!open && <Image src={alignRight} alt="alignRight" />}
          </div>

          {/* linked items */}
          <ul
            className={`hidden lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static bg-white lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-10  transition-all duration-500 ease-in ${
              open ? "top-[107px]" : "top-[-490px]"
            }`}
          >
            {Links?.map((link, index) =>
              link?.children ? (
                <li
                  className={`lg:ml-8 lg:my-0 my-7 font-semibold lg:relative  `}
                  key={`${link}----${index}`}
                  onClick={() => handleDropdownClick(link.name)}
                  onMouseEnter={() => handleDropdownEnter(link.name)}
                  onMouseLeave={() => handleDropdownLeave()}
                >
                  <div
                    className={`cursor-pointer  hover:text-blue-400 duration-500 uppercase  flex items-center ${
                      pathname.includes(link?.child1) ||
                      pathname.includes(link?.child2)
                        ? "text-blue-400"
                        : "text-[#818181]"
                    }`}
                  >
                    <div>{link.name}</div>{" "}
                    <div className="ml-3">
                      {" "}
                      <FaAngleDown
                        className={`${
                          dropdownOpen === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                  {dropdownOpen === link.name && (
                    <div
                      className={`lg:absolute pb-10 top-5 left-0 lg:bg-white  w-max margin mt-3 lg:mt-0 lg:py-2 `}
                      ref={dropdownRef}
                    >
                      <ul
                        style={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        }}
                        className="mt-2 lg:rounded-b-xl"
                      >
                        {link.child.map((child, childIndex) => {
                          // const isActive = pathname.includes(child.link)
                          return (
                            <>
                              <li
                                key={`${index}-${childIndex}`}
                                className={`px-3 py-3 font-semibold hover:text-blue-400 duration-500 ${
                                  pathname.includes(child.link)
                                    ? "text-blue-400"
                                    : "text-[#818181]"
                                }`}
                              >
                                <Link
                                  href={child.link}
                                  onClick={handleLinkClick}
                                  className={` uppercase   `}
                                >
                                  {child.name}
                                </Link>
                              </li>

                              {link.child.length - 1 > childIndex && <hr />}
                            </>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li className="lg:ml-8 lg:my-0 my-7 font-semibold" key={index}>
                  <Link
                    href={link?.link}
                    onClick={handleLinkClick}
                    className={`uppercase text-[#818181] hover:text-blue-400 duration-500 ${
                      pathname.includes(link.link) ? "text-blue-400" : ""
                    }`}
                  >
                    {link?.name}
                  </Link>
                </li>
              )
            )}
            <Link
              className=" block lg:hidden"
              href="/login"
              onClick={handleLinkClick}
            >
              <button className="hover:text-blue-400 text-xl  text-[#818181] lg:ml-8 font-semibold lg:px-4 pb-[6px] rounded-[30px] duration-500 lg:static">
                Login
              </button>
            </Link>
          </ul>
          <div
            className={`block lg:hidden h-screen w-full fixed  bg-[#00000080] transition-all duration-500 ease   ${
              open
                ? "top-0 right-0 opacity-100 visible"
                : " top-0 right-0 invisible opacity-0"
            } `}
          >
            <div
              className={` overflow-hidden overflow-y-auto h-full w-11/12 max-w-sm  ml-auto relative  bg-[#3AB6FF]  rounded-tl-3xl rounded-bl-3xl px-[15px] transition-all duration-500 ease ${
                open ? "right-0" : "right-[-100%]"
              } `}
            >
              <div
                className="text-end mb-3 sticky top-0 right-0 pt-[15px] bg-[#3AB6FF]"
                style={{ zIndex: "10" }}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  color="white"
                  className="text-3xl cursor-pointer "
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="" style={{ zIndex: "1" }}>
                {session && (
                  <div className="bg-[#3A9ED9]  px-3 pt-3 pb-2 rounded-xl">
                    <div className="flex items-center  gap-x-5 ">
                      <div>
                        {session?.user?.role == "USER" ? (
                          <AvaterNext>
                            <AvatarFallback className="bg-white text-[#3AB6FF] font-bold">
                              {getInitials(session?.user?.fullName)}
                            </AvatarFallback>
                          </AvaterNext>
                        ) : (
                          <AvaterNext>
                            <AvatarFallback className="bg-white text-[#3AB6FF] font-bold">
                              {getInitials(session?.user?.userName)}
                            </AvatarFallback>
                          </AvaterNext>
                        )}
                      </div>
                      <div className="">
                        {session?.user?.role == "USER" && (
                          <div className="flex gap-1 items-center">
                            <div className="font-semibold text-base text-white">
                              {session?.user?.fullName}
                            </div>
                            {proUser && (
                              <Image className="h-full" src={Pro} alt="" />
                            )}
                          </div>
                        )}

                        <div className="font-semibold text-sm text-gray-200 mt-1 break-all ">
                          {session?.user?.userName.charAt(0).toUpperCase() +
                            session?.user?.userName.slice(1)}
                        </div>
                      </div>
                    </div>
                    <div
                      className={` overflow-hidden  transition-all  duration-500 ease-in-out   ${
                        sideBarOpen ? "h-56  opacity-100" : "h-0 opacity-0"
                      }`}
                    >
                      <div className="mt-3 ">
                        <div className="flex justify-center">
                          {/* {!proUser && <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="px-5 py-2 border-2 border-[#8555EB] w-fit mx-auto text-white rounded-3xl">
                            {userState}
                          </div>
                          }
                          {proUser && <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="px-5 py-2 border-2 border-[#8555EB] w-fit mx-auto text-white rounded-3xl">
                          {userState}
                          </div>
                          } */}
                          {/* will be needed in the future */}
                          {/* <div className="max-w-[200px]">
                            {proUser ? (
                              <Slider {...settings}>
                                <div>
                                  <div className="px-5 py-2 border-2 border-[#8555EB] w-fit mx-auto text-white rounded-3xl">
                                    Pro User
                                  </div>
                                </div>

                                <div>
                                  <div
                                    tabIndex="0"
                                    className="px-5 py-2 border-2 cursor-pointer border-[#8555EB] focus:bg-[#4b3875] focus:border-[#4b3875] w-fit mx-auto text-white rounded-3xl bg-[#8555EB]"
                                  >
                                    Upgrade
                                  </div>
                                </div>
                              </Slider>
                            ) : (
                              <Slider {...settings}>
                                <div>
                                  <div className="px-5 py-2 border-2 border-[#8555EB] w-fit mx-auto text-white rounded-3xl">
                                    Free Trial User
                                  </div>
                                </div>

                                <div>
                                  <div
                                    tabIndex="0"
                                    className="px-5 py-2 border-2 cursor-pointer border-[#8555EB] focus:border-[#4b3875] w-fit mx-auto text-white rounded-3xl focus:bg-[#4b3875] bg-[#8555EB]"
                                  >
                                    Upgrade
                                  </div>
                                </div>
                              </Slider>
                            )}
                          </div> */}
                        </div>
                        <div className="mt-5">
                          <Link href="/profile">
                            <div className="flex gap-x-5 items-center cursor-pointer">
                              <div className="relative bottom-[-1px]">
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className="text-2xl "
                                  color="white"
                                />
                              </div>
                              <div className="text-white ">Profile</div>
                            </div>
                          </Link>
                          <hr className="mt-2" />
                          <div className="flex gap-x-5 items-center mt-5 cursor-pointer">
                            <div className="relative bottom-[-1px]">
                              <FontAwesomeIcon
                                icon={faBook}
                                className="text-2xl "
                                color="white"
                              />
                            </div>
                            <div className="text-white ">User Guides</div>
                          </div>
                          <hr className="mt-2" />
                          <div
                            className="flex gap-x-5 items-center mt-5 cursor-pointer"
                            onClick={() => signOut()}
                          >
                            <div className="relative bottom-[-2px]">
                              <FontAwesomeIcon
                                icon={faRightFromBracket}
                                className="text-2xl "
                                color="white"
                              />
                            </div>
                            <div className="text-white">Log out</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-2">
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        color="white"
                        className={`text-3xl cursor-pointer transition-all  duration-500 ease-in-out  ${
                          sideBarOpen ? "rotate-180" : "rotate-0"
                        }`}
                        onClick={() => setSideBarOpen(!sideBarOpen)}
                      />
                    </div>
                  </div>
                )}

                <ul className={`mt-8`}>
                  {Links?.map((link, index) =>
                    link?.children ? (
                      <li className="  mb-6" key={index}>
                        <div
                          onClick={() => handleDropdownClick(link.name)}
                          className={`pl-2 flex justify-between cursor-pointer  text-lg  duration-500 capitalize ${
                            pathname.includes(link?.child1) ||
                            pathname.includes(link?.child2)
                              ? "text-green-700"
                              : "text-white"
                          }`}
                        >
                          <span>{link.name.toUpperCase()}</span>{" "}
                          <span className="ml-3 ">
                            {" "}
                            {dropdownOpen === link.name ? (
                              <FontAwesomeIcon icon={faAngleUp} />
                            ) : (
                              <FontAwesomeIcon icon={faAngleDown} />
                            )}
                          </span>
                        </div>

                        <hr className="mt-2" />
                        {dropdownOpen === link.name && (
                          <ul
                            className={` top-8 left-0  w-max margin mt-3`}
                            ref={dropdownRef}
                          >
                            {link.child.map((child, childIndex) => {
                              const isActive = pathname.includes(child.link)
                              return (
                                <>
                                  <li
                                    key={`${index}-${childIndex}`}
                                    className={`${
                                      isActive ? "text-green-700" : "text-white"
                                    } pl-3 py-2 duration-500`}
                                  >
                                    <Link
                                      href={child.link}
                                      onClick={handleLinkClick}
                                      className={`  capitalize `}
                                    >
                                      {child.name}
                                    </Link>
                                  </li>

                                  {/* {link.child.length - 1 > childIndex && <hr />} */}
                                </>
                              )
                            })}
                          </ul>
                        )}
                      </li>
                    ) : (
                      <>
                        <li
                          className={`pl-2 mt-5 ${
                            pathname.includes(link.link)
                              ? "text-green-700"
                              : "text-white"
                          } duration-500`}
                          key={index}
                        >
                          <Link
                            href={link?.link}
                            onClick={handleLinkClick}
                            className={` text-lg  capitalize`}
                          >
                            {link?.name.toUpperCase()}
                          </Link>
                        </li>
                        <hr className="mt-2" />
                      </>
                    )
                  )}
                  {!session && (
                    <>
                      <div className="mt-6">
                        <Link
                          className="pl-2 "
                          href="/login"
                          onClick={handleLinkClick}
                        >
                          <button className="text-white text-lg focus:text-gray-400 duration-500 capitalize">
                            Login
                          </button>
                        </Link>
                        <hr className="mt-2" />
                      </div>
                    </>
                  )}
                </ul>
              </div>

              <div
                className="text-end  sticky bottom-0  pb-[15px] bg-[#3AB6FF]"
                style={{ zIndex: "10" }}
              ></div>
            </div>
          </div>

          <div className="hidden lg:block">
            {session ? (
              <div className="relative">
                <div className="flex items-center gap-2">
                  <div
                    className="relative cursor-pointer"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    {/* <Avatar size="40" round={true} name="Kaushik Das" color="#3AB6FF" fgColor="white" className="font-bold " /> */}
                    {session?.user?.role == "USER" ? (
                      <AvaterNext>
                        <AvatarFallback className="bg-[#3AB6FF] text-white font-semibold">
                          {getInitials(session?.user?.fullName)}
                        </AvatarFallback>
                      </AvaterNext>
                    ) : (
                      <AvaterNext>
                        <AvatarFallback className="bg-[#3AB6FF] text-white font-semibold">
                          {getInitials("Admin")}
                        </AvatarFallback>
                      </AvaterNext>
                    )}

                    {
                      proUser && (
                        <Image
                          className="absolute top-[-5px] right-[-2px]"
                          src={Pro}
                          alt=""
                        />
                      )

                      // <div className="absolute w-fit ml-1 py-[0.5] px-1 bg-[#FFC42C] rounded-full top-[-10px] right-[-5px]"> <FontAwesomeIcon icon={faCrown} className="h-4 w-4" color="white" />
                      //  </div>
                    }
                  </div>
                  <div>
                    <FaCaretDown
                      color="#808080"
                      className={`text-base cursor-pointer transition-all  duration-500 ease-in-out  ${
                        profileOpen ? "rotate-180" : "rotate-0"
                      }`}
                      onClick={() => setProfileOpen(!profileOpen)}
                    />
                    {/* <FontAwesomeIcon icon={faCaretDown} color="#808080" className={`text-base cursor-pointer transition-all  duration-500 ease-in-out  ${profileOpen ? "rotate-180" : "rotate-0"}`} onClick={() => setProfileOpen(!profileOpen)}  /> */}
                  </div>
                </div>
                <div
                  ref={profileRef}
                  className={`min-w-[250px] absolute  right-0 p-5 bg-white transition-all duration-500 ease-linear ${
                    profileOpen
                      ? "opacity-100 top-[120%]"
                      : "opacity-0 top-[-500px]"
                  }`}
                  style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
                >
                  {session?.user?.role == "USER" && (
                    <div className="text-base text-[#2F2F2F] text-center font-bold">
                      {session?.user?.fullName}
                    </div>
                  )}
                  <div
                    className={`${
                      session?.user?.role == "ADMIN"
                        ? "text-base font-bold"
                        : "text-sm"
                    } text-[#2F2F2F] text-center mt-1`}
                  >
                    {session?.user?.userName.charAt(0).toUpperCase() +
                      session?.user?.userName.slice(1)}
                  </div>
                  {/* will be needed in the future */}
                  {/* <div
                    onMouseEnter={mouseEventEvent}
                    onMouseLeave={mouseLeaveEvent}
                    className="min-w-[200px] px-5 py-2 border-2 border-[#8555EB] hover:text-white hover:border-[#8555EB] hover:bg-[#8555EB] w-fit mx-auto text-[#818181] rounded-3xl mt-4 text-center transition-all duration-500 ease-in-out cursor-pointer"
                  >
                    {packageText}
                  </div> */}
                  <hr className="mt-4 border-t-2" />
                  <div className="mt-6">
                    <div className="w-fit">
                      <Link href="/profile">
                        <div className="flex gap-x-5 items-center cursor-pointer ">
                          <div className="relative bottom-[-1px]">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="text-xl"
                              color="#A6A6A6"
                            />
                          </div>
                          <div className="text-[#A6A6A6] ">Profile</div>
                        </div>
                      </Link>
                    </div>
                    <hr className="mt-5" />
                    <div className="w-fit mt-5">
                      <div className="flex gap-x-5 items-center cursor-pointer">
                        <div className="relative bottom-[-1px]">
                          <FontAwesomeIcon
                            icon={faBook}
                            className="text-xl"
                            color="#A6A6A6"
                          />
                        </div>
                        <div className="text-[#A6A6A6] ">User Guides</div>
                      </div>
                    </div>
                    <hr className="mt-5" />
                    <div className="w-fit mt-5">
                      <div
                        className="flex gap-x-5 items-center cursor-pointer "
                        onClick={() => signOut()}
                      >
                        <div className="relative bottom-[-2px]">
                          <FontAwesomeIcon
                            icon={faRightFromBracket}
                            className="text-xl"
                            color="#A6A6A6"
                          />
                        </div>
                        <div className="text-[#A6A6A6] cur">Log out</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link className="" href="/login" onClick={handleLinkClick}>
                  <button className="hover:text-blue-400  text-xl text-[#818181] lg:ml-8 font-semibold px-4 py-[6px] rounded-[30px] duration-500 lg:static">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
