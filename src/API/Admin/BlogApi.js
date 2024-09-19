import Config from "@/Config"
import axios from "axios"

export const UploadPublicImage = async (formData, token) => {
  return axios
    .post(`${Config?.baseApi}/subscription/file/public/add/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return [response?.data]
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

export const BlogCategory = async () => {
  return axios
    .get(`${Config?.baseApi}/subscription/content-category/public/BLOG/all`, {
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

export const TagSuggestions = async (token) => {
  return axios
    .get(`${Config?.baseApi}/subscription/blog/tag-suggestion`, {
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

export const PublishNewBlog = async (blogContent, uploadedFile, token) => {
  const formData = new FormData()
  formData.append(
    "blog",
    new Blob([JSON.stringify(blogContent)], { type: "application/json" })
  )

  formData.append("cover-image", uploadedFile)

  return axios
    .post(`${Config?.baseApi}/subscription/blog/publish`, formData, {
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

export const DraftBlog = async (blogContent, uploadedFile, token) => {
  const formData = new FormData()
  formData.append(
    "blog",
    new Blob([JSON.stringify(blogContent)], { type: "application/json" })
  )

  formData.append("cover-image", uploadedFile)

  return axios
    .post(`${Config?.baseApi}/subscription/blog/draft`, formData, {
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

export const GetAllBlog = async (token) => {
  return axios
    .get(`${Config?.baseApi}/subscription/blog/public/all`, {
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

export const GetBlogBySlug = async (slug, token) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  // Add Authorization header if token is provided
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return axios
    .get(`${Config?.baseApi}/subscription/blog/public/slug/${slug}`, {
      headers: headers,
    })
    .then((res) => {
      return [res?.data]
    })
    .catch((error) => {
      console.log(error)
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
      `${Config?.baseApi}/subscription/blog/${id}/toggle-visibility`,
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

export const MakeFeatured = async (id, token) => {
  return axios
    .put(
      `${Config?.baseApi}/subscription/blog/${id}/make-featured`,
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

export const UpdateBlog = async (id, blogContent, uploadedFile, token) => {
  const formData = new FormData()
  formData.append(
    "blog",
    new Blob([JSON.stringify(blogContent)], { type: "application/json" })
  )

  formData.append("cover-image", uploadedFile)

  return axios
    .put(`${Config?.baseApi}/subscription/blog/${id}/update`, formData, {
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

export const BlogDelete = async (id, token) => {
  return axios
    .delete(`${Config?.baseApi}/subscription/blog/${id}/delete`, {
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

export const PublicAllBlog = async (searchText) => {
  return axios
    .get(
      `${Config?.baseApi}/subscription/blog/public/dashboard-all?searchText=${searchText}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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

export const GetBlogByCategory = async (catId, searchText, token) => {
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
      `${Config?.baseApi}/subscription/blog/public/all?categoryIds=${catId}&searchText=${searchText}`,
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

export const ReactBlog = async (id, data, token) => {
  return axios
    .put(`${Config?.baseApi}/subscription/blog/${id}/react`, data, {
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
