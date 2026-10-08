# FitTrack

FitTrack is a full-stack MERN workout tracking application that allows users to create an account, log in, and manage their personal workouts.

## Description

FitTrack was created as my final MERN capstone project.

The application includes user authentication, protected routes, and full CRUD functionality for workouts.

Users can:

- Create workouts
- View all workouts
- View individual workout details
- Edit workouts
- Delete workouts
- Log in and log out securely

The application is also responsive so it remains usable on smaller screen sizes.

## Getting Started

### Dependencies

Before running FitTrack, you will need:

- Node.js
- npm
- Git
- MongoDB Atlas
- A modern web browser

### Installing

Clone the frontend repository:

```bash
git clone https://github.com/HakimM43/fittrack-frontend.git
```

Move into the frontend folder:

```bash
cd fittrack-frontend
```

Install frontend dependencies:

```bash
npm install
```

Clone the backend repository:

```bash
git clone https://github.com/HakimM43/fittrack-backend.git
```

Move into the backend folder:

```bash
cd fittrack-backend
```

Install backend dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file inside the backend folder.

Add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not upload your real `.env` file to GitHub.

### Executing Program

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Features

- User registration
- User login
- JWT authentication
- Protected routes
- Create workouts
- Read workouts
- Update workouts
- Delete workouts
- Responsive design
- Loading and error handling

## Technologies Used

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- bcryptjs
- CORS
- dotenv
- Morgan

## Full CRUD

FitTrack supports full CRUD functionality from the frontend.

- **Create:** Add a workout
- **Read:** View all workouts and individual workout details
- **Update:** Edit an existing workout
- **Delete:** Remove an existing workout

## Help

If the application does not start correctly:

- Make sure all dependencies were installed with `npm install`
- Make sure the backend `.env` file contains the required variables
- Make sure MongoDB Atlas is connected
- Make sure the backend is running on port 3000
- Make sure the frontend is running on port 5173

## Author

Hakim Mosley

## Version History

### 1.0

- Initial FitTrack release
- Added user authentication
- Added protected routes
- Added full workout CRUD
- Added MongoDB database integration
- Added responsive styling

## Future Improvements

Future versions of FitTrack could include:

- Progress charts
- Personal records
- Workout history
- Exercise search
- Saved workout templates
- User profile settings

## Acknowledgments

- Per Scholas
- Bryan Santos
- Paul Chapman
- MERN documentation