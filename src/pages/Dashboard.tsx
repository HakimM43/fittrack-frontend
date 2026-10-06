import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Workout = {
  _id: string;
  workoutName: string;
  exercise: string;
  muscleGroup: string;
  sets: number;
  reps: number;
  weight: number;
  notes: string;
};

function Dashboard() {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/workouts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Could not load workouts");
          return;
        }

        setWorkouts(data);
      } catch (error) {
        setError("Could not connect to the server");
      }
    };

    fetchWorkouts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h1>FitTrack</h1>
      <h2>Dashboard</h2>

      <Link to="/workouts/new">Add Workout</Link>

      <button onClick={handleLogout}>Logout</button>

      {error && <p>{error}</p>}

      {workouts.length === 0 ? (
        <p>No workouts yet.</p>
      ) : (
        workouts.map((workout) => (
          <div key={workout._id}>
            <h3>{workout.workoutName}</h3>
            <p>{workout.exercise}</p>
            <p>
              {workout.sets} sets x {workout.reps} reps
            </p>

            <Link to={`/workouts/${workout._id}`}>View</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;