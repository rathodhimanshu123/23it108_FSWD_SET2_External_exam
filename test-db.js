const { User, Employee } = require('./utils/fileDb');
const fs = require('fs');
const path = require('path');

// Test file paths
const dataDir = path.join(__dirname, 'data');
const USERS_FILE = path.join(dataDir, 'users.json');
const EMPLOYEES_FILE = path.join(dataDir, 'employees.json');

async function runTests() {
    console.log('Starting file DB tests...');
    
    // Test 1: Check if data directory exists
    console.log('\nTest 1: Checking data directory');
    if (fs.existsSync(dataDir)) {
        console.log('✅ Data directory exists:', dataDir);
    } else {
        console.log('❌ Data directory does not exist!');
        fs.mkdirSync(dataDir, { recursive: true });
        console.log('Created data directory:', dataDir);
    }
    
    // Test 2: Check if files exist
    console.log('\nTest 2: Checking data files');
    if (fs.existsSync(USERS_FILE)) {
        console.log('✅ Users file exists:', USERS_FILE);
    } else {
        console.log('❌ Users file does not exist!');
        fs.writeFileSync(USERS_FILE, JSON.stringify([]));
        console.log('Created users file with empty array');
    }
    
    if (fs.existsSync(EMPLOYEES_FILE)) {
        console.log('✅ Employees file exists:', EMPLOYEES_FILE);
    } else {
        console.log('❌ Employees file does not exist!');
        fs.writeFileSync(EMPLOYEES_FILE, JSON.stringify([]));
        console.log('Created employees file with empty array');
    }
    
    // Test 3: Check file contents
    console.log('\nTest 3: Checking file contents');
    try {
        const usersContent = fs.readFileSync(USERS_FILE, 'utf8');
        console.log('Users file content:', usersContent);
        
        try {
            const users = JSON.parse(usersContent);
            console.log('✅ Users file contains valid JSON');
            console.log(`Number of users: ${users.length}`);
        } catch (err) {
            console.log('❌ Users file contains invalid JSON');
            fs.writeFileSync(USERS_FILE, JSON.stringify([]));
            console.log('Reset users file with empty array');
        }
    } catch (err) {
        console.log('❌ Error reading users file:', err.message);
    }
    
    // Test 4: Test user creation
    console.log('\nTest 4: Testing user creation');
    try {
        const testUser = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        };
        
        const createdUser = await User.create(testUser);
        console.log('✅ User created successfully:', createdUser);
        
        // Test finding the user
        const foundUser = await User.findOne({ email: 'test@example.com' });
        
        if (foundUser) {
            console.log('✅ Found user by email:', foundUser);
        } else {
            console.log('❌ Could not find user by email');
        }
    } catch (err) {
        console.log('❌ Error in user creation test:', err.message);
    }
    
    console.log('\nTests completed.');
}

// Run the tests
runTests(); 