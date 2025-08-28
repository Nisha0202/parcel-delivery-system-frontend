// components/ReceiverDashboard.tsx
import { useReceivedParcelsQuery } from "../api";

export function ReceiverDashboard() {
  const { data, isLoading } = useReceivedParcelsQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold">Incoming Parcels</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
