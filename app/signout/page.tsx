'use client'; 
import { SignOut } from "@/component/sign_out";
import { redirect } from "next/navigation";


export default function () {
   function cancel(){
    redirect("/eventList")
   }
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="text-center shadow-md bg-grey rounded-lg p-8  bg-blur-sm ">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 mb-3">Are you sure you want to sign out?</h1>
        
    <span className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-red-700 cursor-pointer transition duration-200"> <SignOut></SignOut></span>
    <button    onClick={cancel}className=" ml-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-green-700 cursor-pointer transition duration-200"> Cancel</button>
      </div>
    </div>
  );
}
