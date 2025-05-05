// Test script for employee operations
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// File paths
const dataDir = path.join(__dirname, 'data');
const EMPLOYEES_FILE = path.join(dataDir, 'employees.json');

// Make sure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('Created data directory');
}

// Initialize employees file if it doesn't exist
if (!fs.existsSync(EMPLOYEES_FILE)) {
  fs.writeFileSync(EMPLOYEES_FILE, JSON.stringify([]));
  console.log('Created employees.json file');
}

// Function to load employees
const loadEmployees = () => {
  try {
    const data = fs.readFileSync(EMPLOYEES_FILE, 'utf8');
    if (!data.trim()) {
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading employees data:', err);
    return [];
  }
};

// Function to save employees
const saveEmployees = (employees) => {
  try {
    fs.writeFileSync(EMPLOYEES_FILE, JSON.stringify(employees, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving employees data:', err);
    return false;
  }
};

// Create a test employee
const createTestEmployee = () => {
  const employees = loadEmployees();
  
  const newEmployee = {
    _id: uuidv4(),
    id: uuidv4(),
    firstName: 'Test',
    lastName: 'Employee',
    email: 'test@example.com',
    phone: '123-456-7890',
    department: 'Engineering',
    position: 'Developer',
    employeeType: 'Full-time',
    joiningDate: new Date().toISOString().split('T')[0],
    salary: '50000',
    status: 'Active',
    address: {
      street: '123 Main St',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345',
      country: 'Test Country'
    },
    createdAt: new Date().toISOString()
  };
  
  employees.push(newEmployee);
  
  if (saveEmployees(employees)) {
    console.log('Test employee created successfully with ID:', newEmployee._id);
    return newEmployee;
  } else {
    console.error('Failed to create test employee');
    return null;
  }
};

// Get all employees
const getAllEmployees = () => {
  const employees = loadEmployees();
  console.log(`Found ${employees.length} employees`);
  console.log(employees);
  return employees;
};

// Delete all employees
const deleteAllEmployees = () => {
  if (saveEmployees([])) {
    console.log('All employees deleted successfully');
    return true;
  } else {
    console.error('Failed to delete all employees');
    return false;
  }
};

// Run tests
console.log('=========================================');
console.log('EMPLOYEE MANAGEMENT SYSTEM - TEST SCRIPT');
console.log('=========================================');

console.log('\n1. Getting all employees:');
getAllEmployees();

console.log('\n2. Creating a test employee:');
const createdEmployee = createTestEmployee();

console.log('\n3. Getting all employees after creation:');
getAllEmployees();

// Uncomment to delete all employees
// console.log('\n4. Deleting all employees:');
// deleteAllEmployees();
// console.log('\n5. Getting all employees after deletion:');
// getAllEmployees();

console.log('\nTest completed successfully!'); 