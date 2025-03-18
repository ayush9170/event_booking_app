import { signIn } from "./auth"
import { auth } from "./auth";
import { redirect } from "next/navigation";
 
export async function SignIn() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("credentials", formData)
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  )
}