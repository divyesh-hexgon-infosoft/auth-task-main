import React, { useState, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_ADMIN } from '../graphql/mutations';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginAdmin, { loading, error }] = useLazyQuery(LOGIN_ADMIN);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginAdmin({ variables: formData });

    if (res.data) {
      login(res.data.login.token);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Admin Login</h2>

        {error && <p className="text-red-500 text-center mb-2">{error.message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your admin email"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-300"
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
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-300"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg transition duration-300 hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-4">
          Not an admin? <a href="/" className="text-indigo-600 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
