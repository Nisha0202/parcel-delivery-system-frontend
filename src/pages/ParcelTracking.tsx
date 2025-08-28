import { useState } from "react";
import { useTrackQuery } from "../api";

export default function ParcelTracking(){
  const [id,setId]=useState(""); const {data}=useTrackQuery(id,{skip:!id});
  return <div className="p-6">
    <input value={id} onChange={e=>setId(e.target.value)} placeholder="Enter Tracking ID" className="border p-2"/>
    {data && <pre>{JSON.stringify(data,null,2)}</pre>}
  </div>;
}
