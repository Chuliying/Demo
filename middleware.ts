import { NextResponse } from "next/server";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        '/',
    ],
};

interface Req {
    nextUrl: {
        pathname: string
        origin: string
        search: string
    }
}


const Middleware = (req: Req) => {
    const {
        pathname,
        search,
        origin
    } = req.nextUrl;
    if (pathname === pathname.toLowerCase())
        return NextResponse.next();

    return NextResponse.redirect(
        `${origin + pathname.toLowerCase() + search}`
    );
};

export default Middleware;