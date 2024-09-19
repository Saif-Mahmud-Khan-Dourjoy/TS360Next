"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import { FaAngleLeft } from "react-icons/fa6"
import { MdOutlineTextFields } from "react-icons/md"
import { BiCategoryAlt } from "react-icons/bi"
import { IoUnlink, IoKeyOutline } from "react-icons/io5"
import fileUpload from "../../../../public/Blog/fileUpload.svg"
import Select from "react-select"
import {
  AddNewVideo,
  GetVideoById,
  UpdateVideo,
  VideoCategory,
} from "@/API/Admin/VideoApi"
import { useSession } from "next-auth/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import makeAnimated from "react-select/animated"
import { showErrorAlert, showSuccessAlert } from "@/components/Alerts/Alert"
const animatedComponents = makeAnimated()
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

const allowedFileTypes = ["JPG", "PNG", "jpg", "png", "jpeg", "JPEG", "jpeg"]
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

export default function ManageVideo() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const { data: session } = useSession()
  const [selectedFile, setSelectedFile] = useState()
  const [error, setError] = useState(false)
  const [thumbnailPrevious, setThumbnailPrevious] = useState("")
  const [menuTarget, setMenuTarget] = useState(null)
  const [category, setCategory] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    uniqueValue: "",
    visible: false,
    thumbnail: null,
    videoCategories: [],
  })

  useEffect(() => {
    setMenuTarget(document.body) // Set the target after the component mounts
  }, [])

  useEffect(() => {
    if (id) {
      GetVideoById(id, session?.accessToken).then((res) => {
        if (res?.[0]) {
          console.log(res?.[0])
          setValues({
            title: res?.[0].title,
            description: res?.[0].description,
            url: res?.[0].url,
            uniqueValue: res?.[0].uniqueValue,
            visible: res?.[0].visible,
            thumbnail: null,
            videoCategories: res?.[0].videoCategories?.map((item) => {
              return { label: item.name, value: item.id, id: item.id }
            }),
          })
          setSelectedFile(res?.[0].thumbnailPath)
          setThumbnailPrevious(res?.[0].thumbnailPath)
        } else {
          setValues({
            title: "",
            description: "",
            url: "",
            uniqueValue: "",
            visible: false,
            thumbnail: null,
            videoCategories: [],
          })

          setSelectedFile(null)
        }
      })
    }
  }, [id, session])

  useEffect(() => {
    VideoCategory().then((res) => {
      console.log(res)
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
  }, [session])

  const clearData = () => {
    setValues({
      title: "",
      description: "",
      url: "",
      uniqueValue: "",
      visible: false,
      thumbnail: null,
      videoCategories: [],
    })

    setSelectedFile(null)
  }

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

  const handleMulti = (selected) => {
    setValues({ ...values, videoCategories: selected })
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
      url: Yup.string().required("Url is required"),
      uniqueValue: Yup.string().required("Id is required"),
      visible: Yup.boolean(),
      thumbnail: id
        ? Yup.string().nullable()
        : Yup.mixed().required("Thumbnail is required"),
      videoCategories: Yup.array()
        .min(1, "At least one Category must be selected")
        .required("Category is required"),
    }),
    onSubmit: (values) => {
      const videoContent = {
        title: values.title,
        description: values.description,
        url: values.url,
        uniqueValue: values.uniqueValue,
        visible: values.visible,
        videoCategories: values.videoCategories,
      }

      if (id) {
        videoContent.id = id
        if (!values.thumbnail) {
          videoContent.thumbnailPath = thumbnailPrevious
        }

        handleFormUpdate(videoContent)
      } else {
        handleFormSubmit(videoContent)
      }
    },
  })

  const handleFormSubmit = async (videoContent) => {
    AddNewVideo(videoContent, values?.thumbnail, session?.accessToken).then(
      (res) => {
        if (res?.[0]) {
          showSuccessAlert("Video posted successfully", "center", 2000)
          router.push(`/admin/demo-video`)
        } else {
          showErrorAlert(res?.[1], "center", 2000)
        }
      }
    )
  }

  const handleFormUpdate = async (videoContent) => {
    UpdateVideo(id, videoContent, values?.thumbnail, session?.accessToken).then(
      (res) => {
        if (res?.[0]) {
          showSuccessAlert("Video Updated successfully", "center", 2000)
          router.push(`/admin/demo-video`)
        } else {
          showErrorAlert(res?.[1], "center", 2000)
        }
      }
    )
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row  justify-between w-full ">
        <div className="  text-sm text-[#A6A6A6] cursor-pointer mb-2 sm:mb-0">
          <Link href="/admin/demo-video" className="flex items-center">
            {" "}
            <FaAngleLeft /> <span className="ml-1">
              Back to Demo Video
            </span>{" "}
          </Link>
        </div>

        <h1 className="text-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 font-medium font-poppins">
          {id ? "Update Demo Video" : "Post a new Demo Video"}
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
                placeholder="Video Title"
                value={values?.title}
                onChange={(e) => {
                  setValues({ ...values, title: e.target.value })
                }}
                onBlur={handleBlur}
              />
              {touched.title && errors.title && (
                <div className="text-[12px] text-red-600">{errors.title}</div>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <div>
              <MdOutlineTextFields size={20} className="text-[#486681]" />
            </div>
            <div className="w-full">
              <textarea
                type="text"
                className={`border-b focus:border-b-blue-600 ${
                  touched.description && errors.description
                    ? "border-b-red-600"
                    : ""
                } w-full text-gray-500 resize-none focus:outline-none`}
                name="description"
                placeholder="Short Description (Max 75 words)"
                rows="3"
                value={values?.description}
                onChange={(e) => {
                  setValues({ ...values, description: e.target.value })
                }}
                onBlur={handleBlur}
              ></textarea>
              {touched.description && errors.description && (
                <div className="text-[12px] text-red-600">
                  {errors.description}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <div>
              <IoUnlink size={20} className="text-[#486681]" />
            </div>
            <div className="w-full">
              <input
                type="text"
                className={`border-b focus:border-b-blue-600 ${
                  touched.url && errors.url ? "border-b-red-600" : ""
                } w-full text-gray-500`}
                name="url"
                placeholder="YouTube video link"
                value={values?.url}
                onChange={(e) => {
                  setValues({ ...values, url: e.target.value })
                }}
                onBlur={handleBlur}
              />
              {touched.url && errors.url && (
                <div className="text-[12px] text-red-600">{errors.url}</div>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <div>
              <IoKeyOutline size={20} className="text-[#486681]" />
            </div>
            <div className="w-full">
              <input
                type="text"
                className={`border-b focus:border-b-blue-600 ${
                  touched.uniqueValue && errors.uniqueValue
                    ? "border-b-red-600"
                    : ""
                } w-full text-gray-500`}
                name="uniqueValue"
                placeholder="YouTube video requirement id"
                value={values?.uniqueValue}
                onChange={(e) => {
                  setValues({ ...values, uniqueValue: e.target.value })
                }}
                onBlur={handleBlur}
              />
              {touched.uniqueValue && errors.uniqueValue && (
                <div className="text-[12px] text-red-600">
                  {errors.uniqueValue}
                </div>
              )}
            </div>
          </div>

          <div className="mt-10">
            {!selectedFile ? (
              <FileUploader
                handleChange={(e) => {
                  handleFileChange(e)
                  setValues({
                    ...values,
                    thumbnail: e,
                  })
                }}
                name="file"
                types={allowedFileTypes}
              >
                <div
                  className={`flex items-center flex-col px-5 sm:px-0 py-16 bg-[#3ab6ff14] border-2 ${
                    touched.thumbnail && errors.thumbnail
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
                          thumbnail: null,
                        })
                      }}
                    >
                      Choose Another
                    </div>
                  </div>
                </div>
              </>
            )}

            {touched.thumbnail && errors.thumbnail && (
              <div className="text-[12px] text-red-600 mt-1 ml-1">
                {errors.thumbnail}
              </div>
            )}

            {error ? (
              <div className=" w-[90%] mx-auto my-5 text-red-500">
                Only PNG, JPG, JPEG file is allowed to upload
              </div>
            ) : null}
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
                value={values?.videoCategories}
                onChange={handleMulti}
                options={category}
                placeholder="Select category"
                isClearable
                menuPortalTarget={menuTarget}
                menuPlacement="auto"
                styles={customStyles(
                  errors.videoCategories && touched.videoCategories
                )}
              />
              {errors.videoCategories && touched.videoCategories && (
                <p className="text-red-500 text-[12px] mt-1">
                  {errors.videoCategories}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8  flex flex-wrap  items-center justify-between gap-2">
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
              <span className="text-[#818181] ml-2">
                Make this video public
              </span>
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
            <div className="flex gap-5 flex-wrap">
              <button
                type="submit"
                className="bg-[#3AB6FF] hover:bg-blue-700 text-white py-[6px] px-4 rounded text-sm font-semibold"
              >
                {id ? "Update " : "Post"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
