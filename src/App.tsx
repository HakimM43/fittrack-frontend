import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import AddWorkout from "./pages/AddWorkout";
import WorkoutDetails from "./pages/WorkoutDetails";
import EditWorkout from "./pages/EditWorkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workouts/new" element={<AddWorkout />} />
        <Route path="/workouts/:id" element={<WorkoutDetails />} />
        <Route path="/workouts/:id/edit" element={<EditWorkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;