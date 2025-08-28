// pages/admin/parcels.tsx
import { useAllParcelsQuery, useBlockParcelMutation, useUpdateParcelMutation } from "../../api";

export default function AdminParcels() {
  const { data: parcels, isLoading } = useAllParcelsQuery();
  const [blockParcel] = useBlockParcelMutation();
  const [updateStatus] = useUpdateParcelMutation();

  if (isLoading) return <p>Loading parcels...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Parcels</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels?.map((parcel: any) => (
            <tr key={parcel.id} className="border-b">
              <td>{parcel.id}</td>
              <td>{parcel.sender?.email}</td>
              <td>{parcel.receiver?.email}</td>
              <td>{parcel.status}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => blockParcel(parcel.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Block
                </button>
                <select
                  onChange={(e) => updateStatus({ id: parcel.id, status: e.target.value })}
                  className="border px-2"
                >
                  <option value="">Update Status</option>
                  <option value="approved">Approved</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
