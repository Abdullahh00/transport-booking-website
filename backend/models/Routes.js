// vehicleModel.js
const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    // Ensure that the field name is 'allocatedVehicle'

    fare: {
        type: String,
        required: true,
    },
    drivername: {
        type: String,
        required: true,
    }
});

const Route = mongoose.model('Routes', routeSchema);

module.exports = Route;
