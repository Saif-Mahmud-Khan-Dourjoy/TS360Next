"use client"
import Image from "next/image"
import Link from "next/link"
import Arrow from "../../../public/Blog/Arrow.png"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import moment from "moment"
import noImage from "../../../public/Blog/noImage.png"
import EmptyBlog_Image from "../../../public/Blog/EmptyBlog_Image.png"
import NotFoundData from "../../../public/nodatafound.png"

export default function AllPost({ searchParams, blogData }) {
  const searchParam = useSearchParams()
  const router = useRouter()
  const params = new URLSearchParams(searchParam.toString())
  const pathname = usePathname()
  

  const setSelectedTab2 = (tab) => {
    if (tab) {
      params.delete("filter")
    }
    params.set("filter", tab)

    router.replace(`${pathname}?${params.toString()}`)
  }

  const getCategory = (category) => {
    let catArr = category?.map((cat) => {
      return cat?.name
    })
    return catArr.join(", ")
  }

  return (
    <>
      {!searchParams?.search &&
        (blogData?.RECENT?.length > 0 ||
          blogData?.POPULAR?.length > 0 ||
          (blogData?.FEATURED !== null && blogData?.FEATURED !== null)) && (
          <div className="flex-col md:flex-row  flex justify-between mt-8 gap-x-8 gap-y-8">
            <div className="md:w-[55%] lg:w-[60%] xl:w-[65%] 2xl:w-[70%] cursor-pointer">
              {blogData?.FEATURED !== null &&
              blogData?.FEATURED !== undefined ? (
                <Link href={`${pathname}/${blogData?.FEATURED?.slug}`}>
                  {" "}
                  <div className="w-full relative min-h-[400px]  sm:h-full">
                    <div className="h-full w-full">
                      <Image
                        className="rounded-lg "
                        src={blogData?.FEATURED?.coverImagePath}
                        alt="Blog Cover"
                        fill // This is the new way in Next.js 14 to fill the container
                        objectFit="cover" // Optional: controls how the image should fill the container
                      />
                    </div>
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-900/40 rounded-lg"></div>

                    <div className="absolute top-5  left-8  w-fit px-6 py-2 bg-[#6234c5] rounded-lg text-white">
                      Featured Article
                    </div>
                    <div className="absolute top-[70%] transform -translate-y-[70%] px-8 text-lg md:text-xl lg:text-2xl w-full md:w-[80%] lg:w-[70%] xl:w-[50%] text-white font-semibold">
                      {blogData?.FEATURED?.title}
                    </div>
                    <div className="w-full py-3 md:py-5 px-8 bg-[#3AB6FF] absolute left-0 bottom-0 rounded-b-lg">
                      <div className="flex justify-between gap-2">
                        <div className="text-white">
                          {getCategory(blogData?.FEATURED?.blogCategories)}
                        </div>
                        <div className="text-white">
                          {moment(blogData?.FEATURED?.creationDate).format(
                            "DD MMMM, YYYY"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="w-full h-full relative flex justify-center items-center">
                  <div className="md:text-xl text-gray-400 font-medium h-fit w-fit">
                    No data found of Featured Article
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 pt-3">
              <div className="w-full sm:w-[70%] md:w-full flex justify-between mx-auto">
                <div
                  className={`transition-all duration-100 flex justify-center w-1/2 text-lg cursor-pointer ${
                    searchParams.filter == "recent"
                      ? "text-[#3AB6FF] border-b-2 pb-1 border-b-[#3AB6FF]"
                      : "text-[#A6A6A6]"
                  }`}
                  onClick={() => setSelectedTab2("recent")}
                >
                  Recent
                </div>
                <div
                  className={`transition-all duration-100 flex justify-center w-1/2 text-lg cursor-pointer ${
                    searchParams.filter == "popular"
                      ? "text-[#3AB6FF] border-b-2 pb-1 border-b-[#3AB6FF]"
                      : "text-[#A6A6A6]"
                  }`}
                  onClick={() => setSelectedTab2("popular")}
                >
                  Popular
                </div>
              </div>
              {searchParams.filter == "recent" &&
                (blogData?.RECENT.length > 0 ? (
                  <div className=" mt-7 md:mt-4">
                    {blogData?.RECENT?.slice(0, 3)?.map((item, index) => (
                      <div
                        className="cursor-pointer mb-4 last:mb-0 "
                        key={`recent-${index}`}
                      >
                        <Link href={`${pathname}/${item?.slug}`}>
                          {" "}
                          <div className="w-full sm:w-[70%] md:w-full flex gap-x-3 border-2 border-[#edecec] rounded-lg mx-auto">
                            <div className="w-[30%] flex-none relative">
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
                            <div className="flex-1 p-2 flex flex-col justify-between">
                              <div className="font-semibold">{item?.title}</div>
                              <div className="flex gap-2 justify-between text-sm mt-6 text-[#818181]">
                                <div>{getCategory(item?.blogCategories)}</div>
                                <div>
                                  {moment(item?.creationDate).format(
                                    "DD MMMM, YYYY"
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-col justify-center items-center">
                    <Image className="h-fit w-fit" src={NotFoundData} alt="" />
                  </div>
                ))}

              {searchParams.filter == "popular" &&
                (blogData?.POPULAR.length > 0 ? (
                  <div className="mt-7 md:mt-4">
                    {blogData?.POPULAR?.slice(0, 3)?.map((item, index) => (
                      <div
                        className="cursor-pointer mb-4 last:mb-0 "
                        key={`popular-${index}`}
                      >
                        <Link href={`${pathname}/${item?.slug}`}>
                          {" "}
                          <div className="w-full sm:w-[70%] md:w-full flex gap-x-3 border-2 border-[#edecec] rounded-lg mx-auto">
                            <div className="w-[30%] flex-none relative">
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
                            <div className="flex-1 p-2 flex flex-col justify-between">
                              <div className="font-semibold">{item?.title}</div>
                              <div className="flex gap-2 justify-between text-sm mt-6 text-[#818181]">
                                <div>{getCategory(item?.blogCategories)}</div>
                                <div>
                                  {moment(item?.creationDate).format(
                                    "DD MMMM, YYYY"
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-col justify-center items-center">
                    <Image className="h-fit w-fit" src={NotFoundData} alt="" />
                  </div>
                ))}
            </div>
          </div>
        )}
      {blogData?.ALL.length > 0 ? (
        <div className="mt-20 mb-5">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            {blogData?.ALL?.map((item, index) => (
              <Link
                href={`${pathname}/${item?.slug}`}
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
      ) : (
        <div className="my-10 flex flex-col justify-between items-center gap-4">
          <div>
            <Image src={EmptyBlog_Image} alt="" />
          </div>
          <div className="w-full sm:w-[90%] md:w-[70%] xl:w-[40%] mx-auto text-center text-xl">
            {`We're brewing up some bright ideas for this category. Check back soon for new content!`}
          </div>
        </div>
      )}
    </>
  )
}
