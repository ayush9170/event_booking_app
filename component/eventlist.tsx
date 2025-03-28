"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

import Link from 'next/link';


interface Event {
  userId: string;
  title: string;
  description: string;
 createdAt :string;
  updatedAt  :string
}

export default function Eventlist({cnt,setcnt}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  
  const router = useRouter();

 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/event/public");
        setEvents(response.data.events);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, [cnt]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div> error {error}</div>;

  async function  booked(event: Event){
           await axios.post("http://localhost:3000/api/event/private",{
              title:event.title,
              description: event.description,
              userId :session?.user.id,
              Count :1
            })
           
  }

  return (
    <div className="relative min-h-screen flex bg-black ">
       
  <div className="w-64 bg-gray-900 text-white p-6 absolute left-0 top-0 bottom-0 flex flex-col justify-between shadow-lg">
    <div>
      <h2 className="text-2xl font-semibold mb-6">MAIN MENU</h2>
      <ul className="space-y-4">
        <li>
          <Link href="/booked_event">
           BOOKED EVENT
          </Link>
        </li>
        <li>
         <button onClick={()=>{setcnt(1)}}>ADD NEW EVENT</button>
        </li>
      </ul>
    </div>
  </div>

  {/* Main Content */}
  <div className="flex-grow ml-64 p-6 bg-gray-100 rounded-lg">
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <li key={event.userId} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
          <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3><br></br>
            <h3 className="text-xl font-semibold text-gray-800">{event.description}</h3>
          </div>
          <button   
            onClick={() => booked(event)}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
         Book Event
          </button>
        </li>
      ))}
    </ul>

    {/* Plus Button at Bottom Right */}
    <button
      onClick={() => {router.push("/event")}}
      className="absolute bottom-6 right-6 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition duration-300"
    >
      <span className="text-2xl font-bold">+</span>
    </button>
  </div>
</div>


  );
}
