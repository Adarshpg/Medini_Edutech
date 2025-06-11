require('colors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: './src/config/config.env' });

// Connect to DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/medini_edutech', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

// Import into DB
const importData = async () => {
  try {
    // Create admin user
    await User.create({
      name: 'Admin User',
      email: 'admin@medini.com',
      password: 'password123',
      role: 'admin'
    });

    console.log('Admin user created successfully'.green.inverse);
    process.exit();
  } catch (err) {
    console.error('Error in importData:'.red.bold, err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('Data destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error('Error in deleteData:'.red.bold, err);
    process.exit(1);
  }
};

// Connect to the database first
connectDB().then(() => {
  if (process.argv[2] === '-i') {
    importData();
  } else if (process.argv[2] === '-d') {
    deleteData();
  } else {
    console.log('Please provide -i to import data or -d to delete data'.yellow);
    process.exit(1);
  }
}).catch(err => {
  console.error('Database connection error:'.red.bold, err);
  process.exit(1);
});
