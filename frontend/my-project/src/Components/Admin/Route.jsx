// App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
const Routes = () => {

  const [drivers, setDrivers] = useState([]);

  const [routeId, setRouteId] = useState(null);

  const [travelto, settravelto] = useState("");
  const [travelfrom, settravelfrom] = useState("");
  const [driverName, setDriverName] = useState("");
  const [routes_all, set_all_routes] = useState([]);
  const [fare, setFare] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [random, setrand] = useState(0);
  const handleEdit = (index) => {
    const carToEdit = routes_all[index];
    settravelto(carToEdit.to);
    settravelfrom(carToEdit.from);
    setDriverName(carToEdit.drivername);
    setFare(carToEdit.fare);
    setEditingIndex(index);
    setRouteId(carToEdit._id);
  };

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

  const handleItemSubmit_delete = async (index) => {
    if (editingIndex !== null) {
      try {
        const updatedCars = [...routes_all];
        updatedCars[index] = {
          from: "",
          to: "",
          drivername: "",
          fare: "",
        };
        console.log("updatedCarsupdatedCars ", updatedCars);
        const filteredArray = updatedCars.filter((item) => item.from !== "");
        

       var data= await axios.post("http://localhost:3000/users/update_Route", {
          Routess: filteredArray,
        });

        if(data){
            alert("updated");
            setrand(Math.floor(Math.random() * (1000000 - 1 + 1)) + 1);
            settravelto("");
            settravelfrom("");
            setDriverName("");
            setFare("");
            setEditingIndex(null);
        }

       
      } catch (error) {
        console.error("Error updating vehicles:", error);
      }
    }
  };

  const handleItemSubmit = async (index) => {
    if (editingIndex !== null) {
      try {
        const updatedCars = [...routes_all];
        updatedCars[index] = {
          from: travelfrom,
          to: travelto,
          drivername: driverName,
          fare: fare,
          _id : routeId,
        };
        console.log("updatedCars ", updatedCars);
        // Send the updated array to the backend
        var data=await axios.post("http://localhost:3000/users/update_Route", {
            Routess: updatedCars,
        });

        

        if(data){
            alert("updated");
            setrand(Math.floor(Math.random() * (1000000 - 1 + 1)) + 1);
            settravelto("");
            settravelfrom("");
            setDriverName("");
            setFare("");
            setEditingIndex(null);
        }
      } catch (error) {
        console.error("Error updating vehicles:", error);
      }
    }
  };

  const handleSubmit = async () => {
    event.preventDefault();
    if (
      travelfrom !== "" &&
      travelto !== "" &&
      driverName !== "" &&
      fare != null
    ) {
      var object = {
        to: travelto,
        from: travelfrom,
        drivername: driverName,
        fare: fare,
      };
      try {
        var response = await axios.post(
          "http://localhost:3000/users/add_route",
          object
        );
        alert("added")
        
        setrand(Math.floor(Math.random() * (1000000 - 1 + 1)) + 1);
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
          "http://localhost:3000/users/all_routes"
        );
        console.log(response.data);
        set_all_routes(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getvehicle();
  }, );

  return (
    <div className="container mx-auto mt-8">
      <form className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Travel To
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={travelto}
            onChange={(e) => settravelto(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Travel from
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={travelfrom}
            onChange={(e) => settravelfrom(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Fare
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={fare}
            onChange={(e) => setFare(e.target.value)}
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

        {routes_all &&
          routes_all.map((car, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>FROM:</strong> {car.from}
              </p>
              <p>
                <strong>TO:</strong> {car.to}
              </p>
              <p>
                <strong>Driver Name:</strong> {car.drivername}
              </p>
              <p>
                <strong>Fare:</strong> {car.fare}
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
      {random}
    </div>

  );
};

export default Routes;
