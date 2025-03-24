

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 justify-around">
         Booking App
        
          <div className="hidden md:flex space-x-6  ">
            <Link href="/">
             Home
            </Link>
            <Link href="/about">
            About
            </Link>
            <Link href="/signup">
            Sign Up
            </Link>
            <Link href="/signin">
             Sign In
            </Link>
          </div>
        </div>

      
      </div>
    </nav>
  );
};

export default Navbar;
