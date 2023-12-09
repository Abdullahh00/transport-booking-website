const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};
 app.use(cors(corsOptions));

// Middlewares
app.use(bodyParser.json()); // for parsing application/json


// MongoDB Atlas Connection
const dbURI = 'mongodb+srv://i200933:pinkman4924@cluster0.5dpm91q.mongodb.net/'; // Replace with your actual MongoDB URI

// Connect to MongoDB using async/await
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
  }
};

// Call the async function to connect to MongoDB
connectToMongoDB();

// Basic Route
app.use('/users', userRoutes);


// Set the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
