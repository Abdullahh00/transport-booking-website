// driverModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const driverSchema = new Schema({

 

  name: {
    type: String,
    required: true,
  },

  age: {
    type: String,
    required: true,
  },
  
  
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
