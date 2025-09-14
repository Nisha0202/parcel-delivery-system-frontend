// pages/admin/ParcelDetails.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useParcelDetailsQuery,
  useParcelStatusLogQuery,
  useTrackQuery
} from "../../api";


import { ArrowLeft, Package, Search } from "lucide-react";

export default function ParcelDetailsPage() {
  const navigate = useNavigate();
  const [parcelId, setParcelId] = useState("");
  const [trackingId, setTrackingId] = useState("");

  // API hooks
  const {
    data: parcelData,
    isLoading: loadingParcel,
    error: parcelError,
  } = useParcelDetailsQuery(parcelId, { skip: !parcelId });

  const { data: logData, isLoading: loadingLog } = useParcelStatusLogQuery(
    parcelId,
    { skip: !parcelId }
  );

  const {
    data: trackData,
    isLoading: loadingTrack,
    error: trackError,
  } = useTrackQuery(trackingId, { skip: !trackingId });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
      {/* 🔙 Back + Title */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Package className="text-blue-600" size={26} />
          Parcel Details & Tracking
        </h2>
      </div>

      {/* SECTION 1: Parcel Details by ID */}
      <div className="bg-transparent max-w-4xl mx-auto mt-12 sm:mt-20 rounded-lg shadow border p-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Search size={18} className="text-blue-600" />
          Find Parcel (by Parcel ID)
        </h3>
        <input
          type="text"
          placeholder="Enter Parcel ID"
          value={parcelId}
          onChange={(e) => setParcelId(e.target.value)}
          className="border px-3 py-2 rounded-md w-full text-sm focus:ring focus:ring-blue-200"
        />

        {parcelId && (loadingParcel || loadingLog) ? (
          <p className="text-gray-500 animate-pulse">Loading...</p>
        ) : parcelData?.data ? (
          <>
            {/* Parcel Info Table */}
            <div className="overflow-x-auto rounded-lg border shadow-sm">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Tracking ID</td>
                    <td className="p-3">{parcelData.data.trackingId}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Type</td>
                    <td className="p-3">{parcelData.data.type}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Weight</td>
                    <td className="p-3">{parcelData.data.weight} kg</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Sender</td>
                    <td className="p-3">{parcelData.data.sender}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Receiver</td>
                    <td className="p-3">{parcelData.data.receiver}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Pickup</td>
                    <td className="p-3">{parcelData.data.pickupAddress}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Delivery</td>
                    <td className="p-3">{parcelData.data.deliveryAddress}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Fee</td>
                    <td className="p-3">{parcelData.data.fee} BDT</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Status</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          parcelData.data.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : parcelData.data.status === "Dispatched"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {parcelData.data.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Status History */}
            <div className="mt-6">
              <h4 className="font-semibold text-md mb-2">📄 Status History</h4>
              {logData?.data?.length === 0 ? (
                <p className="text-gray-500">No status updates yet.</p>
              ) : (
                <ul className="space-y-2">
                  {logData.data.map((log: any, idx: number) => (
                    <li
                      key={idx}
                      className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-md"
                    >
                      <div className="flex justify-between m-2 px-4">
                        <span className="font-medium">{log.status}</span>
                        <span className="text-gray-500 text-sm">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      {log.note && (
                        <div className="text-gray-600 text-sm">{log.note}</div>
                      )}
                      {log.location && (
                        <div className="text-gray-400 text-sm">
                          Location: {log.location}
                        </div>
                      )}
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
      <div className="bg-transparent max-w-4xl mx-auto rounded-lg shadow border p-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Search size={18} className="text-blue-600" />
          Track Parcel (by Tracking ID)
        </h3>
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="border px-3 py-2 rounded-md w-full text-sm focus:ring focus:ring-blue-200"
        />

        {trackingId &&
          (loadingTrack ? (
            <p className="text-gray-500 animate-pulse">Tracking...</p>
          ) : trackData?.success ? (
            <div className="overflow-x-auto rounded-lg border shadow-sm mt-2">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Current Status</td>
                    <td className="p-3">{trackData.data.currentStatus}</td>
                  </tr>
                </tbody>
              </table>

              <h4 className="font-semibold mt-4">📄 History</h4>
              <ul className="space-y-2 mt-2">
                {trackData.data.history.map((log: any, idx: number) => (
                  <li
                    key={idx}
                    className="border-l-2 border-blue-500 pl-3 py-2 bg-gray-50 rounded-md"
                  >
                    <div className="flex justify-between px-4 m-2">
                      <span>{log.status}</span>
                      <span className="text-gray-500 text-sm">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    {log.note && (
                      <div className="text-gray-600 text-sm">{log.note}</div>
                    )}
                    {log.location && (
                      <div className="text-gray-400 text-sm">
                        Location: {log.location}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-red-500">
              {(trackError as any)?.status === 404
                ? "Parcel not found"
                : (trackError as any)?.status === 403
                ? "Parcel has been blocked by admin"
                : (trackError as any)?.status === 410
                ? "Parcel was canceled by sender"
                : "Error tracking parcel"}
            </p>
          ))}
      </div>
    </div>
  );
}

