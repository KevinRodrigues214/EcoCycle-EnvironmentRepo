import { useEffect, useState } from "react";

export default function ManageUsers() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch pending community users
  const fetchPendingUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/pending");
      const data = await res.json();
      setPendingUsers(data);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching users");
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleApproval = async (id, action) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${action}/${id}`, {
        method: "PATCH"
      });
      const data = await res.json();
      setMessage(data.message);
      fetchPendingUsers(); // Refresh list
    } catch (err) {
      console.error(err);
      setMessage("Error updating user");
    }
  };

  return (
    <div>
      <h2>Pending Community Users</h2>
      {message && <p>{message}</p>}

      {pendingUsers.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Partner Type</th>
              <th>Organization / Business Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.partnerType}</td>
                <td>{user.partnerType === "event" ? user.organizationName : user.businessName}</td>
                <td>
                  <button onClick={() => handleApproval(user._id, "approve")}>Approve</button>
                  <button onClick={() => handleApproval(user._id, "reject")}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
