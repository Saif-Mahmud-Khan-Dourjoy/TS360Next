import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (req.nextUrl.pathname === '/') {
    if (!token) {
      return NextResponse.redirect(new URL('/home', req.url))
    } else {
      if (token.role == "ADMIN") {
        return NextResponse.redirect(new URL('/admin', req.url))
      } else {
        return NextResponse.redirect(new URL('/home', req.url))
      }
    }
  }
  const filterValue = req.nextUrl.searchParams.get('filter');
  if ((req.nextUrl.pathname === '/blog/allPost' || req.nextUrl.pathname === '/blog') && !filterValue) {
    const url = req.nextUrl.clone();
    url.searchParams.set('filter', 'recent');
    return NextResponse.redirect(new URL(`/blog/allPost?${url.searchParams.toString()}`, req.url))
  }

  if (req.nextUrl.pathname === '/demo-video') {

    return NextResponse.redirect(new URL(`/demo-video/allVideo`, req.url))
  }




  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);
  return NextResponse.next({ headers });

}