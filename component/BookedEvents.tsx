"use client"
import axios from "axios";
import { useEffect, useState } from "react";

interface Event {
  userId: string;
  title: string;
  description: string;
 createdAt :string;
  updatedAt  :string
}

export  function BookedEvent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/event/private");
        setEvents(response.data.user_event);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, [events]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className=" bg white"> error {error}</div>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {events.map((event) => (
      <li key={event.createdAt} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
        <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
          <h3 className="text-xl font-semibold text-gray-800">{event.description}</h3>
         
        </div>
        <button   className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
         onClick={async ()=>{
                         await axios.delete("http://localhost:3000/api/event/private",{
                          data: {
                            title: event.title
                          }
                  
                         })
          }}>DELETE EVENT </button>
      </li>
    ))}
  </ul>
  </div>
  );
}
