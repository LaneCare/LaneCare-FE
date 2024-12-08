import { auth } from "@/auth";

export default auth((req) => {
  const publicRoutes = ["/login", "/register", "/maps"];
  const isPublicRoute = publicRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // If the route is not public and the user is not authenticated, redirect to /login
  if (!isPublicRoute && !req.auth) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|maps|$).*)",
  ],
};
