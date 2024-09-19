"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import noImage from "../../../public/Blog/noImage.png"
import moment from "moment"
import Arrow from "../../../public/Blog/Arrow.png"
export default function RelatedBlog({ relatedBlogs }) {
  const pathname = usePathname()
  console.log(pathname)

  const makePath = () => {
    let pathArr = pathname.split("/")

    pathArr.shift()
    pathArr.pop()
    return `/${pathArr.join("/")}`
  }
  const getCategory = (category) => {
    let catArr = category?.map((cat) => {
      return cat?.name
    })
    return catArr.join(", ")
  }
  return (
    <div className="mt-6">
      <div className="text-3xl font-bold">Related Articles</div>
      <div className="mt-12">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
          {relatedBlogs?.map((item, index) => (
            <Link
              href={`${makePath()}/${item?.slug}`}
              className="cursor-pointer relative transition-all duration-500 hover:-translate-y-6"
              style={{
                borderRadius: "10px",
                background: "#FFF",
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              }}
              key={`allBlog-${index}`}
            >
              {" "}
              <div>
                <div
                  className="overflow-hidden"
                  style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                >
                  <div className="relative h-[280px] hover:scale-110 transition-all duration-500">
                    {item?.coverImagePath ? (
                      <Image
                        src={item?.coverImagePath}
                        className="rounded-l-lg object-center object-cover h-full w-full"
                        alt="blog image"
                        fill
                      />
                    ) : (
                      <Image
                        src={noImage}
                        alt="blog image"
                        fill
                        className="rounded-l-lg object-center object-cover h-full w-full"
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-2 justify-between text-sm pt-5 px-5">
                  <div className="text-[#3AB6FF] font-semibold">
                    {getCategory(item?.blogCategories)}
                  </div>
                  <div className=" text-[#A6A6A6] font-semibold">
                    {moment(item?.creationDate).format("DD MMMM, YYYY")}
                  </div>
                </div>

                <div className="mt-5 pb-20  text-xl md:text-2xl font-semibold text-gray-950 px-5">
                  {item?.title}
                </div>

                <div className="absolute bottom-5 w-full">
                  <div className="flex justify-between w-full px-5">
                    <div className="text-[#545454] font-medium  cursor-pointer">
                      Read Article
                    </div>
                    <div>
                      <Image src={Arrow} alt="" className="cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
