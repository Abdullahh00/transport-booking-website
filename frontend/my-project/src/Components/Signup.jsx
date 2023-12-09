// Signup.js

import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log(signupData);

    try {
        const response = await axios.post('http://localhost:3000/users/add', signupData);

  
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }


  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
              <input
                className="border rounded w-full py-2 px-3 mt-1"
                type="text"
                name="name"
                value={signupData.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
              <input
                className="border rounded w-full py-2 px-3 mt-1"
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
              <input
                className="border rounded w-full py-2 px-3 mt-1"
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User Type:
              <select
                className="border rounded w-full py-2 px-3 mt-1"
                name="userType"
                value={signupData.userType}
                onChange={handleChange}
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
            type="submit"
          >
            Signup
          </button>
          
        
        <Link to="/login" className="text-sm">click If you have account move to login!</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
