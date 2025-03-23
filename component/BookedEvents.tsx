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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className=" bg white"> error {error}</div>;

  return (
    <div className="bg white">
      <ul>
        {events.map((event) => (
          <li key={event.userId}>{event.description}</li> 
        ))}
      </ul>
    </div>
  );
}
