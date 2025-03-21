import axios from "axios";

export default async function Eventlist(){
const event = await axios.get("http://localhost:3000/api/event/public");

return <div>
     {event.data.events.map((item :any, index:any) => (
        <li key={index}>{item}</li>
      ))}
</div>

}