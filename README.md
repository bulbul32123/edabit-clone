# Edabit Clone

A fullstack JavaScript coding challenge platform similar to Edabit. This application allows users to solve coding problems in JavaScript, React, Node.js, Next.js, and MongoDB.

## Features

- User authentication and profiles
- Browse coding challenges by category and difficulty
- Interactive code editor with real-time execution
- Submit solutions and get instant feedback
- Track your progress with a dashboard
- Admin panel for managing problems

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens for authentication
- VM2 for secure code execution

### Frontend
- React.js
- React Router for navigation
- Redux Toolkit for state management
- React Monaco Editor for code editing
- React Toastify for notifications
- React Icons for UI icons

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd edabit-clone
```

2. Install backend dependencies
```
cd backend
npm install
```

3. Set up environment variables
Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/edabit-clone
JWT_SECRET=your_secret_key
NODE_ENV=development
```

4. Install frontend dependencies
```
cd ../frontend
npm install
```

### Running the Application

You have several options for starting the application:

#### Option 1: Start both servers with a single script
```
./start.sh
```

#### Option 2: Start servers separately (recommended if there are terminal issues)
In one terminal:
```
./start-backend.sh
```

In another terminal:
```
./start-frontend.sh
```

#### Option 3: Start servers manually
Backend:
```
cd backend
npm run dev
```

Frontend:
```
cd frontend
npm run dev
```

Then open your browser and navigate to `http://localhost:5173`

### Seeding the Database

To populate the database with initial problems and create an admin user:

```
cd backend
npm run seed
```

This will create:
- An admin user with email: admin@example.com and password: password123
- Several initial coding problems across different categories

You can log in with the admin credentials to add more problems through the admin interface.

## API Endpoints

### Auth
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get a specific problem
- `POST /api/problems` - Create a new problem (admin only)
- `PUT /api/problems/:id` - Update a problem (admin only)
- `DELETE /api/problems/:id` - Delete a problem (admin only)

### Submissions
- `POST /api/submissions` - Submit a solution
- `GET /api/submissions` - Get user submissions
- `GET /api/submissions/:id` - Get a specific submission

## License

This project is licensed under the MIT License. 