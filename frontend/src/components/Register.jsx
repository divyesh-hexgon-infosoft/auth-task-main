import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [registerUser, { data, error }] = useMutation(REGISTER_USER);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await registerUser({ variables: formData });
    setLoading(false);
    alert("Registration successful! Please verify your email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Register</h2>

        {error && <p className="text-red-500 text-center mb-2">{error.message}</p>}
        {data && <p className="text-green-500 text-center mb-2">{data.register}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-300"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-300"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-300"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Select Role</label>
            <select
              name="role"
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-white focus:ring focus:ring-blue-300"
              onChange={handleChange}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-300 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-4">
          Already have an account? <a href="/admin-login" className="text-blue-600 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
