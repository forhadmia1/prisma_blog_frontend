import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userService } from "./services/user.service";
import Role from "./app/constants/Role";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  let isAuthenticated = false;
  let isAdmin = false;

  const { data } = await userService.getSession();
  const pathname = request.nextUrl.pathname;

  if (data?.user) {
    isAuthenticated = true;
    isAdmin = data.user.role === Role.ADMIN;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname.startsWith("/dashboard") && isAdmin) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (pathname.startsWith("/admin-dashboard") && !isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};
