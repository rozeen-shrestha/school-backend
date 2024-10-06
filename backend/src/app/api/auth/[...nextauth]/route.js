// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Hardcoded credentials for admin
        const user = { id: 1, name: "admin", role: "admin" };
        if (credentials.username === "admin" && credentials.password === "admin") {
          return user;
        }
        // Return null if credentials are invalid
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role; // Add role to session
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Add role to token
      }
      return token;
    }
  },
  pages: {
    signIn: "/login"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
