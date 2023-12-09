// App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
const Vehicle = () => {
  const [drivers, setDrivers] = useState([]);
  const [carName, setCarName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [driverName, setDriverName] = useState("");
  const [all_cars, set_all_cars] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
const [random,setrand]=useState(null);

const fetchDrivers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/users/all_drivers"); 
    setDrivers(response.data);
  } catch (e) {
    console.log(e);
  }
};

useEffect(() => {
  

  fetchDrivers();
  
}, []);


  const handleEdit = (index) => {
    const carToEdit = all_cars[index];
    setCarName(carToEdit.name);
    setCarModel(carToEdit.model);
    setDriverName(carToEdit.drivername);
    setEditingIndex(index);
  };


  const handleItemSubmit_delete=async(index)=>{
    if (editingIndex !== null) {
      try {
        const updatedCars = [...all_cars];
        updatedCars[index] = {
          name: "",
          model: "",
          drivername: "",
        };
        console.log("updatedCarsupdatedCars ", updatedCars);
        const filteredArray = updatedCars.filter(item => item.name !== '');
        console.log("updatedCars ", filteredArray);
        
        await axios.post("http://localhost:3000/users/update_vehicle", {
          vehicles: filteredArray,
        });
        
        alert("updated")
        setrand(Math.floor(Math.random() * (1000000 - 1 + 1)) + 1)
        setCarName("");
        setCarModel("");
        setDriverName("");
        setEditingIndex(null);
      } catch (error) {
        console.error("Error updating vehicles:", error);
      }
    }
  }

  const handleItemSubmit = async (index) => {
    if (editingIndex !== null) {
      try {
        const updatedCars = [...all_cars];
        updatedCars[index] = {
          name: carName,
          model: carModel,
          drivername: driverName,
        };
        console.log("updatedCars ", updatedCars);
        // Send the updated array to the backend
        await axios.post("http://localhost:3000/users/update_vehicle", {
          vehicles: updatedCars,
        });
        
        alert("updated")
        setrand(Math.floor(Math.random() * (1000000 - 1 + 1)) + 1)
        setCarName("");
        setCarModel("");
        setDriverName("");
        setEditingIndex(null);
      } catch (error) {
        console.error("Error updating vehicles:", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (carModel !== "" && carName !== "" && driverName !== "") {
      var object = {
        carName,
        carModel,
        driverName,
      };
      try {
        var response = await axios.post(
          "http://localhost:3000/users/add_vehicle",
          object
        );
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("enter all fields");
    }
  };

  useEffect(() => {
    const getvehicle = async () => {
      try {
        var response = await axios.get(
          "http://localhost:3000/users/all_vehicles"
        );
        set_all_cars(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getvehicle();
  }, [random]);

  return (
    <div className="container mx-auto mt-8">
      <form className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Car Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Car Model
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
          />
        </div>

        <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold mb-2">
          Driver name
        </label>
        <select
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
        >
          {drivers.map((driver, index) => (
            <option key={index} value={driver.name}>
              {driver.name}
            </option>
          ))}
        </select>
      </div>

        {editingIndex === null && (
          <div className="flex justify-between">
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Submit
            </button>
          </div>
        )}
      </form>
      {/* here bwlow i want good list with edit button and submit button on each index */}
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-3">
        <h2 className="text-2xl font-semibold mb-4">Vehicle List</h2>
        {all_cars.map((car, index) => (
          <div key={index} className="mb-4">
            <p>
              <strong>Car Name:</strong> {car.name}
            </p>
            <p>
              <strong>Car Model:</strong> {car.model}
            </p>
            <p>
              <strong>Driver Name:</strong> {car.drivername}
            </p>
            <div className="flex mt-2">
              <button
                onClick={() => handleEdit(index)}
                className="px-4 py-2 mr-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray"
              >
                Edit
              </button>
              {editingIndex !== null && (
                <>
                <button
                  onClick={() => handleItemSubmit(index)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                  Submit
                </button>

                <button
                  onClick={() => handleItemSubmit_delete(index)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ml-3"
                >
                  Delete
                </button>
                </>
                
              )}



            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicle;
