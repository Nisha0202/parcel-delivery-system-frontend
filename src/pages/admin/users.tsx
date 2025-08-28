// pages/admin/users.tsx
import { useNavigate } from "react-router-dom";
import { useUsersQuery, useBlockUserMutation, useUnblockUserMutation } from "../../api";
import { Mail, UserCircle2, Lock, Unlock, ArrowLeft } from "lucide-react";

export default function AdminUsers() {
  const { data, isLoading, refetch } = useUsersQuery();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const navigate = useNavigate();
  // Filter out admin users
  const users = data?.data?.filter((u: any) => u.role !== "admin");

  if (isLoading) return <p className="p-6 mt-12 text-gray-500">Loading users...</p>;

  return (
    <div className="p-6">
  <div className="flex items-center gap-4 mb-6">
  {/* ✅ Back Button */}
  <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
  >
    <ArrowLeft size={20} />
    <span className="text-sm font-medium">Back</span>
  </button>

  <h2 className="text-xl font-bold flex items-center gap-2">
    <UserCircle2 className="text-blue-600" size={28} />
    Users Management
  </h2>
</div>


      {/* ✅ Desktop Table View */}
      <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Block / Unblock</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users?.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-sm text-gray-700 flex items-center gap-2">
                  <Mail size={16} className="text-gray-500" />
                  {user.email}
                </td>
                <td className="px-4 py-3 text-sm font-medium">
                  {user.blocked ? (
                    <span className="flex items-center gap-1 text-red-600 font-semibold">
                      <Lock size={16} /> Blocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                      <Unlock size={16} /> Active
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={!user.blocked}
                      onChange={async () => {
                        if (user.blocked) {
                          await unblockUser(user.id);
                        } else {
                          await blockUser(user.id);
                        }
                        refetch();
                      }}
                    />
                    <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transform transition-all"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {users?.map((user: any) => (
          <div key={user.id} className="p-4 border rounded-lg shadow-sm bg-white flex flex-col gap-3">
            <div className="flex items-center gap-2 text-gray-700">
              <Mail size={16} className="text-gray-500" />
              <span className="text-sm font-medium">{user.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold flex items-center gap-1">
                {user.blocked ? (
                  <span className="text-red-600 flex items-center gap-1">
                    <Lock size={16} /> Blocked
                  </span>
                ) : (
                  <span className="text-green-600 flex items-center gap-1">
                    <Unlock size={16} /> Active
                  </span>
                )}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={!user.blocked}
                  onChange={async () => {
                    if (user.blocked) {
                      await unblockUser(user.id);
                    } else {
                      await blockUser(user.id);
                    }
                    refetch();
                  }}
                />
                <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transform transition-all"></span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
