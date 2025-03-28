
import { auth } from "@/component/auth";
import { redirect } from "next/navigation";
import Link from 'next/link';

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/signin");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-800 via-black to-gray-900">
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="max-w-3xl w-full bg-black bg-opacity-80 p-8 rounded-lg shadow-lg backdrop-blur-lg">
          <h1 className="text-3xl font-bold text-white text-center mb-4">Welcome to THE APP</h1>

          <p className="text-lg text-gray-300 text-center mb-8">
            "Booking your events should be as easy as a click. Let’s make it happen."
          </p>

          <div className="flex justify-center mb-6">
            <Link
              href="/eventList"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Book event or add events
            </Link>
          </div>

          <p className="text-center text-gray-400">
            You’re just one step away from securing your next great event. Make it memorable!
          </p>
        </div>
      </div>

     
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Booking App. All Rights Reserved.
          </div>

          <div className="space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition duration-300">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition duration-300">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};



export default Page;