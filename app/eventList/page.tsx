"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"

interface Event {
  userId: string;
  title: string;
  description: string;
 createdAt :string;
  updatedAt  :string
}

export default function Eventlist() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession()

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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div> error {error}</div>;

  async function  booked(event: Event){
           await axios.post("http://localhost:3000/api/event/private",{
              title:event.title,
              description: event.description,
              userId :session?.user.id
            })
            console.log(event)
  }

  return (
    <div >
      <ul>
        {events.map((event) => (
          <li key={event.userId}>
            {event.description}
            <button onClick={() =>booked(event)}> Book Event</button>
            </li> 
        ))}
      </ul>
     
    </div>

  );
}
