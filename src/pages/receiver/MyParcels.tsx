import { useReceivedParcelsQuery, useConfirmParcelMutation } from "../../api";
import { Loader2, PackageCheck, Truck } from "lucide-react";
import { useState } from "react";

export default function ReceivedParcels() {
  const { data, isLoading, isError, refetch } = useReceivedParcelsQuery();
  const [confirmParcel] = useConfirmParcelMutation();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (isLoading) return <p className="text-center p-6">Loading parcels...</p>;
  if (isError) return <p className="text-red-500 text-center">Failed to load parcels.</p>;

  const handleConfirm = async (id: string) => {
    try {
      setLoadingId(id);
      await confirmParcel(id).unwrap();
      refetch();
    } catch (err: any) {
      alert(err?.data?.message || "Error confirming delivery");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Truck className="w-6 h-6" /> Received Parcels
      </h1>

      {data?.data?.length === 0 && (
        <p className="text-gray-500 text-center">No received parcels yet.</p>
      )}

      <div className="grid gap-4">
        {data?.data?.map((parcel: any) => (
          <div
            key={parcel._id}
            className="border rounded-2xl p-4 shadow-sm bg-white flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{parcel.type} • {parcel.weight}kg</p>
              <p className="text-sm text-gray-600">
                Tracking ID: {parcel.trackingId}
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    parcel.status === "Delivered"
                      ? "text-green-600"
                      : parcel.status === "In Transit"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {parcel.status}
                </span>
              </p>
            </div>

            {parcel.status === "In Transit" && (
              <button
                onClick={() => handleConfirm(parcel._id)}
                disabled={loadingId === parcel._id}
                className="px-4 py-2 bg-green-600 text-white rounded-xl flex items-center gap-2 hover:bg-green-700 disabled:opacity-50"
              >
                {loadingId === parcel._id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <PackageCheck className="w-4 h-4" />
                )}
                Confirm Delivery
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
