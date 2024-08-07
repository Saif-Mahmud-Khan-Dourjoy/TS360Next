import { NextResponse } from 'next/server'

export function middleware(request) {
  if (request.nextUrl.pathname==='/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }
  const filterValue = request.nextUrl.searchParams.get('filter');
  if ((request.nextUrl.pathname==='/blog/allPost' || request.nextUrl.pathname==='/blog') && !filterValue) {
    const url = request.nextUrl.clone();
    url.searchParams.set('filter', 'recent');
    return NextResponse.redirect(new URL(`/blog/allPost?${url.searchParams.toString()}`, request.url))
  }

  if (request.nextUrl.pathname==='/demo-video') {
  
    return NextResponse.redirect(new URL(`/demo-video/allVideo`, request.url))
  }
  



  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  return NextResponse.next({ headers });
 
}