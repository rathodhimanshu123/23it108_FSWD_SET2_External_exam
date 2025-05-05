# Employee Management System

A full-stack MERN application for managing employees with features like authentication, CRUD operations, and file uploads.

## Features

- User Authentication (Login/Register)
- Employee Management (Create, Read, Update, Delete)
- Profile Picture Upload
- Search Functionality
- Responsive Design
- Role-based Access Control

## Tech Stack

- Frontend: React.js, Material-UI, Formik, Yup
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd employee-management-system
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/EmpDB_123
JWT_SECRET=your-secret-key
PORT=5000
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

5. Create a `uploads` directory in the backend folder:
```bash
cd ../backend
mkdir uploads
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Employees
- GET /api/employees - Get all employees
- GET /api/employees/search - Search employees
- GET /api/employees/:id - Get employee by ID
- POST /api/employees - Create new employee
- PUT /api/employees/:id - Update employee
- DELETE /api/employees/:id - Delete employee

## Default Admin Account

You can register a new account through the registration page. The first registered user will automatically be assigned the admin role.

## License

MIT 