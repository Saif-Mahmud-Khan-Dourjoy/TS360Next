import Config from "@/Config"
import axios from "axios"

export const Registration = async (data) => {
  return axios
    .post(`${Config?.baseApi}/subscription/account/public/signup`, data, {
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
    .post(`${Config?.baseApi}/subscription/account/public/verification`, data, {
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
    .post(`${Config?.baseApi}/subscription/account/public/login`, data, {
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

export const SendOTP = async (email) => {
  return axios.put(`${Config?.baseApi}/subscription/account/public/forget-password/${email}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
    .then((res)=>{
      console.log(res, "From endpoint");
      return [true]
    })
    .catch((error)=>{
      console.error(error.message)
      return [false, error.message]
    })
}