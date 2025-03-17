import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { saltAndHashPassword } from "@/utils/password";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Retrieve the user from the database based on email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        // Check if the password matches (you should hash the password on login and compare hashes)
        // const pwHash = saltAndHashPassword(credentials.password);
        // if (user.password !== pwHash) {
        //   throw new Error("Invalid credentials.");
        // }

        // Return the user object if authentication is successful
        return {
          id: user.id,
          email: user.email,
        
          // Add other user fields as needed
        };
      },
    }),
  ],
  // session: {
  //   jwt: true, // Enable JWT session if you're using it
  // },
});
