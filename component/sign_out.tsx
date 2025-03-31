"use client"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

export function SignOut() {
  const { data: session } = useSession();

  if(!session)  redirect("/signup");
  
  return <button onClick={() => signOut()}>Sign Out</button>
}