import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { CardType } from "@/Utility/CreditCard"
import visa from "../../../../public/Subscription/visa.png"
import mastercard from "../../../../public/Subscription/mastercard.png"
import amex1 from "../../../../public/Subscription/amex1.png"
import Select from "react-select"
import ReCAPTCHA from "react-google-recaptcha"
import Image from "next/image"
import { showErrorAlert, showSuccessAlert } from "@/components/Alerts/Alert"
import { AddCardAtSystem, UpdateCardAtSystem } from "@/API/User/Subscription/SubscriptionOperation"
import { useSession } from "next-auth/react"
const customStyles = (error = null) => ({
  control: (provided, state) => ({
    ...provided,
    minHeight: "45px",
    backgroundColor: "white",
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
export default function ManageMethod({
  setIsClicked,
  formData,
  countryOption,
  countryData,
  setLoading,
  setReload,
  reload,
  updateData,
  setUpdateData,
  resetFrom,
}) {
  const [menuTarget, setMenuTarget] = useState(null)
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [stateOptions, setStateOptions] = useState([])
  const [isVerified, setIsVerified] = useState(false)
  const { data: session } = useSession()

  console.log(updateData)

  useEffect(() => {
    setMenuTarget(document.body) // Set the target after the component mounts
  }, [])

  useEffect(() => {
    if (updateData) {
      const selectedCountry = countryData?.find(
        (country) =>
          country?.id === Number(updateData?.billingAddress?.countryId)
      )
      const states = selectedCountry?.states || []

      // Update state options
      setStateOptions(
        states.map((state) => ({
          value: state?.id,
          label: state?.name,
        }))
      )
    }
  }, [updateData])
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

        stateId: Yup.lazy(() =>
          stateOptions.length > 0
            ? Yup.string().required("State is required")
            : Yup.string().nullable()
        ),
        countryId: Yup.string().required("Country is required"),
        postalZip: Yup.string().required("Zip Code is required"),
      }),
    }),
    onSubmit: (values) => {
      setIsClicked(false)
      setLoading(true)
      if (updateData) {
        UpdateForm(values)
      } else {
        SubmitForm(values)
      }
      // console.log(values)
    },
  })

  const SubmitForm = async (formData) => {
    const finalData = {
      customerID: formData?.customerID,
      publicApiKey: formData?.publicApiKey,
      cardNumber: formData?.cardNumber,
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      expirationMonth: parseInt(formData?.expirationMonth, 10),
      expirationYear: parseInt(formData?.expirationYear, 10),
      cvv: formData?.cvv,
      makeDefault: formData?.makeDefault,
      recaptcha: formData?.recaptcha,
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
          billingAddress: formData?.billingAddress,
        }

        let addCard = await AddCardApiCall(forCard, session?.accessToken)

        if (addCard[0]) {
          showSuccessAlert("Added Successfully", "center", 2000)
          resetForm()

          setLoading(false)
          setReload(!reload)
        } else {
          setLoading(false)

          showErrorAlert(addCard?.[1] || "Something went wrong", "center", 2000)
        }
      } else {
        const errorData = await response.json()
        console.log("Error: " + errorData.message)
        setLoading(false)

        showErrorAlert(
          errorData.message || "Something went wrong",
          "center",
          2000
        )
      }
    } catch (error) {
      console.log("An error occurred: " + error.message)
      setLoading(false)
      showErrorAlert(error.message || "Something went wrong", "center", 2000)
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
  }

  const UpdateForm = async (formData) => {
    const finalData = {
      customerID: formData.customerID,
      Id: updateData?.pgPaymentMethodId,
      publicApiKey: formData.publicApiKey,
      cardNumber: formData.cardNumber,
      firstName: formData.firstName,
      lastName: formData.lastName,
      expirationMonth: parseInt(formData.expirationMonth, 10),
      expirationYear: parseInt(formData.expirationYear, 10),
      cvv: formData.cvv,
      makeDefault: formData.makeDefault,
      recaptcha: formData.recaptcha,
    }

    try {
      const response = await fetch(
        "https://payments.subscriptionplatform.com/api/paymentsv2",
        {
          method: "PUT",
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
          billingAddress: formData?.billingAddress,
        }

        let updateCard = await UpdateCardApiCall(
          updateData?.id,
          forCard,
          session?.accessToken
        )

        if (updateCard[0]) {
          showSuccessAlert("Updated Successfully", "center", 2000)
          resetForm()
          setUpdateData(null)
          resetFrom()
          setLoading(false)
          setReload(!reload)
        } else {
          setLoading(false)
          setUpdateData(null)
          resetFrom()
          showErrorAlert(
            updateCard?.[1] || "Something went wrong",
            "center",
            2000
          )
        }
      } else {
        const errorData = await response.json()
        console.log("Error: " + errorData.message)
        setLoading(false)
        setUpdateData(null)
        resetFrom()
        showErrorAlert(
          errorData.message || "Something went wrong",
          "center",
          2000
        )
      }
    } catch (error) {
      console.log("An error occurred: " + error.message)
      setLoading(false)
      setUpdateData(null)
      resetFrom()
      showErrorAlert(error.message || "Something went wrong", "center", 2000)
    }
  }

  const UpdateCardApiCall = async (id, data, token) => {
    try {
      // Await the result of the AddCardAtSystem function
      const res = await UpdateCardAtSystem(id, data, token)

      // Return based on the response from the API
      if (res?.[0]) {
        return [true] // Success case
      } else {
        return [false, res?.[1]] // Error case
      }
    } catch (error) {
      console.error("Error in UpdateCardApiCall:", error)
      return [false, error.message] // Handle error cases
    }
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

  const setCountryState = (e) => {
    const selectedCountry = countryData?.find(
      (country) => country?.id === e.value
    )
    const states = selectedCountry?.states || []

    // Update form values and reset state if needed
    setValues((prevValues) => ({
      ...prevValues,
      billingAddress: {
        ...prevValues.billingAddress,
        country: e.label,
        countryId: e.value,
        stateId: states.length > 0 ? "" : null, // Clear state if states exist
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

  const handleExpirationDate = (e) => {
    const value = e.target.value
    const [month, year] = value.split("/")
    setFieldValue("expirationMonth", month)
    setFieldValue("expirationYear", year)
  }

  console.log(updateData)

  return (
    <div className="">
      <div className="text-center text-lg font-extrabold text-[#2F2F2F] mb-8">
        {updateData ? "Edit Payment Method" : "Add New Payment"}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between flex-col sm:flex-row gap-y-10">
          <div className="flex-1 sm:pr-3 sm:border-r ">
            <div className="min-h-12">
              <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-3 ">
                <div className="text-[#818181] font-bold ">CARD DETAILS</div>
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
                      <div className="text-red-600">{errors.firstName}</div>
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
                      <div className="text-red-600">{errors.lastName}</div>
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
                  <div className="text-red-600">{errors.cardNumber}</div>
                )}
              </div>
            </div>
            <div className="mt-5 flex flex-col xl:flex-row  justify-between gap-3">
              <div className="flex-1">
                <div className=" flex flex-col gap-1 w-full">
                  <label className="text-sm text-[#818181]">
                    Expiration Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="border rounded-md px-2 py-3 text-sm text-[#A6A6A6] focus:border-blue-500 w-full"
                    value={`${values.expirationMonth}/${values.expirationYear}`} // Combine values for display
                    onChange={(e) => handleExpirationDate(e)}
                  />
                  {errors.expirationMonth && touched.expirationMonth && (
                    <div className="text-red-600">{errors.expirationMonth}</div>
                  )}
                  {errors.expirationYear && touched.expirationYear && (
                    <div className="text-red-600">{errors.expirationYear}</div>
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
                <div className="text-[#818181] font-bold ">BILLING ADDRESS</div>
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
                      (item) => item.value == values?.billingAddress?.countryId
                    )}
                    onChange={(e) => setCountryState(e)}
                  />

                  {errors?.billingAddress?.countryId &&
                    touched?.billingAddress?.countryId && (
                      <div className="text-red-600">
                        {errors?.billingAddress?.countryId}
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
                      (item) => item.value == values?.billingAddress?.stateId
                    )}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        billingAddress: {
                          ...values?.billingAddress,
                          stateId: e.value,
                          state: e.label,
                        },
                      })
                    }
                  />

                  {errors?.billingAddress?.stateId &&
                    touched?.billingAddress?.stateId && (
                      <div className="text-red-600">
                        {errors?.billingAddress?.stateId}
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
        <div className="mt-5 flex justify-center">
          <button
            type="submit"
            className={`px-6 md:px-12  rounded-md shadow-2xl text-white py-[10px]  font-semibold ${
              isVerified
                ? "cursor-pointer bg-[#3AB6FF]"
                : "cursor-not-allowed bg-gray-400"
            }`}
            disabled={!isVerified}
          >
            {updateData ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}
