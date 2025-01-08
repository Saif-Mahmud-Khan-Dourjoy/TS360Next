import Image from "next/image"
import React, { useEffect, useState } from "react"
import { FaStar, FaPencilAlt, FaTrash, FaPlusCircle } from "react-icons/fa"
import { CiStar } from "react-icons/ci"
import VisaCard from "../../../../public/Subscription/Visaa.png"
import useProfile from "@/hook"
import ComponentLoader from "@/components/Custom/ComponentLoader"
import { useSession } from "next-auth/react"
import {
  DeleteCard,
  getPaymentMethods,
  UpdateDefault,
} from "@/API/User/PaymentMethod/PaymentMethod"
import { showErrorAlert, showSuccessAlert } from "@/components/Alerts/Alert"
import { CardType } from "@/Utility/CreditCard"
import ManageMethod from "./ManageMethod"
import moment from "moment"
import ManagePaymentModal from "./ManagePaymentModal"


const validateToken = (token) => {
  try {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000)

    const decoded = jwt.decode(token, { complete: true })
    const exp = decoded?.payload?.exp

    if (!exp) {
      console.log("Expiration time not found in token payload")
      return false
    }

    return exp > currentTimeInSeconds
  } catch (error) {
    console.error("Error validating token:", error)
    return false
  }
}

export default function PaymentMethod() {
  const { profile } = useProfile()
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isClicked, setIsClicked] = useState(false)
  const [countryOption, setCountryOption] = useState([])
  const [updateData, setUpdateData] = useState(null)

  const [formData, setFormData] = useState({
    customerID: profile?.user?.pgCustomerId,
    publicApiKey: process.env.NEXT_PUBLIC_PUBLIC_API_KEY,
    firstName: "",
    lastName: "",
    cardNumber: "",
    expirationMonth: moment().format("MM"),
    expirationYear: moment().format("YY"),
    cvv: "",
    recaptcha: null,
    makeDefault: true,
    billingAddress: {
      streetAddress: "",
      city: "",
      state: "",
      stateId: "",
      country: "",
      countryId: "",
      postalZip: "",
    },
  })

  const [countryData, setCountryData] = useState([])
  useEffect(() => {
    fetch("https://secure.fusebill.com/v1/Countries")
      .then((response) => response.json())
      .then((data) => {
        setCountryData(data)
        const countryOption = data?.map((item) => {
          return {
            label: item?.name,
            value: item?.id,
          }
        })

        setCountryOption(countryOption)
      })
  }, [])

  useEffect(() => {
    setLoading(true)
    if (session) {
      getPaymentMethods(profile?.user?.pgCustomerId, session?.accessToken).then(
        (res) => {
          setLoading(false)
          if (res?.[0]) {
            setPaymentMethods(res?.[0])
            console.log(res?.[0])
          } else {
            // showErrorAlert(res?.[1], "center", 2000)
             setPaymentMethods([]);
          }
        }
      )
    }
  }, [reload])

  const setCardDetails = (card) => {
    setUpdateData(card)
    let billingAddress
    if (card?.billingAddress) {
      billingAddress = card?.billingAddress
    } else {
      billingAddress = {
        streetAddress: "",
        city: "",
        state: "",
        stateId: "",
        country: "",
        countryId: "",
        postalZip: "",
      }
    }
    setFormData({
      customerID: profile?.user?.pgCustomerId,
      publicApiKey: process.env.NEXT_PUBLIC_PUBLIC_API_KEY,
      firstName: card?.firstName,
      lastName: card?.lastName,
      cardNumber: "",
      expirationMonth: card?.expirationMonth,
      expirationYear: card?.expirationYear,
      cvv: "",
      recaptcha: null,
      makeDefault: card?.isDefault,
      billingAddress: billingAddress,
    })

    setIsClicked(true)
  }

  const makeDefault = async (id) => {
    setLoading(true)
    UpdateDefault(id, session?.accessToken).then((res) => {
      setLoading(false)
      if (res?.[0]) {
        console.log(res?.[0])
        setReload(!reload)
        showSuccessAlert("Updated Successfully", "center", 2000)
      } else {
        console.log(res?.[1])
        showErrorAlert(res?.[1], "center", 2000)
      }
    })
  }

  const deleteCard = async (id) => {
    setLoading(true)
    DeleteCard(id, session?.accessToken).then((res) => {
      setLoading(false)
      if (res?.[0]) {
        console.log(res?.[0])
        setReload(!reload)
        showSuccessAlert("Deleted Successfully", "center", 2000)
      } else {
        console.log(res?.[1])
        showErrorAlert(res?.[1], "center", 2000)
      }
    })
  }

  const resetFrom = () => {
    setFormData({
      customerID: profile?.user?.pgCustomerId,
      publicApiKey: process.env.NEXT_PUBLIC_PUBLIC_API_KEY,
      firstName: "",
      lastName: "",
      cardNumber: "",
      expirationMonth: moment().format("MM"),
      expirationYear: moment().format("YY"),
      cvv: "",
      recaptcha: null,
      makeDefault: true,
      billingAddress: {
        streetAddress: "",
        city: "",
        state: "",
        stateId: "",
        country: "",
        countryId: "",
        postalZip: "",
      },
    })
  }
  return (
    <>
      {loading && <ComponentLoader />}
      <div className="text-[#2f2f2f] text-base font-extrabold mt-2 mb-6">
        EXISTING PAYMENT METHODS
      </div>
      {paymentMethods?.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {paymentMethods?.map((itm, i) => (
            <div className="flex  gap-4 justify-center " key={`card-${i}`}>
              <div className="p-4 rounded-xl shadow-lg border border-gray-300 w-full">
                <div className="flex-grow">
                  <div className="min-h-10 w-14 relative">
                    <Image
                      src={CardType?.[itm?.cardType]}
                      alt={`${itm?.cardType}_logo`}
                      className="h-full"
                    />
                  </div>

                  <div className="mt-4 text-[#486681] text-sm font-semibold">
                    {itm?.maskedCardNumber}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <div className="text-[#919EAB] text-[13px] font-semibold">
                      {`${itm?.expirationMonth}/${itm?.expirationYear}`}
                    </div>
                    <div className="text-[#919EAB] text-[13px] font-semibold">
                      |
                    </div>
                    <div className="text-[#919EAB] text-[13px] font-semibold">
                      {`${itm?.firstName} ${itm?.lastName}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Actions */}
              <div className="flex flex-col  space-y-2">
                {itm?.isDefault ? (
                  <button
                    className={`flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white hover:bg-gray-800 pointer-events-none`}
                  >
                    <FaStar />
                  </button>
                ) : (
                  <button
                    onClick={() => makeDefault(itm?.id)}
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-[#818181] border border-[#CBCACA]   hover:bg-gray-100 cursor-pointer"
                     `}
                  >
                    <CiStar size={20} />
                  </button>
                )}

                <button
                  onClick={() => setCardDetails(itm)}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
                >
                  <FaPencilAlt />
                </button>
                <button
                  onClick={() => deleteCard(itm?.id)}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 cursor-pointer"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 font-semibold text-red-500">
          {`You haven't added any card`}
        </div>
      )}
      {!isClicked && (
        <button
          onClick={() => setIsClicked(true)}
          className="w-fit flex items-center gap-2 justify-center  py-3 px-5 mt-12 text-white bg-[#3AB6FF] rounded-lg hover:bg-[#239ade] mx-auto sm:mx-0"
        >
          <FaPlusCircle />
          <span>Add payment method</span>
        </button>
      )}
      {isClicked && <div></div>}

      {isClicked && (
        <ManagePaymentModal
          isOpen={isClicked}
          onClose={() => {
            setUpdateData(null)
            setIsClicked(false)
            resetFrom()
          }}
          onOk={() => {
            setUpdateData(null)
            setIsClicked(false)
            resetFrom()
          }}
        >
          <ManageMethod
            setIsClicked={setIsClicked}
            formData={formData}
            countryOption={countryOption}
            countryData={countryData}
            setLoading={setLoading}
            setReload={setReload}
            reload={reload}
            updateData={updateData}
            setUpdateData={setUpdateData}
            resetFrom={resetFrom}
          />
        </ManagePaymentModal>
      )}
    </>
  )
}
