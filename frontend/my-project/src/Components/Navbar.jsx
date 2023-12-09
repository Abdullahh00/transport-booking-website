import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Link,useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const {
    setemail,
    set_loggedin,
    setname,
    email,
    loggedin,
    name,
    set_usertype,
    user_type,
  } = useContext(AuthContext);
  const logout_func = () => {
    set_loggedin(false);
    setemail(null);
    setname(null);
    navigate("/");
    localStorage.clear();
  };
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Home
        </Link>
        <div>
          
          {user_type === "customer" ? (
            <>
              {" "}
              <Link to="/cust_book_vehicle" className="text-white mr-4">
                Book Vehicle
              </Link>
              {/* <Link to="/B_S" className="text-white mr-4">
                Booking Status
              </Link> */}
              <Link to="/Past_records" className="text-white mr-4">
                Past records
              </Link>
            </>
          ) : (
            <>
            {" "}
            <Link to="/vehicle" className="text-white mr-4">
              Vehicles
            </Link>
            <Link to="/routes" className="text-white mr-4">
              routes
            </Link>
            <Link to="/bookings" className="text-white mr-4">
              bookings
            </Link>
            <Link to="/drivers" className="text-white mr-4">
              drivers
            </Link>
          </>
          )}

          <button className="text-white" onClick={(e) => logout_func()}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
