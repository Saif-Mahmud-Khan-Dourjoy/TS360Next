import Config from "@/Config"
import axios from "axios"

export const VideoCategory = async (token) => {
  return axios
    .get(`${Config?.baseApi}/subscription/content-category/public/VIDEO/all`, {
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

export const AddNewVideo = async (videoContent, uploadedFile, token) => {
  const formData = new FormData()
  formData.append(
    "videoContent",
    new Blob([JSON.stringify(videoContent)], { type: "application/json" })
  )
  // formData.append("thumbnail", uploadedFile, {
  //   type: "application/octet-stream",
  // })
  formData.append("thumbnail", uploadedFile)

  return axios
    .post(`${Config?.baseApi}/subscription/video-content/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
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

export const GetAllVideo = async (token) => {
  return axios
    .get(`${Config?.baseApi}/subscription/video-content/public/all`, {
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

export const GetVideoById = async (id, token) => {
  return axios
    .get(`${Config?.baseApi}/subscription/video-content/public/${id}`, {
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

export const ToggleVisibility = async (id, token) => {
  return axios
    .put(
      `${Config?.baseApi}/subscription/video-content/${id}/toggle-visible`,
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

export const UpdateVideo = async (id, videoContent, uploadedFile, token) => {
  const formData = new FormData()
  formData.append(
    "videoContent",
    new Blob([JSON.stringify(videoContent)], { type: "application/json" })
  )

  formData.append("thumbnail", uploadedFile)

  return axios
    .put(
      `${Config?.baseApi}/subscription/video-content/${id}/update`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const VideoDelete = async (id, token) => {
 
  return axios
    .delete(`${Config?.baseApi}/subscription/video-content/${id}/delete`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
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
