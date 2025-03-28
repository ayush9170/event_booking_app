"use client";

import { AddEvent } from "@/component/event";
import Eventlist from "@/component/eventlist";
import { useState } from "react";

export default function MyComponent() {
  const [cnt, setcnt] = useState(0);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
     
      <div style={{ zIndex: 1 }}>
        <Eventlist cnt={cnt} setcnt={setcnt} />
      </div>

     
      {cnt ? (
        <div
          style={{
            position: "absolute", 
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2, 
            backgroundColor: "rgba(255, 255, 255, 0.8)", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddEvent cnt={cnt} setcnt={setcnt} />
        </div>
      ) : null}
    </div>
  );
}
