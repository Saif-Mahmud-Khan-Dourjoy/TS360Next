import Config from "@/Config"
import axios from "axios"

export const CreateCustomer = async (userId, token) => {

  return axios
    .post(
      `${Config?.baseApi}/subscription/customer/add-by-user/${userId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      return [res?.data]
    })
    .catch((error) => {
      console.error(error)
      if (error.response) {
        // Request made and server responded
        return [false, error.response.data.message]
      } else if (error.request) {
        // The request was made but no response was received
        return [false, error.message]
      } else {
        // Something happened in setting up the request that triggered an Error
        return [false, error.message]
      }
    })
}

export const GetAllCard = async (pgCustomerId, token) => {
  return axios
    .get(
      `${Config?.baseApi}/subscription/payment-method/by-pgcustomer/${pgCustomerId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      return [res?.data]
    })
    .catch((error) => {
      console.error(error)
      if (error.response) {
        // Request made and server responded
        return [false, error.response.data.message]
      } else if (error.request) {
        // The request was made but no response was received
        return [false, error.message]
      } else {
        // Something happened in setting up the request that triggered an Error
        return [false, error.message]
      }
    })
}

export const CreateCardByStax = async (data) => {
  const finalData = {
    customerID: data.customerID,
    publicApiKey: data.publicApiKey,
    cardNumber: data.cardNumber,
    firstName: data.firstName,
    lastName: data.lastName,
    expirationMonth: parseInt(data.expirationMonth, 10),
    expirationYear: parseInt(data.expirationYear, 10),
    cvv: data.cvv,
    makeDefault: data.makeDefault,
    recaptcha: data.recaptcha,
  }

  debugger
  return axios
    .post(
      `https://payments.subscriptionplatform.com/api/paymentsv2`,
      { finalData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return [res]
    })
    .catch((error) => {
      console.error(error)
      if (error) {
        return [false, error]
      }
    })
}
