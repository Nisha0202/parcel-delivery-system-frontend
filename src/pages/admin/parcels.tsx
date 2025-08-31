// pages/admin/parcels.tsx
import { useNavigate } from "react-router-dom";
import {
  useAllParcelsQuery,
  useBlockParcelMutation,
  useUpdateParcelMutation,
} from "../../api";
import { ArrowLeft, Ban, CheckCircle, Package } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminParcels() {
  const { data, isLoading } = useAllParcelsQuery();
  const [blockParcel] = useBlockParcelMutation();
  const [updateStatus] = useUpdateParcelMutation();
  const navigate = useNavigate();

  const parcels = data?.data ?? [];

  if (isLoading)
    return (
      <p className="text-center mt-6 py-6 text-gray-500 animate-pulse">
        Loading parcels...
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
          <Package className="text-blue-600" size={26} />
          All Parcels
        </h2>
      </div>

      {/* 📦 Parcels Table */}
      {parcels.length === 0 ? (
        <p className="text-gray-500 text-center">No parcels found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border">
          <table className="w-full text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="hidden md:table-cell p-3 text-left">ID</th>
                <th className="p-3 text-left">Tracking ID</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel: any) => (
                <tr
                  key={parcel._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="hidden md:table-cell p-3 font-mono text-xs md:text-sm text-gray-700">
                    {parcel._id}
                  </td>
                  <td className="p-3">{parcel?.trackingId}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        parcel.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : parcel.status === "In Transit"
                          ? "bg-yellow-100 text-yellow-700"
                          : parcel.status === "Blocked"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 flex flex-col sm:flex-row gap-2">
                    {/* Block button */}
                    <button
                      onClick={() => blockParcel(parcel._id)}
                      className="flex items-center justify-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
                    >
                      <Ban size={16} />
                      <span className="hidden sm:inline">Block</span>
                    </button>

                    {/* Update status dropdown */}
                    <div className="flex items-center gap-1 border rounded-md px-2">
                      <CheckCircle size={16} className="text-blue-600" />
                      <select
                        onChange={async (e) => {
                          if (!e.target.value) return;
                          try {
                            await updateStatus({ id: parcel._id, status: e.target.value }).unwrap();
                            toast.success("Status updated successfully!");
                          } catch (err: any) {
                            console.error(err);
                            toast.error(err?.data?.message || "Update failed");
                          }
                        }}
                        className="bg-transparent outline-none text-sm py-1"
                      >
                        <option value="">Update</option>
                        <option value="Approved">Approved</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="In Transit">In Transit</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
