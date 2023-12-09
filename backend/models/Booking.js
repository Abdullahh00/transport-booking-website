const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId,default:''},
  date: { type: Date, required: true },
  status: { type: String, required: true, default: 'pending' }, // Default empty string
  route_id: { type: Schema.Types.ObjectId, required: true },
  payment_status: { type: String, required: true, default: 'pending' }, // Default empty string
});

//sdsd
const Booking = mongoose.model('Bookings', bookingSchema);

module.exports = Booking;
