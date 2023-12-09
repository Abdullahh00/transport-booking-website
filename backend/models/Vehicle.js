// vehicleModel.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  // Ensure that the field name is 'allocatedVehicle'

  drivername:{
    type: String,
    required: true,
  },

  allocatedVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
