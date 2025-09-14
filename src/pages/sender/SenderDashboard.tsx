import { Link } from "react-router-dom";

export function SenderDashboard() {


  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Sender Panel</h2>
       <nav className="flex gap-4 p-4 bg-blue-100 rounded-md shadow-md">
      <Link to="/sender/parcels">📦 My Parcels</Link>
      <Link to="/sender/create-parcel">🔍 Create Parcel</Link>
      <Link to="/admin/track">🔍 Track Parcel</Link>
    </nav>
    <h2 className="text-xl font-semibold mt-12">Welcome!</h2>
    </div>
  );
}
