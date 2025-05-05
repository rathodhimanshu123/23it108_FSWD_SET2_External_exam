const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('MongoDB Connection Checker');
console.log('-------------------------');

// Get MongoDB URI from environment variables or use default
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/EmpDB_123';
console.log(`Attempting to connect to: ${mongoURI.replace(/:\/\/([^:]+):[^@]+@/, '://***:***@')}`);

// Try to connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
.then(() => {
    console.log('✅ SUCCESS: Connected to MongoDB successfully!');
    // Close the connection after successful test
    mongoose.connection.close();
    console.log('Connection closed.');
})
.catch(err => {
    console.error('❌ ERROR: Failed to connect to MongoDB');
    console.error(`Error details: ${err.message}`);
    
    if (err.message.includes('ECONNREFUSED')) {
        console.log('\nTROUBLESHOOTING TIPS:');
        console.log('1. Make sure MongoDB is installed on your system');
        console.log('2. Check if MongoDB service is running');
        console.log('   - On Windows: Open Services app and look for MongoDB service');
        console.log('   - On Linux/Mac: Run "sudo systemctl status mongodb" or "brew services list"');
        console.log('3. Try using MongoDB Atlas instead (cloud-hosted option)');
        console.log('   - Uncomment the MongoDB Atlas connection string in your .env file');
    }
}); 