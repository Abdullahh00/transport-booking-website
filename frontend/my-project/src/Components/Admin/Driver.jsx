import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [driverName, setDriverName] = useState("");
  const [driverAge, setDriverAge] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/all_drivers");
      setDrivers(response.data);
    } catch (error) {
      console.log("Error fetching drivers:", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleEdit = (index) => {
    const driverToEdit = drivers[index];
    setDriverName(driverToEdit.name);
    setDriverAge(driverToEdit.age);
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    const driverId = drivers[index]._id;
    try {
      await axios.delete(`http://localhost:3000/users/drivers/${driverId}`);
      fetchDrivers(); // Refetch the driver list after deletion
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const driverData = { name: driverName, age: driverAge };

    try {
      if (editingIndex !== null) {
        // Update an existing driver
        await axios.put(`http://localhost:3000/users/drivers/${drivers[editingIndex]._id}`, driverData);
        alert("driver updated");
      } else {
        // Add a new driver
        await axios.post("http://localhost:3000/users/drivers", driverData);
        alert("driver addedd");
      }
      fetchDrivers(); // Refetch the driver list
      setDriverName("");
      setDriverAge("");
      setEditingIndex(null);
    } catch (error) {
      console.error("Error submitting driver data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        {/* Form fields for driver details */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Driver Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Driver Age
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={driverAge}
            onChange={(e) => setDriverAge(e.target.value)}
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </form>

      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-3">
        <h2 className="text-2xl font-semibold mb-4">Driver List</h2>
        {drivers.map((driver, index) => (
          <div key={index} className="mb-4">
            <p><strong>Name:</strong> {driver.name}</p>
            <p><strong>Age:</strong> {driver.age}</p>
            <div className="flex mt-2">
              <button
                onClick={() => handleEdit(index)}
                className="px-4 py-2 mr-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDrivers;
