"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaAngleLeft } from "react-icons/fa6"
import StepProgressBar from "../Pricing/HorizontalProgressBar"
import Avatar from "react-avatar"
import UserSection from "./UserSection"
import OrderSummaryModal from "./OrderSummaryModal"
import OrderSummary from "./OrderSummary"
import PaymentInfo from "./PaymentInfo"
import Review from "./Review"
import { MdKeyboardDoubleArrowUp } from "react-icons/md"
import { useSession } from "next-auth/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import LoaderModal from "../Custom/Loader"
import {
  CompletePayment,
  CreateCustomer,
  GetPlanById,
  SubscriptionAdd,
} from "@/API/User/Subscription/SubscriptionOperation"
import CustomModal from "../Custom/Modal"
import { useSearchParams } from "next/navigation"
import moment from "moment"
import { showSuccessAlert } from "../Alerts/Alert"

const steps = ["Add User", "Payment Information", "Review & Confirm"]

export default function BuyNowPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSummaryModalOpen, setSummaryModalOpen] = useState(false)
  const { data: session } = useSession()
  const [isLoaderOpen, setIsLoaderOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState("success")
  const [modalMessage, setModalMessage] = useState("Operation was successful!")
  const searchParams = useSearchParams()

  const router = useRouter()
  const planId = searchParams.get("plan")

  const [planFrequency, setPlanFrequency] = useState([])
  const [planName, setPlanName] = useState("")

  const [totalUser, setTotalUser] = useState([])
  const [selectedCycle, setSelectedCycle] = useState({})

  const [customerId, setCustomerId] = useState(null)

  const [newInfo, setNewInfo] = useState(false)

  const [cardData, setCardData] = useState({})

  const [emailDomain, setEmailDomain] = useState(null)
  const [isVerified, setIsVerified] = useState(false)
  const [selectedCardValue, setSelectedCardValue] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)
  const [autoRenew, setAutoRenew] = useState(true)
  const [sendInvoice, setSendInvoice] = useState(false)
  const [isDetailsSubmit, setIsDetailsSubmit] = useState(false)
  const [planStartDate, setPlanStartDate] = useState(
    moment().format("YYYY-MM-DD")
  )
  const [planEndDate, setPlanEndDate] = useState()
  const [reference, setReference] = useState()
  const [amount, setAmount] = useState(0)
  const [amountWithTax, setAmountWithTax] = useState(0)

  useEffect(() => {
    setIsLoaderOpen(true)
    GetPlanById(planId, session?.accessToken).then((res) => {
      setIsLoaderOpen(false)
      if (res?.[0]) {
        console.log(res?.[0])
        setPlanFrequency(res?.[0]?.planFrequency)
        setPlanName(res?.[0]?.name)
        setSelectedCycle(
          res?.[0]?.planFrequency?.length > 0
            ? res?.[0]?.planFrequency?.[0]
            : {}
        )
      } else {
        openModal("error", res?.[1] || "Something went wrong")
      }
    })
  }, [])

  useEffect(() => {
    const plan = { ...selectedCycle }
    const interval = plan?.frequencyInterval
    const additionalMonths = plan?.additionalMonths
    if (interval == "MONTHLY") {
      setPlanEndDate(moment().add(1, "month").format("YYYY-MM-DD"))
    }
    if (interval == "YEARLY") {
      setPlanEndDate(
        moment()
          .add(1, "year")
          .add(additionalMonths, "months")
          .format("YYYY-MM-DD")
      )
    }
  }, [selectedCycle])

  useEffect(() => {
    setTotalUser([
      ...totalUser,
      {
        id: session?.user?.id,
        email: session?.user?.userName,
      },
    ])
    setEmailDomain(session?.user?.userName?.split("@")[1])
  }, [])

  const handleOkForSummary = () => {
    setSummaryModalOpen(false)
  }
  const openModal = (type, message) => {
    setModalType(type)
    setModalMessage(message)
    setModalOpen(true)
  }

  const handleOkForCustomModal = () => {
    setModalOpen(false)
  }

  const handleCancelForCustomModal = () => {
    setModalOpen(false)
  }

  const UserFormik = useFormik({
    initialValues: { users: totalUser },
    enableReinitialize: true,
    validationSchema: Yup.object({
      users: Yup.array()
        .of(
          Yup.object({
            email: Yup.string()
              .nullable() // Allows the email to be null or empty
              .test("domain-check", `Must end with ${emailDomain}`, (value) => {
                if (!value) return true // If no value, skip the domain check
                return value.endsWith(`${emailDomain}`) // If value exists, check domain
              })
              .email("Invalid email") // Check if the email is valid
              .notRequired(), // Email is not required unless provided
          })
        )
        .min(1, "At least one user is required")
        .test("unique-emails", "Emails must be unique", (users) => {
          if (!users || users.length === 0) return true // No users case
          const emails = users.map((user) => user.email).filter(Boolean) // Filter out undefined emails
          const uniqueEmails = new Set(emails)
          return emails.length === uniqueEmails.size // True if all emails are unique
        }),
    }),
    onSubmit: (values) => {
      setIsLoaderOpen(true)
      handleSubmitUserForm()
    },
  })

  const handleSubmitUserForm = async () => {
    CreateCustomer(session?.user?.id, session?.accessToken).then((res) => {
      if (res?.[0]) {
        setIsLoaderOpen(false)
        setCustomerId(res?.[0]?.pgCustomerId)
        setCurrentStep(currentStep + 1)
      } else {
        setIsLoaderOpen(false)
        openModal("error", res?.[1] || "Something went wrong")
      }
    })
  }
  // console.log("Root", selectedCycle)
  const addSubscription = async () => {
    const data = {
      pgCustomerId: customerId,
      validFrom: planStartDate,
      validTo: planEndDate,
      autoRenewal: autoRenew,
      sendInvoice: sendInvoice,
      plan: {
        id: planId,
      },
      planFrequency: {
        id: selectedCycle?.id,
      },
      numberOfUsers: totalUser?.length,
      teams: totalUser?.filter((user) => {
        return user?.email.length > 0
      }),
    }

    setIsLoaderOpen(true)

    SubscriptionAdd(data, session?.accessToken).then((res) => {
      setIsLoaderOpen(false)
      if (res?.[0]) {
        setIsDetailsSubmit(true)
        setReference(res?.[0]?.pgSubscriptionId)
      } else {
        openModal("error", res?.[1] || "Something went wrong")
      }
    })
  }

  const createPayment = async () => {
    let data = {
      customerId: customerId,
      reference: reference,
      amount: amountWithTax,
      paymentMethod: "CreditCard",
      paymentMethodId: selectedCardValue?.pgPaymentMethodId,
      source: "Manual",
    }
    setIsLoaderOpen(true)
    CompletePayment(data, session?.accessToken).then((res) => {
      setIsLoaderOpen(false)
      if (res?.[0]) {
        showSuccessAlert(
          res?.[0]?.message || "Payment is successfull",
          "center",
          2000
        )
        router.push(`/home`)
      } else {
        openModal("error", res?.[1] || "Something went wrong")
      }
    })
  }

  console.log(totalUser)
  return (
    <>
      <div className="">
        <div className="flex justify-between">
          <div className="w-full lg:w-[60%] pb-[136px] relative">
            <div className="mt-36 pr-5 sm:pr-10 lg:pr-5 pl-5 sm:pl-12  md:pl-20">
              <div className="text-sm text-[#A6A6A6] cursor-pointer mb-2 sm:mb-0">
                <Link href="/pricing" className="flex items-center">
                  {" "}
                  <FaAngleLeft /> <span className="ml-1">Back</span>{" "}
                </Link>
              </div>
              <div className="mt-10">
                <StepProgressBar
                  setCurrentStep={setCurrentStep}
                  currentStep={currentStep}
                  steps={steps}
                  isDetailsSubmit={isDetailsSubmit}
                />
              </div>
              <div className="mt-10 ">
                {currentStep == 0 && (
                  <UserSection
                    totalUser={totalUser}
                    setTotalUser={setTotalUser}
                    currentStep={currentStep}
                    selectedCycle={selectedCycle}
                    errors={UserFormik.errors}
                    touched={UserFormik.touched}
                    handleChange={UserFormik.handleChange}
                    handleBlur={UserFormik.handleBlur}
                    setFieldValue={UserFormik.setFieldValue}
                  />
                )}
                {currentStep == 1 && (
                  <PaymentInfo
                    newInfo={newInfo}
                    setNewInfo={setNewInfo}
                    customerId={customerId}
                    session={session}
                    setIsLoaderOpen={setIsLoaderOpen}
                    openModal={openModal}
                    setIsVerified={setIsVerified}
                    isVerified={isVerified}
                    setSelectedCardValue={setSelectedCardValue}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                  />
                )}
                {currentStep == 2 && (
                  <Review
                    setCurrentStep={setCurrentStep}
                    currentStep={currentStep}
                    session={session}
                    selectedCardValue={selectedCardValue}
                    totalUser={totalUser}
                    autoRenew={autoRenew}
                    setAutoRenew={setAutoRenew}
                    sendInvoice={sendInvoice}
                    setSendInvoice={setSendInvoice}
                    isDetailsSubmit={isDetailsSubmit}
                    setIsDetailsSubmit={setIsDetailsSubmit}
                    planEndDate={planEndDate}
                    planStartDate={planStartDate}
                    addSubscription={addSubscription}
                  />
                )}
              </div>
            </div>
            <div
              onClick={() => setSummaryModalOpen(true)}
              className=" lg:hidden  bg-[#3AB6FF] px-5 py-3 w-[80%] sm:w-fit rounded-md absolute bottom-5 left-[50%] -translate-x-[50%]"
            >
              <div className="flex gap-2 items-center w-fit mx-auto">
                <div>
                  <MdKeyboardDoubleArrowUp
                    className="infiniteUp"
                    color="white"
                    size={20}
                  />
                </div>
                <div className="text-sm font-semibold text-white flex-1">
                  See Order Summary
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block flex-1 bg-[#F6F6F6] pb-[136px]">
            <div className="mt-40 pr-10 pl-5">
              <OrderSummary
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                isSmall={false}
                planFrequency={planFrequency}
                selectedCycle={selectedCycle}
                setSelectedCycle={setSelectedCycle}
                totalUser={totalUser}
                submitForm={UserFormik.submitForm}
                customerId={customerId}
                isVerified={isVerified}
                planName={planName}
                selectedCardValue={selectedCardValue}
                isDetailsSubmit={isDetailsSubmit}
                setPlanEndDate={setPlanEndDate}
                createPayment={createPayment}
                setAmount={setAmount}
                setAmountWithTax={setAmountWithTax}
              />
            </div>
          </div>
        </div>

        {isSummaryModalOpen && (
          <OrderSummaryModal
            isOpen={isSummaryModalOpen}
            onClose={() => setSummaryModalOpen(false)}
            onOk={handleOkForSummary}
          >
            <OrderSummary
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              isSmall={true}
              setSummaryModalOpen={setSummaryModalOpen}
              planFrequency={planFrequency}
              selectedCycle={selectedCycle}
              setSelectedCycle={setSelectedCycle}
              totalUser={totalUser}
              submitForm={UserFormik.submitForm}
              customerId={customerId}
              isVerified={isVerified}
              planName={planName}
              selectedCardValue={selectedCardValue}
              isDetailsSubmit={isDetailsSubmit}
              setPlanEndDate={setPlanEndDate}
              createPayment={createPayment}
              setAmount={setAmount}
              setAmountWithTax={setAmountWithTax}
            />
          </OrderSummaryModal>
        )}
      </div>
      <LoaderModal isOpen={isLoaderOpen} />
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        message={modalMessage}
        onOk={handleOkForCustomModal}
        onCancel={handleCancelForCustomModal}
      />
    </>
  )
}
