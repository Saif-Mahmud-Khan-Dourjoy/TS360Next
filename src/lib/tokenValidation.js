import jwt from "jsonwebtoken"

const validateToken = (token) => {
  try {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000)

    const decoded = jwt.decode(token?.accessToken, { complete: true })
    const exp = decoded?.payload?.exp

    if (!exp) {
      console.log("Expiration time not found in token payload")
      return false
    }

    return exp > currentTimeInSeconds
  } catch (error) {
    console.error("Error validating token:", error)
    return false
  }
}



export { validateToken }
