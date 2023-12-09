const User = require('../models/User');
const Driver = require("../models/driver");
const Vehicle = require("../models/Vehicle")
// Function to add a new user
async function addUser(userData) {
    try {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
}

async function getUser(userData) {

    try {
        var email = userData.email;
        var password = userData.password;
        const user = await User.findOne({ email, password });

        if (user) {
            return user;
        } else {
            throw new Error('User not found'); 
        }
    } catch (error) {
        throw error;
    }
}


async function add_vehicle(userData) {


    const newVehicle = new Vehicle({
        name: userData.carName,
        model: userData.carModel,
        drivername: userData.driverName
    });
    newVehicle.save()
        .then((savedVehicle) => {
            
            const newDriver = new Driver({
                name: userData.driverName,
                allocatedVehicle: savedVehicle._id,
            });
            return newDriver.save();
        })
        .then(() => {
            console.log('Vehicle and driver saved successfully!');
        })
        .catch((error) => {
            console.error('Error saving vehicle and driver:', error);
        })
}

async function update_vehicle(userData) {
    console.log(Object.keys(userData.vehicles).length);

    try {
        for (var i = 0; i < Object.keys(userData.vehicles).length; i++) {
            const vehicleData = userData.vehicles[i];
            const filter = { name: vehicleData.name };

            const update = {
                model: vehicleData.model,
                drivername: vehicleData.drivername
            };

            const updatedVehicle = await Vehicle.findOneAndUpdate(filter, update, { new: true });

            if (updatedVehicle) {
                console.log("Vehicle updated:", updatedVehicle);
            } else {
                
                console.log("Vehicle not found for updating. It might be a new vehicle.");
                
            }
        }
    } catch (error) {
        console.error('Error updating vehicles:', error);
    }
}



module.exports = {
    addUser,
    getUser,
    add_vehicle,
    update_vehicle
};
