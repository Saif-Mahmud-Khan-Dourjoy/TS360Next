"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaAngleLeft } from "react-icons/fa6"
import { MdOutlineTextFields } from "react-icons/md"
import { BiCategoryAlt } from "react-icons/bi"
import { signOut, useSession } from "next-auth/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSearchParams } from "next/navigation"
import { AddNewFAQ, GetFAQById, UpdateFAQ } from "@/API/Admin/FAQApi"
import { showErrorAlert, showSuccessAlert } from "@/components/Alerts/Alert"
import ComponentLoader from "@/components/Custom/ComponentLoader"
import { validateToken } from "@/lib/tokenValidation"

const items = [
  { value: "WEB", label: "Web Tech Support" },
  { value: "MOBILE", label: "Mobile Tech Support" },
  { value: "PRICING", label: "Pricing" },
]

export default function ManageFAQ() {
  const router = useRouter()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const [selectedItems, setSelectedItems] = useState([])
  const [loader, setLoader] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    projectTypes: [],
    visible: false,
  })

  useEffect(() => {
    if (id) {
      setLoader(true)
      GetFAQById(id, session?.accessToken).then((res) => {
        if (res?.[0]) {
          console.log(res?.[0])
          setLoader(false)
          setValues({
            title: res?.[0].title,
            content: res?.[0].content,
            visible: res?.[0].visible,
            projectTypes: res?.[0].projectTypes,
          })

          setSelectedItems(res?.[0].projectTypes)
        } else {
          setLoader(false)
          setValues({
            title: "",
            content: "",
            visible: false,
            projectTypes: [],
          })

          setSelectedItems([])
        }
      })
    }
  }, [id, session])

  const handleCheckboxChange = (value) => {
    let finalItems
    setSelectedItems((prevSelectedItems) => {
      // Check if the item is already in the array
      if (prevSelectedItems.includes(value)) {
        // If it is, remove it
        finalItems = prevSelectedItems.filter((item) => item !== value)
        setValues({ ...values, projectTypes: finalItems })
        return finalItems
      } else {
        // If it's not, add it
        finalItems = [...prevSelectedItems, value]
        setValues({ ...values, projectTypes: finalItems })
        return finalItems
      }
    })
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
      title: Yup.string().required("Question is required"),
      content: Yup.string().required("Answer is required"),
      visible: Yup.boolean(),
      projectTypes: Yup.array()
        .min(1, "At least one Location must be selected")
        .required("Location is required"),
    }),
    onSubmit: (values) => {
      const isValid = validateToken(session) // Synchronous validation

      if (!isValid) {
        signOut({ callbackUrl: "/login" })
      } else {
        const faqContent = {
          title: values.title,
          content: values.content,
          visible: values.visible,
          projectTypes: values.projectTypes,
        }

        if (id) {
          faqContent.id = id

          handleFormUpdate(faqContent)
        } else {
          handleFormSubmit(faqContent)
        }
      }
    },
  })

  const handleFormSubmit = async (data) => {
    AddNewFAQ(data, session?.accessToken).then((res) => {
      if (res?.[0]) {
        console.log(res?.[0])
        showSuccessAlert("FAQ posted successfully", "center", 2000)
        router.push(`/admin/faq`)
      } else {
        showErrorAlert(res?.[1], "center", 2000)
      }
    })
  }

  const handleFormUpdate = async (data) => {
    UpdateFAQ(id, data, session?.accessToken).then((res) => {
      if (res?.[0]) {
        showSuccessAlert("FAQ Updated successfully", "center", 2000)
        router.push(`/admin/faq`)
      } else {
        showErrorAlert(res?.[1], "center", 2000)
      }
    })
  }

  const clearData = () => {
    setValues({
      title: "",
      content: "",
      visible: false,
      projectTypes: [],
    })
    setSelectedItems([])
  }

  return (
    <>
      {loader && <ComponentLoader />}
      <div className="flex flex-col sm:flex-row  justify-between w-full ">
        <div className="  text-sm text-[#A6A6A6] cursor-pointer mb-2 sm:mb-0">
          <Link href="/admin/faq" className="flex items-center">
            {" "}
            <FaAngleLeft /> <span className="ml-1">Back to FAQ</span>{" "}
          </Link>
        </div>

        <h1 className="text-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 font-medium font-poppins">
          {id ? "Update Demo FAQ" : "Post a new Demo FAQ"}
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
                placeholder="Question"
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
                  touched.content && errors.content ? "border-b-red-600" : ""
                } w-full text-gray-500 resize-none focus:outline-none`}
                name="content"
                placeholder="Answer"
                rows="3"
                value={values?.content}
                onChange={(e) => {
                  setValues({ ...values, content: e.target.value })
                }}
                onBlur={handleBlur}
              ></textarea>
              {touched.content && errors.content && (
                <div className="text-[12px] text-red-600">{errors.content}</div>
              )}
            </div>
          </div>

          <div className="mt-10 flex  gap-4 w-full">
            <div>
              <BiCategoryAlt size={20} className="text-[#486681]" />
            </div>
            <div>
              <div className="font-medium">FAQ Location</div>
              <div className="mt-3 flex gap-6 flex-wrap">
                {items.map((item) => (
                  <div key={item.value}>
                    <input
                      type="checkbox"
                      id={`checkbox-${item.value}`}
                      value={item.value}
                      onChange={() => handleCheckboxChange(item.value)}
                      checked={selectedItems?.includes(item.value)}
                      className="mr-2"
                    />
                    <label
                      className="text-[#818181] text-sm"
                      htmlFor={`checkbox-${item.value}`}
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
              {touched.projectTypes && errors.projectTypes && (
                <div className="text-[12px] text-red-600">
                  {errors.projectTypes}
                </div>
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
              <span className="text-[#818181] ml-2">Make this FAQ public</span>
            </div>
          </div>

          <div
            className={`mt-32 mb-5 flex ${
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
