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

export const AddCardAtSystem = async (data, token) => {
  return axios
    .post(`${Config?.baseApi}/subscription/payment-method/add`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
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
