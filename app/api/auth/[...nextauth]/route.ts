import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authAdapter } from "@/lib/mongoAdapter";
import clientPromise from "@/lib/mongo";

// Extend NextAuth types to include 'role'
declare module "next-auth" {
  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

const handler = NextAuth({
  adapter: authAdapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const usersCol = client.db().collection("users");

        const user = await usersCol.findOne({ email: credentials?.email });

        if (!user) throw new Error("User not found");

        if (user.password !== credentials?.password) {
          // use bcrypt.compare() in real apps
          throw new Error("Invalid password");
        }

        // Ensure role is set to 'user' if not already set
        if (!user.role) {
          await usersCol.updateOne(
            { _id: user._id },
            { $set: { role: "user" } }
          );
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub ?? "";
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
