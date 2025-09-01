// pages/admin/ParcelDetails.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useParcelDetailsQuery,
  useParcelStatusLogQuery,
  useTrackQuery
} from "../../api";
import { ArrowLeft } from "lucide-react";

export default function ParcelDetailsPage() {
  const navigate = useNavigate();
  const [parcelId, setParcelId] = useState("");
  const [trackingId, setTrackingId] = useState("");


// Parcel details + status log
const { data: parcelData, isLoading: loadingParcel, error: parcelError } = useParcelDetailsQuery(parcelId, { skip: !parcelId });
const { data: logData, isLoading: loadingLog } = useParcelStatusLogQuery(parcelId, { skip: !parcelId });

  // Track by tracking ID

const { data: trackData, isLoading: loadingTrack, error: trackError } = useTrackQuery(trackingId, { skip: !trackingId });

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
      >
        <ArrowLeft size={20} />
        Back
      </button>

    {/* SECTION 1: Parcel Details by ID */}
<div className="bg-white shadow rounded-lg p-6 space-y-4">
  <h1 className="text-2xl font-bold">Parcel Details (by Parcel ID)</h1>
  <input
    type="text"
    placeholder="Enter Parcel ID"
    value={parcelId}
    onChange={(e) => setParcelId(e.target.value)}
    className="border p-2 rounded w-full"
  />

  {parcelId && (loadingParcel || loadingLog) ? (
    <p className="text-gray-500 animate-pulse">Loading...</p>
  ) : parcelData?.data ? (
    <>
      <div className="space-y-2">
        <div><strong>Tracking ID:</strong> {parcelData.data.trackingId}</div>
        <div><strong>Type:</strong> {parcelData.data.type}</div>
        <div><strong>Weight:</strong> {parcelData.data.weight} kg</div>
        <div><strong>Sender:</strong> {parcelData.data.sender}</div>
        <div><strong>Receiver:</strong> {parcelData.data.receiver}</div>
        <div><strong>Pickup:</strong> {parcelData.data.pickupAddress}</div>
        <div><strong>Delivery:</strong> {parcelData.data.deliveryAddress}</div>
        <div><strong>Fee:</strong> {parcelData.data.fee} BDT</div>
        <div>
          <strong>Status:</strong>{" "}
          <span className={`ml-2 px-2 py-1 rounded-full text-white ${
            parcelData.data.status === 'Delivered' ? 'bg-green-600' :
            parcelData.data.status === 'Dispatched' ? 'bg-blue-600' : 'bg-gray-500'
          }`}>
            {parcelData.data.status}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold text-lg">Status History</h2>
        {logData?.data?.length === 0 ? (
          <p className="text-gray-500">No status updates yet.</p>
        ) : (
          <ul className="space-y-2 mt-2">
            {logData.data.map((log: any, idx: number) => (
              <li key={idx} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between">
                  <span className="font-semibold">{log.status}</span>
                  <span className="text-gray-500 text-sm">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                {log.note && <div className="text-gray-600 text-sm">{log.note}</div>}
                {log.location && <div className="text-gray-400 text-sm">Location: {log.location}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  ) : parcelError ? (
    <p className="text-red-500">
      {(parcelError as any)?.status === 404
        ? "Parcel not found"
        : (parcelError as any)?.status === 403
        ? "Parcel has been blocked by admin"
        : "Error fetching parcel details"}
    </p>
  ) : null}
</div>


     
     {/* SECTION 2: Track Parcel by Tracking ID */}
<div className="bg-white shadow rounded-lg p-6 space-y-4">
  <h1 className="text-2xl font-bold">Track Parcel (by Tracking ID)</h1>
  <input
    type="text"
    placeholder="Enter Tracking ID"
    value={trackingId}
    onChange={(e) => setTrackingId(e.target.value)}
    className="border p-2 rounded w-full"
  />

  {trackingId && (
    loadingTrack ? (
      <p className="text-gray-500 animate-pulse">Tracking...</p>
    ) : trackData?.success ? (
      <div className="space-y-2 mt-2">
        <div><strong>Current Status:</strong> {trackData.data.currentStatus}</div>
        <h3 className="font-semibold mt-2">History:</h3>
        <ul className="space-y-1">
          {trackData.data.history.map((log: any, idx: number) => (
            <li key={idx} className="border-l-2 border-blue-500 pl-3">
              <div className="flex justify-between">
                <span>{log.status}</span>
                <span className="text-gray-500 text-sm">{new Date(log.timestamp).toLocaleString()}</span>
              </div>
              {log.note && <div className="text-gray-600 text-sm">{log.note}</div>}
              {log.location && <div className="text-gray-400 text-sm">Location: {log.location}</div>}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      // ✅ Proper error handling for blocked / canceled / not found
      <p className="text-red-500">
        { (trackError as any)?.status === 404
            ? "Parcel not found"
            : (trackError as any)?.status === 403
            ? "Parcel has been blocked by admin"
            : (trackError as any)?.status === 410
            ? "Parcel was canceled by sender"
            : "Error tracking parcel" }
      </p>
    )
  )}
</div>

    </div>
  );
}
