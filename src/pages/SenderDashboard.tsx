// components/SenderDashboard.tsx
import  {useMeParcelsQuery } from "../api";

export function SenderDashboard() {
  const { data, isLoading } = useMeParcelsQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold">My Parcels</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
