


import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='w-full h-100'>
        <div className='flex justify-end items-center'>
      <h1> BOOKING_APP</h1>
<div>
<Link href="/signin">signIn</Link>
<Link href="/signup">signup</Link>
</div>
    </div>
    </div>
  );
};

export default Navbar;
