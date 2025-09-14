import { Link } from "react-router-dom";

export function ReceiverDashboard() {


  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Receiver Panel</h2>
       <nav className="flex gap-4 p-4 bg-blue-100 rounded-md shadow-md">
      <Link to="/receiver/my-parcels">📦 My Parcels</Link>
      <Link to="/admin/track">🔍 Track Parcel</Link>
    </nav>
    <h2 className="text-xl font-semibold mt-12">Welcome!</h2>
    </div>
  );
}
