import { Link } from "react-router-dom";


export function SenderNavbar() {
  return (
    <nav className="flex gap-4 p-4 bg-blue-100 rounded-md">
      <Link to="/parcels/create">📦 Create Parcel</Link>
      <Link to="/parcels/me">📋 My Parcels</Link>
    </nav>
  );
}

export function ReceiverNavbar() {
  return (
    <nav className="flex gap-4 p-4 bg-green-100 rounded-md">
      <Link to="/parcels/received">📥 Incoming Parcels</Link>
      <Link to="/parcels/track">🔍 Track Parcel</Link>
    </nav>
  );
}



