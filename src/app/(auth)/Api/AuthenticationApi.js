import Config from "@/Config"
import axios from "axios"

export const Registration = async (data) => {
  return axios
    .post(`${Config?.baseApi}/subscription/account/signup`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => {
      return [res?.data]
    })
    .catch((error) => {
      return [false, error]
    })
}
export const OtpVarification = async (data) => {
  return axios
    .post(`${Config?.baseApi}/subscription/account/verification`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => {
      return [res?.data]
    })
    .catch((error) => {
      return [false, error]
    })
}

export const Login = async (data) => {
  return axios
    .post(`${Config?.baseApi}/subscription/account/login`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => {
      
      return [res?.data]
    })
    .catch((error) => {
      return [false, error]
    })
}
