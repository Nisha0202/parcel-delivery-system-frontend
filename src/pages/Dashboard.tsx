// pages/Dashboard.tsx
import { useSelector } from "react-redux";
import type { RootState } from "../store";
// import { SenderNavbar, ReceiverNavbar} from "./RolebasedNav";
// Import dashboards
import { SenderDashboard } from "../pages/sender/SenderDashboard";
import { ReceiverDashboard } from "../pages/receiver/ReceiverDashboard";
import { AdminDashboard } from "./admin/AdminDashboard";
export default function Dashboard() {
  const { role: userRole } = useSelector((s: RootState) => s.auth);

  return (
    <div className="">



      {/* Render pages dynamically */}
      <div className="mt-6">
        {userRole === "sender" && <SenderDashboard />}
        {userRole === "receiver" && <ReceiverDashboard />}
        {userRole === "admin" && <AdminDashboard />}
      </div>
    </div>
  );
}
