const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Routes
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');

// Load environment variables
dotenv.config();

// Create uploads and data directories if they don't exist
const uploadsDir = path.join(__dirname, 'uploads');
const dataDir = path.join(__dirname, 'data');

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory');
  }

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('Created data directory');
  }

  // Initialize files with empty arrays if they don't exist
  const USERS_FILE = path.join(dataDir, 'users.json');
  const EMPLOYEES_FILE = path.join(dataDir, 'employees.json');

  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
    console.log('Created users.json file');
  } else {
    // Verify the file contains valid JSON
    try {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      if (!data.trim()) {
        fs.writeFileSync(USERS_FILE, JSON.stringify([]));
        console.log('Reset empty users.json file');
      } else {
        JSON.parse(data); // Will throw if invalid JSON
      }
    } catch (parseErr) {
      console.error('Invalid users.json file, resetting:', parseErr);
      fs.writeFileSync(USERS_FILE, JSON.stringify([]));
    }
  }

  if (!fs.existsSync(EMPLOYEES_FILE)) {
    fs.writeFileSync(EMPLOYEES_FILE, JSON.stringify([]));
    console.log('Created employees.json file');
  } else {
    // Verify the file contains valid JSON
    try {
      const data = fs.readFileSync(EMPLOYEES_FILE, 'utf8');
      if (!data.trim()) {
        fs.writeFileSync(EMPLOYEES_FILE, JSON.stringify([]));
        console.log('Reset empty employees.json file');
      } else {
        JSON.parse(data); // Will throw if invalid JSON
      }
    } catch (parseErr) {
      console.error('Invalid employees.json file, resetting:', parseErr);
      fs.writeFileSync(EMPLOYEES_FILE, JSON.stringify([]));
    }
  }
} catch (err) {
  console.error('Error setting up directories or files:', err);
  process.exit(1);
}

// Initialize the app
const app = express();

// Setup CORS with specific options
const corsOptions = {
  origin: '*', // Allow all origins during development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Enable pre-flight requests for all routes
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add a request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // Log the authorization header (useful for debugging)
  if (req.headers.authorization) {
    console.log(`Authorization: ${req.headers.authorization.substring(0, 20)}...`);
  }
  
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Simple health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Using file-based storage in ${dataDir}`);
}); 