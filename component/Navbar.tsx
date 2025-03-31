
import { auth } from "./auth";
import Link from 'next/link';


const Navbar = async() => {
   const session = await auth();
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-white text-2xl font-semibold">Booking App</span>
      </div>
  
      <div className="hidden md:flex space-x-6">
      
        <Link href="/" className="text-white hover:text-gray-300 transition-colors duration-300">
          Home
        </Link>
        <Link href="/about" className="text-white hover:text-gray-300 transition-colors duration-300">
          About
        </Link>
        <Link href="/signup" className="text-white hover:text-gray-300 transition-colors duration-300">
          Sign Up
        </Link>
        
       {session ?  <Link href="/signout" className="text-white hover:text-gray-300 transition-colors duration-300">
          signOut
        </Link>  : <Link href="/signin" className="text-white hover:text-gray-300 transition-colors duration-300">
          Sign In
        </Link>}
      </div>
      
      </div>
    </nav>
  );
};

export default Navbar;
