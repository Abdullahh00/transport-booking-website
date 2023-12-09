import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { setemail, set_loggedin, setname, email, loggedin, name,user_type } =
    useContext(AuthContext);
    const images = [
        'https://images.unsplash.com/photo-1617152683514-08cd8b3da14f?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1610478920410-277b366f9ffc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1529369623266-f5264b696110?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1472709171579-139831cdf19e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1684197884199-6d0a46e0f41c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        
      ];
  return (
    <div className="App">
      <section className="text-center p-20 bg-gray-200">
      <h2 className="mb-4">
          {user_type} Dashboard
        </h2>
        <h2 className="text-3xl font-bold mb-4">
          Rent the Best Transport Easily
        </h2>
        <p className="mb-8">
          Find cars, bikes, scooters, and more with just a few clicks.
        </p>
       
      </section>

      {/* Features Section */}
      <div className="grid grid-cols-5 gap-1 mt-24">
      {images.map((image, index) => (
        <div key={index} className="overflow-hidden">
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="w-72 h-52 object-cover"
          />
        </div>
      ))}
    </div>

      {/* Footer */}
      <footer className="bg-blue-500 text-white p-6 mt-5">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} RentalApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
