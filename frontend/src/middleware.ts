import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/home"];

/**
 * Middleware to protect routes that require authentication.
 * @param req The incoming request.
 * @returns A response that redirects to the sign-in page if the user is not authenticated, or the next response if they are.
 */
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
