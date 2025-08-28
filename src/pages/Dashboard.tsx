import { useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  useMeParcelsQuery,
  useReceivedParcelsQuery,
  useAllParcelsQuery,
  useUsersQuery,
} from "../api";

export default function Dashboard() {
  const { role: userRole } = useSelector((s: RootState) => s.auth);
  console.log("Redux auth:", useSelector((s: RootState) => s.auth));

  const meParcelsQuery = useMeParcelsQuery(undefined, { skip: userRole !== "sender" });
  const receivedParcelsQuery = useReceivedParcelsQuery(undefined, { skip: userRole !== "receiver" });
  const allParcelsQuery = useAllParcelsQuery(undefined, { skip: userRole !== "admin" });
  const usersQuery = useUsersQuery(undefined, { skip: userRole !== "admin" });

  if (userRole === "sender") {
    return (
      <div className="p-6">
        <h2>My Parcels</h2>
        <pre>{JSON.stringify(meParcelsQuery.data, null, 2)}</pre>
      </div>
    );
  }

  if (userRole === "receiver") {
    return (
      <div className="p-6">
        <h2>Incoming Parcels</h2>
        <pre>{JSON.stringify(receivedParcelsQuery.data, null, 2)}</pre>
      </div>
    );
  }

  if (userRole === "admin") {
    return (
      <div className="p-6">
        <h2>Admin Panel</h2>
        <h3>Users</h3>
        <pre>{JSON.stringify(usersQuery.data, null, 2)}</pre>
        <h3>Parcels</h3>
        <pre>{JSON.stringify(allParcelsQuery.data, null, 2)}</pre>
      </div>
    );
  }

  return <div className="p-6">Unknown role</div>;
}
