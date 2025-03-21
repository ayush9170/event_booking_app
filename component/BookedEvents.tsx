import axios from "axios";



export async function BookedEvent(){

    const response = await axios.get("http://localhost:3000//api/event/private");

    return <div>
        {response.data.user_event.map((item :any, index:any) => (
        <li key={index}>{item}</li>
      ))}

    </div>
}


// interface INPUT {
//    item : object,
//    index : Number
    
// }