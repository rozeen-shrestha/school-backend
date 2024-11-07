// backend/src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Mock database or data store with two users
const users = {
  admin: {
    id: 1,
    name: "admin",
    password: "admin", // Password for admin user
    role: "admin",     // Role for admin user
  },
  user: {
    id: 2,
    name: "user",
    password: "user", // Password for regular user
    role: "user",         // Role for regular user
  },
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Find the user by the username
        const user = users[credentials.username];

        // If the user exists and the password matches, return the user
        if (user && credentials.password === user.password) {
          return {
            id: user.id,
            name: user.name,
            role: user.role,
          };
        }

        // Return null if credentials are invalid
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add the user role to the session object
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      // Add the role to the JWT token when logging in
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/", // Redirect to sign-in page if not authenticated
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
