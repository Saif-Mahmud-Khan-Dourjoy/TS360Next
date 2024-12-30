import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import jwt from "jsonwebtoken"

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url))
  }
  const filterValue = req.nextUrl.searchParams.get("filter")
  if (
    (req.nextUrl.pathname === "/blog/All" ||
      req.nextUrl.pathname === "/blog") &&
    !filterValue
  ) {
    const url = req.nextUrl.clone()
    url.searchParams.set("filter", "recent")
    return NextResponse.redirect(
      new URL(`/blog/All?${url.searchParams.toString()}`, req.url)
    )
  }

  if (req.nextUrl.pathname === "/demo-video") {
    return NextResponse.redirect(new URL(`/demo-video/All`, req.url))
  }

  const authCheck = checkAuth(req, token)
  if (authCheck) return authCheck

  const headers = new Headers(req.headers)
  const domain = req.nextUrl.hostname
  const queryParams = req.nextUrl.searchParams
  const searchValue = queryParams.get("search")
  headers.set("x-current-path", req.nextUrl.pathname)
  headers.set("x-host", domain)
  headers.set("x-query-param", searchValue)

  return NextResponse.next({ headers })
}

const checkAuth = (req, token) => {
  const pathsToCheck = ["buy-now", "profile"]

  if (token) {
    const isValid = validateToken(token)

    if (!isValid) {
      console.log("Token expired or invalid")
      return redirectToLogin(req)
    }
  }
  if (req.nextUrl.pathname.includes("admin")) {
    if (!token || token?.role != "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }
  if (pathsToCheck.some((path) => req.nextUrl.pathname.includes(path))) {
    if (!token || token?.role != "USER") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }
  return null // Ensure the function returns null if no redirection happens
}

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

const redirectToLogin = (req) => {
  const response = NextResponse.next()

  response.cookies.delete("next-auth.session-token")
  response.cookies.delete("__Secure-next-auth.session-token")

  if (!req.nextUrl.pathname.includes("/login")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return response
}
