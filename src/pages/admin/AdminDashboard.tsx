import { Link } from "react-router-dom";

export function AdminDashboard() {


  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Admin Panel</h2>
       <nav className="flex gap-4 p-4 bg-red-100 rounded-md shadow-md">
      <Link to="/admin/users">👥 Users</Link>
      <Link to="/admin/parcels">📦 Parcels</Link>
      <Link to="/admin/track">🔍 Track Parcel</Link>
      <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
    </nav>

    </div>
  );
}
