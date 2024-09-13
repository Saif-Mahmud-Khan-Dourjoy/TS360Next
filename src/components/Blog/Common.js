"use client"
import { BlogCategory } from "@/API/Admin/BlogApi"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"
let timeoutId
export default function Common() {
  const router = useRouter()
  const pathname = usePathname()
  const parts = pathname.split("/")
  const blogType = parts[2]
  const blogId = parts[3]
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState([])
  useEffect(() => {
    BlogCategory().then((res) => {
      if (res?.[0]) {
        
        let catArr = []
        let category = [...res?.[0]]
        category?.map((cat, ind) => {
          catArr.push({ label: cat.name, value: cat.id, id: cat.id })
        })
        setCategory(catArr)
      } else {
        setCategory([])
      }
    })
  }, [])

  useEffect(() => {
    setSearch("")
  }, [pathname])
  useEffect(() => {
    timeoutId = setTimeout(() => {
      if (search) {
        params.set("search", search)
      } else {
        params.delete("search")
      }

      router.replace(`${pathname}?${params.toString()}`)
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [search])
  const setSelectedTab = (tab) => {
    if (tab == "All") {
      router.replace(`/blog/${tab}?filter=recent`)
    } else {
      router.replace(`/blog/${tab}`)
    }
  }
  const setSearchQuery = (e) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      params.set("search", e.target.value)
      router.replace(`${pathname}?${params.toString()}`)
    }, 1000)
  }

  return !blogId ? (
    <>
      <div
        className="font-bold text-3xl md:text-5xl text-center "
        data-aos="flip-left"
      >
        <span className="text-gray-900 ">Stay</span>{" "}
        <span className="text-[#3AB6FF]">Ahead</span>
        <span className="text-gray-900 ml-2">of the Tech Curve</span>
      </div>

      <div className="mt-10">
        <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-y-4">
          <div className="hidden lg:flex gap-x-5 ">
            <div
              className={`cursor-pointer text-lg border-r-2 pr-5 h-fit ${
                pathname.includes("All") ? "text-[#3AB6FF]" : "text-[#A6A6A6]"
              }`}
              onClick={() => setSelectedTab("All")}
            >
              All Posts
            </div>
            {category?.map((item, index) => (
              <div
                key={`blogCategory-${index + 1}`}
                className={`cursor-pointer text-lg ${
                  index + 1 < category?.length ? "border-r-2" : ""
                }  pr-5 h-fit ${
                  decodeURIComponent(pathname).includes(item?.label)
                    ? "text-[#3AB6FF]"
                    : "text-[#A6A6A6]"
                }`}
                onClick={() => setSelectedTab(item?.label)}
              >
                {item?.label}
              </div>
            ))}
          </div>
          <div className="block lg:hidden">
            <select
              name=""
              id=""
              className="text-[#8d8b8b]"
              onChange={(e) => setSelectedTab(e.target.value)}
            >
              <option value="All">All Posts</option>
              {category?.map((cat, index) => (
                <option key={`dropdown-cat-${index}`} value={cat?.label}>
                  {cat?.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end" style={{ zIndex: "0" }}>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 pr-8 w-[200px] border-2 border-[#e2e2e2] rounded-md focus:border-[#3AB6FF]"
              />
              <FaMagnifyingGlass className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#9a9999]" />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  )
}
