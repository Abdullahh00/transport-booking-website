const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const Vehicle = require("../models/Vehicle")
const Driver = require("../models/driver");
const Route = require('../models/Routes');
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Define a route to add a new user
router.post('/add', async (req, res) => {
  try {
    const newUser = await userService.addUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/add_booking', async (req, res) => {
  try {
    // const jwtCookie = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt='));
    // const jwtToken = jwtCookie.split('=')[1]; 
    // const secretKey = 'your-secret-key'; 
    // const decodedToken = jwt.verify(jwtToken, secretKey);
    // const userId = decodedToken.userId;

    const newBookingData = {
      ...req.body, 
      //customer_id: userId  // Add the user ID as customer_id
    }; 

    const newBooking = new Booking(newBookingData); 
    await newBooking.save(); 
    res.json(newBooking); 
  } catch (error) {
    res.status(400).json({ error: error.message, details: error });
  }
});



router.post('/get_user', async (req, res) => {
  try {
    const newUser = await userService.getUser(req.body);
    console.log("newUser ", newUser)

    const payload = { userId: newUser._id, username: newUser.name }; // Customize the payload
    const secretKey = 'your-secret-key'; // Replace with your secret key
    const token = jwt.sign(payload, secretKey);

    // Set JWT as an HttpOnly cookie
    const expirationDate = new Date(Date.now() + 3600000); // One hour from now

    res.cookie('jwt', token, {
      httpOnly: true,
      expires: expirationDate,
    });
    

    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/add_vehicle', async (req, res) => {
  try {
    const newUser = await userService.add_vehicle(req.body);

    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/update_vehicle', async (req, res) => {
  try {
    const newUser = await userService.update_vehicle(req.body);

    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.post('/add_route', async (req, res) => {
  try {
    
    const newRoute = new Route(req.body);

   
    await newRoute.save();
    res.json(newRoute);
    //res.status(201).json({ message: 'Route added successfully', data: newRoute });
     
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
});



router.get('/all_routes', async (req, res) => {
  try {
    // Find all documents in the Routes collection
    const routes = await Route.find();

    res.status(200).json( routes );
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
});

router.post("/update_Route", async (req, res) => {
  try {
      for (var i = 0; i < req.body.Routess.length; i++) {
          const routeUpdateData = {
              to: req.body.Routess[i].to,
              from: req.body.Routess[i].from,
              drivername: req.body.Routess[i].drivername,
              fare: req.body.Routess[i].fare
          };

          await Route.findByIdAndUpdate(req.body.Routess[i]._id, routeUpdateData, { new: true });
      }

      res.send("Routes updated successfully");
  } catch (error) {
      console.error('Error updating routes:', error);
      res.status(500).send(error.message);
  }
});


router.get('/all_vehicles', async (req, res) => {
  try {
    const vehiclesWithDrivers = await Vehicle.find().populate({
      path: 'allocatedVehicle',
      model: 'Driver',
      select: 'name',
    });

    // Ensure allocatedVehicle exists and has a name before accessing it
    const result = vehiclesWithDrivers.map(vehicle => ({
      name: vehicle.name,
      model: vehicle.model,
      drivername: vehicle.drivername 
    }));

    res.json(result);
    // res.json(vehiclesWithDrivers);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/userbookings/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ customer_id: userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.get('/userbookings', async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});


// Get details for a specific route
router.get('/routesforbookings/:routeId', async (req, res) => {
  try {
    const routeId = req.params.routeId;
    const route = await Route.findById(routeId);
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.put('/editbooking/:bookingId', async (req, res) => {
  const { bookingId } = req.params;
  const updatedData = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updatedData, { new: true });
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error updating booking", error });
  }
});

router.delete('/deletebooking/:bookingId', async (req, res) => {
  const { bookingId } = req.params;

  try {
    await Booking.findByIdAndDelete(bookingId);
    res.json({ message: "Booking successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
});


router.get('/all_drivers', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/drivers', async (req, res) => {
  try {
    const newDriver = new Driver({
      name: req.body.name,
      age: req.body.age,
    });

    const savedDriver = await newDriver.save();
    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/drivers/:id', async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // This option returns the updated document
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/drivers/:id', async (req, res) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id);

    if (!deletedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




module.exports = router;
