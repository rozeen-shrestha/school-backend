import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

async function connectToDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    return client.db(dbName);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const db = await connectToDatabase();
          const user = await db.collection('users').findOne({
            username: credentials.username,
          });

          if (user && await bcrypt.compare(credentials.password, user.password)) {
            // Check user role and return accordingly
            return {
              id: user._id.toString(),
              name: user.username,
              role: user.role,  // Make sure to have a 'role' field in your DB for user type
              permissions: user.permissions,
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.permissions = token.permissions;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",  // Redirect to the general login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
