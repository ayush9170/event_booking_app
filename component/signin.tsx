import { signIn } from "./auth"
import { auth } from "./auth";
import { redirect } from "next/navigation";
 
export async function SignIn() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
  
  )
}