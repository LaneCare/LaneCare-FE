import NextAuth, { NextAuthOptions } from "next-auth";

// import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";

import { AuthService } from "@/lib/server/services/authService";

import { LoginResponse } from "@/lib/types/auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const authService = new AuthService();

        // console.log(process.env.AUTH_SECRET);

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        try {
          //TODO: Delete this
          // Check if credentials are for the admin user
          if (
            credentials.email === "admin@gmail.com" &&
            credentials.password === "admin123"
          ) {
            return {
              id: "admin-id", // Arbitrary unique ID for the admin
              name: "Admin User",
              role: "admin",
            };
          }

          // Create the login request object for non-admin users
          const loginRequest: any = {
            email: credentials.email,
            password: credentials.password,
          };

          // Call the AuthService to authenticate the user
          const loginResponse: LoginResponse = await authService.login(
            loginRequest
          );

          // Handle the case where `data` is null
          if (!loginResponse.data) {
            throw new Error("Invalid login response. Please try again.");
          }

          // Transform the response into the user object
          return {
            id: loginResponse.data.userid,
            name: "Raditya Ditoo", // or use another field for the user's name
            email: loginResponse.data.email, // or use another field for the user's name
            role: loginResponse.data.role,
          };
        } catch (error) {
          console.error("Login failed:", error);
          throw new Error("Invalid email or password.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.uid as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// export default NextAuth(authOptions);
