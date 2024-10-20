import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // if (req.nextUrl.pathname === "/") {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/home", req.url));
  //   } else {
  //     if (token.role == "ADMIN") {
  //       return NextResponse.redirect(new URL("/admin/blog", req.url));
  //     } else {
  //       return NextResponse.redirect(new URL("/home", req.url));
  //     }
  //   }
  // }
  const authCheck = checkAuth(req, token)
  if (authCheck) return authCheck

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
  if (req.nextUrl.pathname.includes("admin")) {
    if (!token || token?.role != "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }
  if (req.nextUrl.pathname.includes("buy-now")) {
    if (!token || token?.role != "USER") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }
  return null // Ensure the function returns null if no redirection happens
}
