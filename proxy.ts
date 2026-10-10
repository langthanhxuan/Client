import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const params = req.nextUrl.searchParams.toString();
  if (path.startsWith("/auth")) {
    const session = await getServerSession(authOptions);
    if (session && path.endsWith("/auth")) {
      return NextResponse.redirect(`${req.nextUrl.origin}/`);
      // return NextResponse.next();
    }
    if (!session && (!path.endsWith("/auth") || params)) {
      return NextResponse.redirect(`${req.nextUrl.origin}/auth`);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*w
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
