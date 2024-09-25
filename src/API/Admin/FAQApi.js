import Config from "@/Config"
import axios from "axios"
export const AddNewFAQ = async (data, token) => {

  return axios
    .post(
      `${Config?.baseApi}/subscription/frequently-asked-question/add`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((response) => {
      return [true]
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

export const GetAllFAQ = async (token) => {
  return axios
    .get(
      `${Config?.baseApi}/subscription/frequently-asked-question/public/all`,
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

export const GetFAQByCategory = async (type, token) => {

   const headers = {
     "Content-Type": "application/json",
     Accept: "application/json",
   }

   // Add Authorization header if token is provided
   if (token) {
     headers.Authorization = `Bearer ${token}`
   }
  return axios
    .get(
      `${Config?.baseApi}/subscription/frequently-asked-question/public/all?types=${type}`,
      {
        headers: headers,
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

export const ToggleFAQVisibility = async (id, token) => {
  return axios
    .put(
      `${Config?.baseApi}/subscription/frequently-asked-question/${id}/toggle-visible`,
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
      return [true]
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

export const FAQDelete = async (id, token) => {

  return axios
    .delete(
      `${Config?.baseApi}/subscription/frequently-asked-question/delete/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      return [true]
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

export const GetFAQById = async (id, token) => {
  return axios
    .get(
      `${Config?.baseApi}/subscription/frequently-asked-question/public/${id}`,
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

export const UpdateFAQ = async (id, data, token) => {

  return axios
    .put(
      `${Config?.baseApi}/subscription/frequently-asked-question/update/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((response) => {
      return [true]
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
