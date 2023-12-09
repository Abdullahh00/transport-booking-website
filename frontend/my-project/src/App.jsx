// Import necessary components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { useContext } from "react";

import AuthContext from "./Context/AuthContext";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Vehicle from "./Components/Admin/Vehicle";
import Rout from "./Components/Admin/Route";
import Past_records from "./Components/Customer/Past_records"
import BookVehicle from"./Components/Customer/BookVehicle"
import Bookings_admin from "./Components/Admin/Booking";
import ManageDrivers from "./Components/Admin/Driver";
const Main = () => {
  const storedData = localStorage.getItem("myData");
  // console.log("stored ", JSON.parse(storedData));

  const {
    setemail,
    set_loggedin,
    setname,
    set_usertype,
    email,
    loggedin,
    name,
    user_type,
    set_id,
    _id,
    set_account_balance,
    account_balance
  } = useContext(AuthContext);

  if (storedData) {
    var data = JSON.parse(storedData);
    console.log(data.data);
    set_loggedin(true);
    set_id(data.data._id);
    set_usertype(data.data.userType);
    setemail(data.data.email);
    setname(data.data.name);
    set_account_balance(data.data.accountbalance)


  }

  return (
    <Router>
      {loggedin && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicle" element={<Vehicle />} />
            <Route path="/routes" element={<Rout />} />
            <Route path="/cust_book_vehicle" element={<BookVehicle />} />
            <Route path="/Past_records" element={<Past_records />} />
            <Route path='bookings' element ={<Bookings_admin/>}/>
            <Route path='/drivers' element ={<ManageDrivers/>}/>
          </Routes>
        </>
      )}

      {!loggedin && (
        <Routes>
          <Route path="/" element={<Signup />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
};

export default Main;
