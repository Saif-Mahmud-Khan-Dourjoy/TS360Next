import Config from "@/Config"
import axios from "axios"

export const AllPlan = async () => {
  return axios
    .get(`${Config?.baseApi}/subscription/plan/public/all`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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

export const AllFeature = async () => {
  return axios
    .get(`${Config?.baseApi}/subscription/plan/public/overview`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
