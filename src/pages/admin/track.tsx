// pages/admin/track.tsx
import { useState } from "react";
import { useTrackQuery } from "../../api";

export default function AdminTrack() {
  const [trackingId, setTrackingId] = useState("");
  const { data, isFetching } = useTrackQuery(trackingId, { skip: !trackingId });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Track Parcel</h2>
      <input
        type="text"
        placeholder="Enter tracking ID"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      {isFetching && <p>Loading...</p>}
      {data && (
        <pre className="mt-4 bg-gray-100 p-2 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
