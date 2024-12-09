import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    const publicRoutes = ["/login", "/register", "/maps", "/landing"];
    const isPublicRoute = publicRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );
    console.log("Ini Middleware");
    console.log(request.nextauth.token);
    // If the route is not public and the user is not authenticated, redirect to /login
    if (!isPublicRoute && !request.nextauth.token) {
      console.log("Redirecting to /login");
      const newUrl = new URL("/login2", request.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login", // Sign in page
    },
  }
);

// export default auth((req) => {
//   const publicRoutes = ["/login", "/register", "/maps"];
//   const isPublicRoute = publicRoutes.some((route) =>
//     req.nextUrl.pathname.startsWith(route)
//   );

//   // If the route is not public and the user is not authenticated, redirect to /login
//   if (!isPublicRoute && !req.auth) {
//     const newUrl = new URL("/login", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// });

export const config = {
  // matcher: [
  //   "/((?!api|_next/static|_next/image|favicon.ico|login|register|maps|$).*)",
  // ],
  matcher: ["/dashboard/:path*", "/form/:path*", "/reports/:path*"],
};
