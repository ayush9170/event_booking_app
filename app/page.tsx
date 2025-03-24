
import { auth } from "@/component/auth";
import { redirect } from "next/navigation";
import Link from 'next/link';

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <>
     <Link href="/event">Book event or add events</Link>

     
    </>
  );
};

export default Page;