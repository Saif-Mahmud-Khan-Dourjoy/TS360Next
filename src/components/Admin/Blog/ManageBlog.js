"use client"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import { FaAngleLeft } from "react-icons/fa6"
import { MdOutlineTextFields } from "react-icons/md"
import { BiCategoryAlt } from "react-icons/bi"
import { IoTimeOutline, IoPricetagsOutline } from "react-icons/io5"
import fileUpload from "../../../../public/Blog/fileUpload.svg"
import Select from "react-select"

import makeAnimated from "react-select/animated"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import {
  BlogCategory,
  DraftBlog,
  GetBlogBySlug,
  PublishNewBlog,
  TagSuggestions,
  UpdateBlog,
} from "@/API/Admin/BlogApi"
import { useSession } from "next-auth/react"
import { showErrorAlert, showSuccessAlert } from "@/components/Alerts/Alert"
const ReactQuillComponent = dynamic(() => import("./ClientOnlyQuill.js"), {
  ssr: false,
})

const animatedComponents = makeAnimated()

const allowedFileTypes = ["JPG", "PNG", "jpg", "png", "jpeg", "JPEG", "jpeg"]

const options = [
  {
    label: "a",
    value: "b",
  },
]

// const customStyles = {
//   control: (provided, state) => ({
//     ...provided,
//     zIndex: 9999,
//     border: "none", // Remove all borders
//     borderBottom: state.isFocused ? "1px solid black" : "1px solid #ccc", // Only bottom border with color change on focus
//     borderRadius: 0, // Remove border radius to avoid rounded corners
//     boxShadow: "none", // Remove default box-shadow
//     "&:hover": {
//       borderBottom: state.isFocused ? "1px solid black" : "1px solid #999", // Change bottom border color on hover
//     },
//   }),
// }
const customStyles = (error) => ({
  control: (provided, state) => ({
    ...provided,
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: error
      ? "1px solid red"
      : state.isFocused
      ? "1px solid black"
      : "1px solid #ccc",
    boxShadow: "none",
    minHeight: "41px",
    borderRadius: "0",

    "&:hover": {
      borderBottom: error
        ? "1px solid red"
        : state.isFocused
        ? "1px solid black"
        : "1px solid #ccc",
    },
  }),
})
export default function CreateBlog() {
  const [selectedFile, setSelectedFile] = useState()
  const [error, setError] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [text, setText] = useState("")
  const [menuTarget, setMenuTarget] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [tagSuggestion, setTagSuggestion] = useState([])
  const [inputValue, setInputValue] = useState("")
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
 
  const status = searchParams.get("status")
  const slug = searchParams.get("slug")
  const [coverImagePrevious, setCoverImagePrevious] = useState("")
  const { data: session } = useSession()
  const router = useRouter()
  const [category, setCategory] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    blogCategories: [],
    timeRequiredToRead: "",
    visible: false,
    coverImage: null,
    tags: [],
    featured: false,
  })

  useEffect(() => {
    if (slug) {
      GetBlogBySlug(slug, session?.accessToken).then((res) => {
        if (res?.[0]) {
          console.log(res?.[0])
          setValues({
            title: res?.[0].title,
            description: res?.[0].description,
            timeRequiredToRead: res?.[0].timeRequiredToRead,
            featured: res?.[0].featured,
            visible: res?.[0].visible,
            coverImage: null,
            blogCategories: res?.[0].blogCategories?.map((item) => {
              return { label: item.name, value: item.id, id: item.id }
            }),
            tags: res?.[0].tags,
          })
          setSelectedFile(res?.[0].coverImagePath)
          setCoverImagePrevious(res?.[0].coverImagePath)
          setSelectedOptions(
            res?.[0].tags?.map((item) => {
              return { label: item, value: item }
            })
          )
        } else {
          setValues({
            title: "",
            description: "",
            timeRequiredToRead: "",
            featured: false,
            visible: false,
            coverImage: null,
            blogCategories: [],
            tags: [],
          })

          setSelectedFile(null)
        }
      })
    }
  }, [slug, session])

  useEffect(() => {
    BlogCategory(session?.accessToken).then((res) => {
      if (res?.[0]) {
        console.log(res)
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
  }, [session])

  useEffect(() => {
    TagSuggestions(session?.accessToken).then((res) => {
      if (res?.[0]) {
        console.log(res?.[0])
        let suggArr = []
        let sugg = [...res?.[0]]
        sugg?.map((sugg) => {
          suggArr.push({ label: sugg, value: sugg })
        })
        setTagSuggestion(suggArr)
      } else {
        setTagSuggestion([])
      }
    })
  }, [session])

  const quillText = (value) => {
    setValues({ ...values, description: value })
  }
  const handleInputChange = (newValue) => {
    console.log(newValue)
    setInputValue(newValue)
  }

  const handleMultiCategory = (selected) => {
    setValues({ ...values, blogCategories: selected })
  }
  const handleMulti = (selected) => {
    console.log(selected)
    setSelectedOptions(selected)
    let options = [...selected]
    let selectedTags = options.map((item) => {
      return item?.value
    })
    setValues({ ...values, tags: selectedTags })
  }

  const handleCreateOption = (inputValue) => {
    console.log(inputValue)
    const newOption = { value: inputValue, label: inputValue }
    setSelectedOptions((prevOptions) => [...prevOptions, newOption])
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue) {
      event.preventDefault()
      setValues({ ...values, tags: [...values.tags, inputValue] })
      handleCreateOption(inputValue)
      setInputValue("")
    }
  }

  useEffect(() => {
    setMenuTarget(document.body) // Set the target after the component mounts
  }, [])

  const handleFileChange = (file) => {
    console.log(file)
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase()
      if (allowedFileTypes.includes(fileExtension)) {
        const imageUrl = URL.createObjectURL(file)
        setSelectedFile(imageUrl)
        // setSelectedFile(file)
        setError(false)
      } else {
        setError(true)
      }
    }
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
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      timeRequiredToRead: Yup.string().required(
        "time required ro read is required"
      ),
      featured: Yup.boolean(),
      visible: Yup.boolean(),
      coverImage: id
        ? Yup.string().nullable()
        : Yup.mixed().required("Cover Image is required"),
      blogCategories: Yup.array()
        .min(1, "At least one Category must be selected")
        .required("Category is required"),
      tags: Yup.array()
        .min(1, "At least one tag must be selected")
        .required("Tag is required"),
    }),
    onSubmit: (values) => {
      
      const blogContent = {
        title: values.title,
        description: values.description,
        blogCategories: values.blogCategories,
        timeRequiredToRead: values.timeRequiredToRead,
        visible: values.visible,
        featured: values.featured,
        tags: values.tags,
      }
      if (id) {
        blogContent.id = Number(id)
        if (!values.coverImage) {
          blogContent.coverImagePath = coverImagePrevious
        }
        handleFormUpdate(blogContent)
      } else {
        handleFormSubmit(blogContent)
      }
    },
  })

  useEffect(() => {
    if (values?.title) {
      setTitleError(false)
    } else {
      setTitleError(true)
    }
  }, [values?.title])

  const handleFormSubmit = async (blogContent) => {
    PublishNewBlog(blogContent, values?.coverImage, session?.accessToken).then(
      (res) => {
        if (res?.[0]) {
          showSuccessAlert("Blog posted successfully", "center", 2000)
          router.push(`/admin/blog`)
        } else {
          showErrorAlert(res?.[1], "center", 2000)
        }
      }
    )
  }
  const handleFormUpdate = async (blogContent) => {
    UpdateBlog(id, blogContent, values?.coverImage, session?.accessToken).then(
      (res) => {
        if (res?.[0]) {
          showSuccessAlert("Blog Updated successfully", "center", 2000)
          router.push(`/admin/blog`)
        } else {
          showErrorAlert(res?.[1], "center", 2000)
        }
      }
    )
  }

  const saveAsDraft = async (e) => {
    e.preventDefault()
    if (!values?.title) {
      showErrorAlert("Title is required", "center", 2000)
      return
    }

    const blogContent = {
      title: values.title,
      description: values.description,
      blogCategories: values.blogCategories,
      timeRequiredToRead: values.timeRequiredToRead,
      visible: values.visible,
      featured: values.featured,
      tags: values?.tags,
    }

    if (id) {
      blogContent.id = Number(id)
      if (!values.coverImage) {
        blogContent.coverImagePath = coverImagePrevious
      }
    }
    
    DraftBlog(blogContent, values?.coverImage, session?.accessToken).then(
      (res) => {
        if (res?.[0]) {
          showSuccessAlert("Blog Drafted successfully", "center", 2000)
          router.push(`/admin/blog`)
        } else {
          showErrorAlert(res?.[1], "center", 2000)
        }
      }
    )
  }

  const clearData = () => {
    setValues({
      title: "",
      description: "",
      blogCategories: [],
      timeRequiredToRead: "",
      visible: false,
      coverImage: null,
      tags: [],
      featured: false,
    })
  }

  console.log(values)

  return (
    <>
      <div className="flex flex-col sm:flex-row  justify-between w-full ">
        <div className="  text-sm text-[#A6A6A6] cursor-pointer mb-2 sm:mb-0">
          <Link href="/admin/blog" className="flex items-center">
            {" "}
            <FaAngleLeft /> <span className="ml-1">Back to Blog</span>{" "}
          </Link>
        </div>

        <h1 className="text-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 font-medium font-poppins">
          {id ? "Update Blog" : "Write New Blog"}
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-10 w-[100%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto">
          <div className="flex gap-4">
            <div>
              <MdOutlineTextFields size={20} className="text-[#486681]" />
            </div>
            <div className="w-full">
              <input
                type="text"
                className={`border-b focus:border-b-blue-600 ${
                  touched.title && errors.title ? "border-b-red-600" : ""
                } w-full text-gray-500`}
                name="title"
                placeholder="Blog Title"
                value={values?.title}
                onChange={(e) => {
                  setValues({ ...values, title: e.target.value })
                }}
                onBlur={handleBlur}
              />
              {((touched.title && errors.title) || titleError) && (
                <div className="text-[12px] text-red-600">
                  {errors.title ? errors.title : "Title is Required"}
                </div>
              )}
              <div className="text-[12px] text-[#A6A6A6]">
                Please note: Once published, this title cannot be changed.
              </div>
            </div>
          </div>
          <div className="mt-10">
            {!selectedFile ? (
              <FileUploader
                handleChange={(e) => {
                  handleFileChange(e)
                  setValues({
                    ...values,
                    coverImage: e,
                  })
                }}
                name="file"
                types={allowedFileTypes}
              >
                <div
                  className={`flex items-center flex-col px-5 sm:px-0 py-16 bg-[#3ab6ff14] border-2 ${
                    touched.coverImage && errors.coverImage
                      ? "border-red-600"
                      : "border-[#3AB6FF]"
                  } rounded-3xl border-dashed`}
                >
                  <Image
                    src={fileUpload}
                    alt="Upload File"
                    className="mb-5 max-h-[50px]"
                  />
                  <div className="drag-drop text-[#818181] font-semi text-sm lg:text-base mb-2">
                    Drag & drop your blog thumbnail here
                  </div>
                  <div className="or text-[#A6A6A6] font-normal text-sm lg:text-base mb-2">
                    or
                  </div>
                  <div className="browse-button text-[#14A8FF] font-semibold underline mb-2">
                    Choose file
                  </div>
                  <div className="or text-[#A6A6A6] font-normal text-sm ">
                    N.B: Only JPG,PNG, JPEG file is allowed to upload
                  </div>
                </div>
              </FileUploader>
            ) : (
              <>
                <div className="flex  gap-2  px-5  py-16 bg-[#3ab6ff14] border-2 border-[#3AB6FF] border-dashed rounded-3xl">
                  <div className="choose-file-details w-[70%] sm:w-[60%] mx-auto">
                    <div className="step-title text-center mb-2 underline text-lime-700 font-bold">
                      Chosen File Details
                    </div>
                    {/* <div className="text-yellow-700">
                    <div className="mb-1">
                      File Name:{" "}
                      {selectedFile
                        ? selectedFile?.name.length > 20
                          ? selectedFile?.name.substring(0, 20) + "..."
                          : selectedFile?.name
                        : ""}
                    </div>
                    <div className=" mb-1">
                      File Size: {selectedFile?.size} bytes
                    </div>
                    <div className=" mb-1">File Type: {selectedFile?.type}</div>
                    <div className=" mb-1">
                      Last Modified:{" "}
                      {selectedFile?.creationDate?.toString()}
                    </div>
                  </div> */}
                    <Image
                      src={selectedFile}
                      alt="Uploaded Preview"
                      width={250}
                      height={150}
                      className="mx-auto"
                    />
                  </div>
                  <div className="choose-another border-l  sm:border-l-gray-500 pl-2  flex-1">
                    <div
                      style={{}}
                      className="text-red-800  font-bold mb-2 text-center"
                    >
                      Wrong File?
                    </div>
                    <div
                      className="custom-chosen-another-file text-[#14A8FF] font-semibold underline text-center cursor-pointer"
                      onClick={() => {
                        setSelectedFile()
                        setValues({
                          ...values,
                          coverImage: null,
                        })
                      }}
                    >
                      Choose Another
                    </div>
                  </div>
                </div>
              </>
            )}

            {touched.coverImage && errors.coverImage && (
              <div className="text-[12px] text-red-600 mt-1 ml-1">
                {errors.coverImage}
              </div>
            )}

            {error ? (
              <div className=" w-[90%] mx-auto my-5 text-red-500">
                Only PNG, JPG, JPEG file is allowed to upload
              </div>
            ) : null}
          </div>
          <div className="mt-14">
            <ReactQuillComponent
              value={values?.description}
              quillText={quillText}
            />
            {touched.description && errors.description && (
              <div className="text-[12px] text-red-600">
                {errors.description}
              </div>
            )}
          </div>

          <div className="mt-10 flex items-center gap-4 w-full">
            <div>
              <BiCategoryAlt size={20} className="text-[#486681]" />
            </div>
            <div className="w-full">
              <Select
                className="w-full"
                components={animatedComponents}
                isMulti
                value={values?.blogCategories}
                onChange={handleMultiCategory}
                options={category}
                placeholder="Select category"
                isClearable
                menuPortalTarget={menuTarget}
                menuPlacement="auto"
                styles={customStyles(
                  errors.blogCategories && touched.blogCategories
                )}
              />
              {errors.blogCategories && touched.blogCategories && (
                <p className="text-red-500 text-[12px] mt-1">
                  {errors.blogCategories}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-10">
            <div>
              <IoPricetagsOutline size={20} className="text-[#486681]" />
            </div>
            <div className="w-full">
              <Select
                components={animatedComponents}
                isMulti
                value={selectedOptions}
                onChange={handleMulti}
                options={tagSuggestion}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onKeyDown={handleKeyDown} // Handle Enter key press
                placeholder="Select or write tags..."
                isClearable
                noOptionsMessage={() => "Type to create a new tag"}
                menuPortalTarget={menuTarget}
                menuPlacement="auto"
                styles={customStyles(errors.tags && touched.tags)}
              />
              {errors.tags && touched.tags && (
                <p className="text-red-500 text-[12px] mt-1">{errors.tags}</p>
              )}
            </div>
          </div>

          <div className="mt-10  flex flex-wrap  items-center justify-between gap-2">
            <div>
              <input
                checked={values?.featured ? true : false}
                name="featured"
                type="checkbox"
                className={` w-3 h-3 border rounded bg-gray-50 focus:ring-3 focus:ring-blue-300`}
                onChange={(e) =>
                  setValues({
                    ...values,
                    featured: !values.featured,
                  })
                }
              />
              <span className="text-[#818181] ml-2">Featured Post</span>
            </div>
            <div>
              <input
                checked={values?.visible ? true : false}
                name="visible"
                type="checkbox"
                className={`w-3 h-3 border rounded bg-gray-50 focus:ring-3 focus:ring-blue-300`}
                onChange={(e) =>
                  setValues({
                    ...values,
                    visible: !values.visible,
                  })
                }
              />
              <span className="text-[#818181] ml-2">Make this blog public</span>
            </div>

            <div className="flex gap-2 items-center">
              <div>
                <IoTimeOutline size={15} className="text-[#486681]" />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  className={`text-sm border-b focus:border-b-blue-600 ${
                    touched.timeRequiredToRead && errors.timeRequiredToRead
                      ? "border-b-red-600"
                      : ""
                  } w-full text-gray-500`}
                  name="timeRequiredToRead"
                  placeholder="Time in min/sec/hr"
                  value={values?.timeRequiredToRead}
                  onChange={(e) => {
                    setValues({ ...values, timeRequiredToRead: e.target.value })
                  }}
                  onBlur={handleBlur}
                />
                {touched.timeRequiredToRead && errors.timeRequiredToRead && (
                  <div className="text-[12px] text-red-600">
                    {errors.timeRequiredToRead}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={`mt-20 mb-5 flex ${
              id ? "justify-center " : "justify-between"
            } items-center flex-wrap gap-4`}
          >
            <div
              className={`text-[#486681] font-medium underline cursor-pointer ${
                id ? "hidden " : "block"
              }`}
              onClick={clearData}
            >
              Clear all
            </div>
            {(!id || status === "DRAFTED") && (
              <div className="flex gap-5 flex-wrap">
                <button
                  onClick={(e) => saveAsDraft(e)}
                  className="bg-transparent hover:bg-[#cca238] text-[#3AB6FF] font-semibold hover:text-white py-[6px] px-4 border border-[#3AB6FF] hover:border-transparent rounded text-sm"
                >
                  Save as Draft
                </button>
                <button className="bg-[#3AB6FF] hover:bg-blue-700 text-white py-[6px] px-4 rounded text-sm font-semibold">
                  Post
                </button>
              </div>
            )}
            {id && status === "PUBLISHED" && (
              <div className="flex gap-5 flex-wrap">
                <button className="bg-[#3AB6FF] hover:bg-blue-700 text-white py-[6px] px-4 rounded text-sm font-semibold">
                  Update
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  )
}
