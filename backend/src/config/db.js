const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medini_edutech';
  
  console.log(`Attempting to connect to MongoDB at: ${mongoUri}`);
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
    
    // Verify the connection by checking collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      codeName: error.codeName,
      reason: error.reason
    });
    
    // Try to get more detailed error if it's a MongoDB server selection error
    if (error.name === 'MongooseServerSelectionError') {
      console.error('Server Selection Error - Possible causes:');
      console.error('1. MongoDB service is not running');
      console.error('2. Incorrect connection string');
      console.error('3. Network issues or firewall blocking connection');
      console.error('4. Incorrect authentication credentials');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;
