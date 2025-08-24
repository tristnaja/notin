import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/home"];

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token")?.value;

    if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
    return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*"],
};