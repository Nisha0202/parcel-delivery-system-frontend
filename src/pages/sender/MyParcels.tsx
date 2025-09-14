import { useMeParcelsQuery, useCancelParcelMutation } from "../../api";
import { Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MyParcels() {
  const { data, isLoading, isError, refetch } = useMeParcelsQuery();
  const [cancelParcel] = useCancelParcelMutation();
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const parcelsPerPage = 5; // how many parcels per page
  const navigate = useNavigate();

  const handleCancel = async (id: string) => {
    setCancelingId(id);
    try {
      await cancelParcel(id).unwrap();
      refetch();
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "Something went wrong while canceling parcel";
      alert(errorMessage);
    } finally {
      setCancelingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-blue-600 w-6 h-6" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-6">
        Failed to load parcels.
      </div>
    );
  }

  const parcels = data?.data || [];

  // ✅ Pagination logic
  const totalPages = Math.ceil(parcels.length / parcelsPerPage);
  const startIndex = (currentPage - 1) * parcelsPerPage;
  const paginatedParcels = parcels.slice(startIndex, startIndex + parcelsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* 🔙 Back + Title */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h2 className="text-xl font-semibold mb-6">📦 My Parcels</h2>
      </div>

      {parcels.length === 0 ? (
        <div className="text-center text-gray-500 bg-gray-50 p-6 rounded-lg shadow-sm">
          You don’t have any parcels yet.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full border-collapse bg-transparent text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 sm:p-3 border-b">Tracking ID</th>
                  <th className="p-2 sm:p-3 border-b">Type</th>
                  <th className="p-2 sm:p-3 border-b">Weight</th>
                  <th className="p-2 sm:p-3 border-b">Fee</th>
                  <th className="p-2 sm:p-3 border-b">Status</th>
                  <th className="p-2 sm:p-3 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedParcels.map((parcel: any) => (
                  <tr
                    key={parcel._id}
                    className="hover:bg-gray-50 transition-colors text-left"
                  >
                    <td className="p-2 sm:p-3 border-b">{parcel.trackingId}</td>
                    <td className="p-2 sm:p-3 border-b">{parcel.type}</td>
                    <td className="p-2 sm:p-3 border-b">{parcel.weight} kg</td>
                    <td className="p-2 sm:p-3 border-b">
                      ৳{parcel.fee?.toLocaleString() || 0}
                    </td>
                    <td
                      className={`p-2 sm:p-3 border-b font-medium ${
                        parcel.status === "Canceled"
                          ? "text-red-600"
                          : parcel.status === "Delivered"
                          ? "text-green-600"
                          : "text-gray-700"
                      }`}
                    >
                      {parcel.status}
                    </td>
                    <td className="p-2 sm:p-3 border-b">
                      {parcel.status === "Requested" && (
                        <button
                          onClick={() => handleCancel(parcel._id)}
                          disabled={cancelingId === parcel._id}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition disabled:opacity-60"
                        >
                          {cancelingId === parcel._id ? "Cancelling..." : "Cancel"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Pagination Controls */}
          {totalPages > 1 && (
            <div className="fixed bottom-0 left-0 w-full flex justify-center p-4 items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
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
