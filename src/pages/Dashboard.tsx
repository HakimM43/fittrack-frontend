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
        const response = await fetch("https://fittrack-backend-1-d2pb.onrender.com/api/workouts", {
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
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <h1>FitTrack</h1>
          <div className="dashboard-title">
            <p className="dashboard-eyebrow">TRAINING LOG</p>
            <h2>Dashboard</h2>
          </div>
        </div>

        <nav className="dashboard-actions" aria-label="Dashboard actions">
          <Link className="dashboard-add-workout" to="/workouts/new">
            Add Workout
          </Link>
          <button className="dashboard-logout" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <section className="dashboard-content" aria-label="Your workouts">
        {error && <p className="dashboard-error">{error}</p>}

        {workouts.length === 0 ? (
          <div className="dashboard-empty-state">
            <p className="dashboard-empty">No workouts yet.</p>
          </div>
        ) : (
          <div className="workout-grid">
            {workouts.map((workout) => (
              <article className="workout-card" key={workout._id}>
                <h3>{workout.workoutName}</h3>
                <p className="workout-exercise">{workout.exercise}</p>
                <p className="workout-summary">
                  {workout.sets} sets x {workout.reps} reps
                </p>
                <Link
                  className="workout-view"
                  to={`/workouts/${workout._id}`}
                >
                  View
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;