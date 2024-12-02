"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import visa from "../../../public/Subscription/visa.png"
import mastercard from "../../../public/Subscription/mastercard.png"
import amex1 from "../../../public/Subscription/amex1.png"
import Select from "react-select"
import { FaRegCircleCheck } from "react-icons/fa6"
import ReCAPTCHA from "react-google-recaptcha"
import {
  AddCardAtSystem,
  GetAllCard,
} from "@/API/User/Subscription/SubscriptionOperation"
import { CardType } from "../../../src/Utility/CreditCard"
import { useFormik } from "formik"
import * as Yup from "yup"
import moment from "moment"

const customStyles = (error = null) => ({
  control: (provided, state) => ({
    ...provided,
    minHeight: "45px",
    backgroundColor: "#F9FAFB",
    borderRadius: "7px",
    borderColor: error
      ? "red"
      : state.isFocused
      ? "black"
      : provided.borderColor,
    outline: "none",
    boxShadow: error
      ? "0 0 0 1px red"
      : state.isFocused
      ? "0 0 0 1px black"
      : provided.boxShadow,
    "&:hover": {
      borderColor: error
        ? "red"
        : state.isFocused
        ? "black"
        : provided.borderColor,
    },
  }),
})

export default function PaymentInfo({
  newInfo,
  setNewInfo,
  customerId,
  session,
  setIsLoaderOpen,
  openModal,
  setIsVerified,
  isVerified,
  setSelectedCardValue,
  selectedCard,
  setSelectedCard,
}) {
  const [countries, setCountries] = useState([])
  const [countryValue, setCountryValue] = useState("")
  const [menuTarget, setMenuTarget] = useState(null)

  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [allCard, setAllCard] = useState(null)

  const [reload, setReload] = useState(false)
  const [formData, setFormData] = useState({
    customerID: customerId,
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
      country: "",
      postalZip: "",
    },
  })

  const [countryData, setCountryData] = useState([])
  const [countryOption, setCountryOption] = useState([])
  const [stateOptions, setStateOptions] = useState([])
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
    setMenuTarget(document.body) // Set the target after the component mounts
  }, [])

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCountries(data.countries)
        setCountryValue(data.userSelectValue.value)
      })
  }, [])
  useEffect(() => {
    setIsLoaderOpen(true)
    GetAllCard(customerId, session?.accessToken).then((res) => {
      setIsLoaderOpen(false)
      if (res?.[0]) {
        setAllCard([...res?.[0]])
        let response = [...res?.[0]]

        let filteredCard = response.filter((item) => item?.isDefault) // filter based on the isDefault property

        console.log(filteredCard)
        if (filteredCard?.length > 0) {
          setSelectedCard(filteredCard?.[0]?.id)
          setSelectedCardValue(filteredCard?.[0])
        } else {
          setSelectedCard(null)
          setSelectedCardValue(null)
        }
      } else {
        openModal("error", res?.[1] || "Something went wrong")
      }
    })
  }, [reload])

  // useEffect(()=>{
  //   const setCardInfo = (item, i) => {
  //     selectedCard == i
  //       ? (setSelectedCard(null), setSelectedCardValue(null))
  //       : (setSelectedCard(i), setSelectedCardValue(item))
  //   }
  // },[])

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setValues,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: formData,
    validationSchema: Yup.object().shape({
      customerID: Yup.string().required("Customer ID is required"),
      publicApiKey: Yup.string().required("Public API Key is required"),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      cardNumber: Yup.string()
        .matches(/^[0-9]+$/, "Card Number must be numeric")
        .required("Card Number is required"),
      expirationMonth: Yup.string()
        .matches(/^(0[1-9]|1[0-2])$/, "Enter a valid month (01-12)")
        .required("Expiration Month is required"),
      expirationYear: Yup.string()
        .matches(/^[0-9]{2}$/, "Enter a valid year")
        .required("Expiration Year is required"),
      cvv: Yup.string()
        .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits")
        .required("CVV is required"),
      recaptcha: Yup.string().required("Recaptcha is required"),
      makeDefault: Yup.boolean(),
      billingAddress: Yup.object().shape({
        streetAddress: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),

        state: Yup.lazy(() =>
          stateOptions.length > 0
            ? Yup.string().required("State is required")
            : Yup.string().nullable()
        ),
        country: Yup.string().required("Country is required"),
        postalZip: Yup.string().required("Zip Code is required"),
      }),
    }),
    onSubmit: (values) => {
      // Handle form submission
      setIsLoaderOpen(true)
      SubmitForm(values)
    },
  })

  const SubmitForm = async (values) => {
    const finalData = {
      customerID: values.customerID,
      publicApiKey: values.publicApiKey,
      cardNumber: values.cardNumber,
      firstName: values.firstName,
      lastName: values.lastName,
      expirationMonth: parseInt(values.expirationMonth, 10),
      expirationYear: parseInt(values.expirationYear, 10),
      cvv: values.cvv,
      makeDefault: values.makeDefault,
      recaptcha: values.recaptcha,
    }

    try {
      const response = await fetch(
        "https://payments.subscriptionplatform.com/api/paymentsv2/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      )

      if (response.ok) {
        const data = await response.json()
        const forCard = {
          maskedCardNumber: data?.maskedCardNumber,
          cardType: data?.cardType,
          expirationMonth: data?.expirationMonth,
          expirationYear: data?.expirationYear,
          pgCustomerId: data?.customerId,
          firstName: data?.firstName,
          lastName: data?.lastName,
          isDefault: data?.isDefault,
          pgPaymentMethodId: data?.id,
          billingAddress: {
            streetAddress: values?.streetAddress,
            city: values?.city,
            state: values?.state,
            country: values?.country,
            postalZip: values?.postalZip,
          },
        }

        let addCard = await AddCardApiCall(forCard, session?.accessToken)

        if (addCard[0]) {
          resetForm()
          setNewInfo(false)
          setIsLoaderOpen(false)
          setReload(!reload)
        } else {
          setIsLoaderOpen(false)
          openModal("error", addCard?.[1] || "Something went wrong")
        }
      } else {
        const errorData = await response.json()
        console.log("Error: " + errorData.message)
        setIsLoaderOpen(false)
        openModal("error", errorData.message || "Something went wrong")
      }
    } catch (error) {
      console.log("An error occurred: " + error.message)
      setIsLoaderOpen(false)
      openModal("error", error.message || "Something went wrong")
    }
  }

  const AddCardApiCall = async (data, token) => {
    try {
      // Await the result of the AddCardAtSystem function
      const res = await AddCardAtSystem(data, token)

      // Return based on the response from the API
      if (res?.[0]) {
        return [true] // Success case
      } else {
        return [false, res?.[1]] // Error case
      }
    } catch (error) {
      console.error("Error in AddCardApiCall:", error)
      return [false, error.message] // Handle error cases
    }

    //  return  AddCardAtSystem(data, token).then((res)=>{
    //     if(res?.[0]){
    //        return [true]
    //     }else{
    //        return [false, res?.[1]]
    //     }
    //    })
  }

  const setCardInfo = (item, i) => {
    selectedCard == i
      ? (setSelectedCard(null), setSelectedCardValue(null))
      : (setSelectedCard(i), setSelectedCardValue(item))
  }

  const handleVerifyCaptcha = (token) => {
    setRecaptchaToken(token)
    setFieldValue("recaptcha", token)
    setIsVerified(true)
  }

  const handleCaptchaExpired = () => {
    setIsVerified(false)
    setFieldValue("recaptcha", null)
    setRecaptchaToken(null)
  }

  const handleExpirationDate = (e) => {
    const value = e.target.value
    const [month, year] = value.split("/")
    setFieldValue("expirationMonth", month)
    setFieldValue("expirationYear", year)
  }

  const setCountryState = (value) => {
    const selectedCountry = countryData?.find(
      (country) => country?.id === value
    )
    const states = selectedCountry?.states || []

    // Update form values and reset state if needed
    setValues((prevValues) => ({
      ...prevValues,
      billingAddress: {
        ...prevValues.billingAddress,
        country: value,
        state: states.length > 0 ? "" : null, // Clear state if states exist
      },
    }))

    // Update state options
    setStateOptions(
      states.map((state) => ({
        value: state?.id,
        label: state?.name,
      }))
    )
  }

  console.log(selectedCard)

  return (
    <>
      <div className="text-xl font-semibold ">Saved payment information</div>
      <div className="border-b-2 mt-2"></div>
      <div className="mt-5 ">
        {allCard?.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
            {allCard?.map((itm, i) => (
              <div
                key={`itm-${i}`}
                className={`relative p-3 border rounded-lg  ${
                  selectedCard == itm?.id ? "ring-2 ring-[#3AB6FF]" : ""
                }`}
                // onClick={() => setCardInfo(itm, i)}
              >
                {selectedCard == itm?.id && (
                  <div className="absolute -top-3 -right-4">
                    <FaRegCircleCheck
                      className="bg-[#3AB6FF] rounded-full text-white "
                      size={30}
                    />
                  </div>
                )}

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
            ))}
          </div>
        ) : (
          <div className="mt-8 font-semibold text-red-500">
            {`You haven't added any card`}
          </div>
        )}
      </div>
      <div className="mt-6 text-xs text-[#818181]">
        <span className="text-[#FF5656] text-base relative top-1">*</span>
        Payment will be charged to your default payment method. Change it in
        your profile to use a different one.
      </div>
      <div className="mt-8">
        <div className="relative border-b text-[#818181] font-semibold before:bg-white before:px-2 before:content-['or'] before:absolute before:left-[50%] before:top-[50%] before:-translate-x-[50%] before:-translate-y-[50%]"></div>
        <div className="mt-8">
          {!newInfo ? (
            <div
              onClick={() => setNewInfo(true)}
              className="text-sm font-semibold text-white px-5 py-3 bg-[#3AB6FF] shadow-2xl w-fit rounded-md cursor-pointer"
            >
              Add new payment information
            </div>
          ) : (
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex justify-between flex-col sm:flex-row gap-y-10">
                  <div className="flex-1 sm:pr-3 sm:border-r ">
                    <div className="min-h-12">
                      <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-3 ">
                        <div className="text-[#818181] font-bold ">
                          CARD DETAILS
                        </div>
                        <div className="flex  gap-2 items-center">
                          <Image
                            src={visa}
                            alt="visa_logo"
                            className="h-fit max-w-10"
                          />
                          <Image
                            src={mastercard}
                            alt="mastercard_logo"
                            className="h-fit max-w-10"
                          />
                          <Image
                            src={amex1}
                            alt="amex_logo"
                            className="h-fit max-w-10"
                          />
                          <Image
                            src={CardType?.Discover}
                            alt="discover_logo"
                            className=" h-fit max-w-10"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-col xl:flex-row  justify-between gap-3">
                        <div className="flex-1">
                          <div className=" flex flex-col gap-1 w-full">
                            <label className="text-sm text-[#818181]">
                              First Name <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              className="border rounded-md px-2 py-3 text-sm text-[#A6A6A6] focus:border-blue-500 w-full"
                              placeholder="John"
                              value={values.firstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.firstName && touched.firstName && (
                              <div className="text-red-600">
                                {errors.firstName}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className=" flex flex-col gap-1 w-full">
                            <label className="text-sm text-[#818181]">
                              Last Name <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              className="border rounded-md px-2 py-3 text-sm text-[#A6A6A6] focus:border-blue-500 w-full"
                              placeholder="Luther"
                              value={values.lastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.lastName && touched.lastName && (
                              <div className="text-red-600">
                                {errors.lastName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <div className="flex flex-col gap-1">
                        <label className="text-sm text-[#818181]">
                          Card Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          className="border rounded-md px-2 py-3 text-sm text-[#A6A6A6] focus:border-blue-500"
                          placeholder="4156 0025 3245 7654"
                          value={values.cardNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.cardNumber && touched.cardNumber && (
                          <div className="text-red-600">
                            {errors.cardNumber}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-5 flex flex-col xl:flex-row  justify-between gap-3">
                      <div className="flex-1">
                        <div className=" flex flex-col gap-1 w-full">
                          <label className="text-sm text-[#818181]">
                            Expiration Date{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            className="border rounded-md px-2 py-3 text-sm text-[#A6A6A6] focus:border-blue-500 w-full"
                            value={`${values.expirationMonth}/${values.expirationYear}`} // Combine values for display
                            onChange={(e) => handleExpirationDate(e)}
                          />
                          {errors.expirationMonth &&
                            touched.expirationMonth && (
                              <div className="text-red-600">
                                {errors.expirationMonth}
                              </div>
                            )}
                          {errors.expirationYear && touched.expirationYear && (
                            <div className="text-red-600">
                              {errors.expirationYear}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className=" flex flex-col gap-1 w-full">
                          <label className="text-sm text-[#818181]">
                            CVV <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            className="border rounded-md px-2 py-3 text-sm text-[#A6A6A6] focus:border-blue-500 w-full"
                            placeholder="855"
                            value={values.cvv}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.cvv && touched.cvv && (
                            <div className="text-red-600">{errors.cvv}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 sm:pl-3">
                    <div className="min-h-12">
                      <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-3 ">
                        <div className="text-[#818181] font-bold ">
                          BILLING ADDRESS
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-sm text-[#818181]">
                          Street Address
                          <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="billingAddress.streetAddress"
                          className="border rounded-md px-2 py-3 text-sm text-[#A6A6A6] focus:border-blue-500"
                          placeholder="1234 Maple Street"
                          value={values.billingAddress.streetAddress}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.billingAddress?.streetAddress &&
                          touched.billingAddress?.streetAddress && (
                            <div className="text-red-600">
                              {errors.billingAddress.streetAddress}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="mt-5 flex flex-col xl:flex-row  justify-between gap-3">
                      <div className="flex-1">
                        <div className=" flex flex-col gap-1 w-full">
                          <label className="text-sm text-[#818181]">
                            Country <span className="text-red-600">*</span>
                          </label>

                          <Select
                            menuPortalTarget={menuTarget}
                            menuPlacement="auto"
                            styles={{
                              ...customStyles(),
                              menuPortal: (base) => ({
                                ...base,
                                zIndex: 9999, // Ensure dropdown appears above the modal
                              }),
                            }}
                            options={countryOption}
                            value={countryOption.filter(
                              (item) =>
                                item.value == values?.billingAddress?.country
                            )}
                            onChange={(e) => setCountryState(e.value)}
                          />

                          {errors?.billingAddress?.country &&
                            touched?.billingAddress?.country && (
                              <div className="text-red-600">
                                {errors?.billingAddress?.country}
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className=" flex flex-col gap-1 w-full">
                          <label className="text-sm text-[#818181]">
                            State/Province
                            <span className="text-red-600">*</span>
                          </label>

                          <Select
                            menuPortalTarget={menuTarget}
                            menuPlacement="auto"
                            styles={{
                              ...customStyles(),
                              menuPortal: (base) => ({
                                ...base,
                                zIndex: 9999, // Ensure dropdown appears above the modal
                              }),
                            }}
                            options={stateOptions}
                            value={stateOptions.filter(
                              (item) =>
                                item.value == values?.billingAddress?.state
                            )}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                billingAddress: {
                                  ...values?.billingAddress,
                                  state: e.value,
                                },
                              })
                            }
                          />

                          {errors?.billingAddress?.state &&
                            touched?.billingAddress?.state && (
                              <div className="text-red-600">
                                {errors?.billingAddress?.state}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col xl:flex-row  justify-between gap-3">
                      <div className="flex-1">
                        <div className=" flex flex-col gap-1 w-full">
                          <label className="text-sm text-[#818181]">
                            City
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="billingAddress.city"
                            className="border rounded-md px-2 py-3 text-sm text-[#A6A6A6] focus:border-blue-500"
                            placeholder="San Jose"
                            value={values.billingAddress.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.billingAddress?.city &&
                            touched.billingAddress?.city && (
                              <div className="text-red-600">
                                {errors.billingAddress.city}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className=" flex flex-col gap-1 w-full">
                          <label className="text-sm text-[#818181]">
                            Postal Code
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="billingAddress.postalZip"
                            className="border rounded-md px-2 py-3 text-sm text-[#A6A6A6] focus:border-blue-500"
                            placeholder="556B"
                            value={values.billingAddress.postalZip}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.billingAddress?.postalZip &&
                            touched.billingAddress?.postalZip && (
                              <div className="text-red-600">
                                {errors.billingAddress.postalZip}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex gap-3">
                  <input
                    checked={values.makeDefault}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="checkbox"
                    id="makeDefault"
                    name="makeDefault"
                    className={`relative w-4 h-4 border ${
                      touched?.makeDefault && errors?.makeDefault
                        ? "border-red-700"
                        : "border-gray-300"
                    } rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 top-[2px]`}
                  />
                  <span className="font-medium text-sm">
                    Make default payment option
                  </span>
                </div>
                <div className="mt-5">
                  <ReCAPTCHA
                    sitekey="6LfVtGwUAAAAALHn9Ycaig9801f6lrPmouzuKF11" // Replace with your Google reCAPTCHA site key
                    onChange={handleVerifyCaptcha}
                    onExpired={handleCaptchaExpired}
                  />
                </div>
                <div className="mt-5 ">
                  <button
                    type="submit"
                    className={`px-6 md:px-12  rounded-md shadow-2xl text-white py-[10px]  font-semibold ${
                      isVerified
                        ? "cursor-pointer bg-[#3AB6FF]"
                        : "cursor-not-allowed bg-gray-400"
                    }`}
                    disabled={!isVerified}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
