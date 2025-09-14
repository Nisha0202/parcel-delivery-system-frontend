import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../../api";
import { Mail, UserCircle2, Lock, Unlock, ArrowLeft} from "lucide-react";
import toast from "react-hot-toast";


export default function AdminUsers() {
  const { data, isLoading, refetch } = useUsersQuery();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null); 
  const usersPerPage = 5;

  const users = data?.data?.filter((u: any) => u.role !== "admin") || [];
  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  if (isLoading)
    return (
      <p className="p-6 mt-12 text-center text-gray-500 animate-pulse">
        Loading users...
      </p>
    );

  const handleToggle = async (user: any) => {
    setUpdatingUserId(user._id);
    try {
      if (user.isBlocked) {
        await unblockUser(user._id).unwrap();
      } else {
        await blockUser(user._id).unwrap();
      }
      refetch();
    } catch (err) {
      console.error("Failed to toggle user block:", err);
    } finally {
      setUpdatingUserId(null);
    }
  };

  
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
          <UserCircle2 className="text-blue-600" size={26} />
          Users Management
        </h2>
      </div>

      {/* 👤 Users Table */}
      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow border">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="hidden md:table-cell p-3 text-left">ID</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user: any) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="hidden md:table-cell p-3 font-mono text-xs md:text-sm text-gray-700">
                      {user._id}
                    </td>
                    <td className="p-3 flex items-center gap-2">
                      <Mail size={16} className="text-gray-500" />
                      {user.email}
                    </td>
                    <td className="p-3">
                      {user.isBlocked ? (
                        <span className="flex items-center gap-1 text-red-600 font-semibold">
                          <Lock size={16} /> Blocked
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                          <Unlock size={16} /> Active
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-3 flex gap-2">
                      {user.isBlocked ? (
                        <button
                          onClick={async () => {
                            try {
                              await unblockUser(user._id).unwrap();
                              toast.success("User unblocked!");
                              refetch();
                            } catch (err: any) {
                              toast.error("Failed to unblock user.");
                            }
                          }}
                          className="flex items-center justify-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm"
                        >
                          <Unlock size={16} />
                          <span className="hidden sm:inline">Unblock</span>
                        </button>
                      ) : (
                        <button
                          onClick={async () => {
                            try {
                              await blockUser(user._id).unwrap();
                              toast.success("User blocked!");
                              refetch();
                            } catch (err: any) {
                              toast.error("Failed to block user.");
                            }
                          }}
                          className="flex items-center justify-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
                        >
                          <Lock size={16} />
                          <span className="hidden sm:inline">Block</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📄 Pagination Controls */}
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
        </>
      )}
    </div>
  );


}
