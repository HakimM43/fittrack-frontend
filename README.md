# FitTrack

FitTrack is a full-stack MERN workout tracking application that allows users to create an account, log in, and manage their personal workouts.

The main goal of FitTrack is to give users a simple way to keep track of exercises, muscle groups, sets, reps, weight, and workout notes.

## Features

- User registration
- User login
- JWT authentication
- Protected workout routes
- Create workouts
- View all workouts
- View individual workout details
- Edit workouts
- Delete workouts
- Responsive design for desktop and mobile
- Error and loading states
- Confirmation before deleting a workout

## Full CRUD

FitTrack supports full CRUD functionality from the React frontend.

- **Create:** Add a new workout
- **Read:** View workouts on the dashboard and open workout details
- **Update:** Edit an existing workout
- **Delete:** Delete a workout after confirming the action

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

## Authentication

FitTrack uses JWT authentication.

After a successful login, the frontend stores the token in localStorage. Protected workout requests send the token to the backend using an Authorization Bearer header.

Users without a valid token are redirected to the login page.

## Installation

### 1. Clone the Frontend Repository

```bash
git clone https://github.com/HakimM43/fittrack-frontend.git