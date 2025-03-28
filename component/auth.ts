import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
// import { saltAndHashPassword } from "@/utils/password";
import { PrismaClient } from "@prisma/client";
import { signInSchema } from "./schema";
import db from "./db";
 
const adapter =PrismaAdapter(db)
const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: adapter,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Retrieve the user from the database based on email
        const validatedCredentials =  signInSchema.parse(credentials)
        const user = await db.user.findFirst({
          where: { email: validatedCredentials.email ,password :validatedCredentials.password },
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
  callbacks: {
   
   async jwt ({token ,user}){
if(user){
  token.id = user.id
}
return token
   },
   async session({session ,token}){
    if(session.user){
      session.user.id = token.id as string 
    }
    return session
   }
  
  },
  pages :{
    signIn :"/signin",
    error : "/login"
  },
  session:{
    strategy:"jwt",
    maxAge :30*24*60*60
  },
  secret :  process.env.Next_Auth_secret
 
});



