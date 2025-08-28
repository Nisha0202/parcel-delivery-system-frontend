// pages/admin/users.tsx
import { useUsersQuery, useBlockUserMutation, useUnblockUserMutation } from "../../api";

export default function AdminUsers() {
  const { data, isLoading } = useUsersQuery();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
const users = data?.data;
  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any) => (
            <tr key={user.id} className="border-b">
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.blocked ? "🚫 Blocked" : "✅ Active"}</td>
              <td>
                {user.blocked ? (
                  <button
                    onClick={() => unblockUser(user.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => blockUser(user.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
