import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUser from './AddUser';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userToDelete}`);
      setShowModal(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      setShowModal(false);
      setUserToDelete(null);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center tracking-tight flex items-center justify-center gap-2">
        <span role="img" aria-label="users">👤</span>
        User List
      </h2>
      <button
        onClick={() => setShowAdd(true)}
        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold mb-6 shadow hover:from-green-600 hover:to-emerald-600 transition-all"
      >
        + Add User
      </button>
      {showAdd && <AddUser onClose={() => { setShowAdd(false); fetchUsers(); }} />}
      <div className="overflow-x-auto rounded-xl shadow mt-2">
        <table className="w-full border-collapse bg-white rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-50">
              <th className="border-b p-3 text-left font-semibold text-gray-700">First Name</th>
              <th className="border-b p-3 text-left font-semibold text-gray-700">Last Name</th>
              <th className="border-b p-3 text-left font-semibold text-gray-700">Created At</th>
              <th className="border-b p-3 text-left font-semibold text-gray-700">Updated At</th>
              <th className="border-b p-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.userId} className="hover:bg-indigo-50 transition">
                  <td className="p-3 border-b">{user.firstName}</td>
                  <td className="p-3 border-b">{user.lastName}</td>
                  <td className="p-3 border-b">{user.createdAt ? user.createdAt.split('T')[0] : '-'}</td>
                  <td className="p-3 border-b">{user.updatedAt ? user.updatedAt.split('T')[0] : '-'}</td>
                  <td className="p-3 border-b flex gap-2">
                    {/* Edit functionality can be added here */}
                    <button
                      onClick={() => confirmDelete(user.userId)}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1 rounded-lg font-medium shadow hover:from-red-600 hover:to-pink-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">Confirm Delete</h3>
            <p className="mb-6 text-gray-600 text-center">Are you sure you want to delete this user?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-pink-600 transition-all"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold border border-gray-300 shadow hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;