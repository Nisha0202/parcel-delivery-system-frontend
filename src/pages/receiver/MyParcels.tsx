import {
  useReceivedParcelsQuery,
  useConfirmParcelMutation,
} from "../../api";
import { ArrowLeft, Loader2, PackageCheck, Truck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ReceivedParcels() {
  const { data, isLoading, isError, refetch } = useReceivedParcelsQuery();
  const [confirmParcel] = useConfirmParcelMutation();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const parcels = data?.data ?? [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(parcels.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentParcels = parcels.slice(startIdx, startIdx + itemsPerPage);

  const handleConfirm = async (id: string) => {
    setLoadingId(id);
    try {
      await confirmParcel(id).unwrap();
      toast.success("Parcel confirmed successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Error confirming delivery");
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading)
    return (
      <p className="text-center mt-6 py-6 text-gray-500 animate-pulse">
        Loading parcels...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 mt-6">
        Failed to load parcels.
      </p>
    );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
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
          <Truck className="text-blue-600" size={26} />
          Received Parcels
        </h2>
      </div>

      {/* 📦 Parcels Table */}
      {parcels.length === 0 ? (
        <p className="text-gray-500 text-center">
          No received parcels yet.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow border">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="hidden md:table-cell p-3 text-left">ID</th>
                  <th className="p-3 text-left">Tracking ID</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Weight</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentParcels.map((parcel: any) => (
                  <tr
                    key={parcel._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="hidden md:table-cell p-3 font-mono text-xs md:text-sm text-gray-700">
                      {parcel._id}
                    </td>
                    <td className="p-3">{parcel.trackingId}</td>
                    <td className="p-3">{parcel.type}</td>
                    <td className="p-3">{parcel.weight} kg</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          parcel.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : parcel.status === "In Transit"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {parcel.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-3">
                      {parcel.status === "In Transit" && (
                        <button
                          onClick={() => handleConfirm(parcel._id)}
                          disabled={loadingId === parcel._id}
                          className="flex items-center justify-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm disabled:opacity-50"
                        >
                          {loadingId === parcel._id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <PackageCheck size={16} />
                          )}
                          {loadingId === parcel._id
                            ? "Confirming..."
                            : "Confirm"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="fixed bottom-0 left-0 w-full flex justify-center items-center gap-2 p-4 bg-white shadow-md">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>

              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
