import React, { useState } from 'react';
import axios from 'axios';

// AddUser component allows adding a new user via a modal form
const AddUser = ({ onClose }) => {
  // State for form fields and error message
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input fields
    if (!firstName.trim() || !lastName.trim()) {
      setError('First and last name are required.');
      return;
    }
    try {
      // Send POST request to backend to add user
      await axios.post('http://localhost:8080/api/users', {
        firstName,
        lastName,
      });
      // Close modal and refresh user list in parent
      onClose();
    } catch (err) {
      setError('Error adding user.', err.message);
    }
  };

  return (
    // Modal overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full border border-gray-200">
        {/* Modal title */}
        <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">Add User</h3>
        {/* User form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* First Name input */}
          <input
            type="text"
            placeholder="First Name"
            className="p-3 border border-gray-300 rounded-lg"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* Last Name input */}
          <input
            type="text"
            placeholder="Last Name"
            className="p-3 border border-gray-300 rounded-lg"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {/* Error message */}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {/* Action buttons */}
          <div className="flex justify-center gap-4 mt-2">
            {/* Submit button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-green-600 hover:to-emerald-600 transition-all"
            >
              Add
            </button>
            {/* Cancel button */}
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold border border-gray-300 shadow hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;