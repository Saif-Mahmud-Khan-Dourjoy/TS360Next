import jwt from "jsonwebtoken"

const validateToken = (token) => {
  console.log("Validating token:", token)
  try {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000)

    const decoded = jwt.decode(token?.accessToken, { complete: true })
    const exp = decoded?.payload?.exp

    console.log("Current time in seconds:", currentTimeInSeconds)
    console.log("Expiration time in seconds:", exp)

    if (!exp) {
      console.log("Expiration time not found in token payload")
      return false
    }

    const valid = exp > currentTimeInSeconds
    console.log("Token valid:", valid)
    return valid
  } catch (error) {
    console.error("Error validating token:", error)
    return false
  }
}

export { validateToken }
