import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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

function WorkoutDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkout = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `https://fittrack-backend-1-d2pb.onrender.com/api/workouts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Could not load workout");
          return;
        }

        setWorkout(data);
      } catch (error) {
        setError("Could not connect to the server");
      }
    };

    fetchWorkout();
  }, [id, navigate]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this workout?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `https://fittrack-backend-1-d2pb.onrender.com/api/workouts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not delete workout");
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      setError("Could not connect to the server");
    }
  };

  if (error) {
    return (
      <main className="dashboard-page workout-details-page">
        <p className="workout-state workout-state-error">{error}</p>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="dashboard-page workout-details-page">
        <p className="workout-state workout-loading">Loading...</p>
      </main>
    );
  }

  return (
    <main className="dashboard-page workout-details-page">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <h1>FitTrack</h1>
          <div className="dashboard-title">
            <p className="dashboard-eyebrow">WORKOUT DETAILS</p>
            <h2>{workout.workoutName}</h2>
          </div>
        </div>

        <Link className="workout-back" to="/dashboard">
          Back to Dashboard
        </Link>
      </header>

      <section
        className="dashboard-content workout-details-content"
        aria-label={`${workout.workoutName} details`}
      >
        <div className="workout-details-card">
          <dl className="workout-details-list">
            <div className="workout-detail">
              <dt>Exercise</dt>
              <dd>{workout.exercise}</dd>
            </div>
            <div className="workout-detail">
              <dt>Muscle Group</dt>
              <dd>{workout.muscleGroup}</dd>
            </div>
            <div className="workout-detail">
              <dt>Sets</dt>
              <dd>{workout.sets}</dd>
            </div>
            <div className="workout-detail">
              <dt>Reps</dt>
              <dd>{workout.reps}</dd>
            </div>
            <div className="workout-detail">
              <dt>Weight</dt>
              <dd>{workout.weight}</dd>
            </div>
            <div className="workout-detail workout-detail-notes">
              <dt>Notes</dt>
              <dd>{workout.notes}</dd>
            </div>
          </dl>

          <nav className="workout-detail-actions" aria-label="Workout actions">
            <Link
              className="dashboard-add-workout"
              to={`/workouts/${workout._id}/edit`}
            >
              Edit Workout
            </Link>
            <button className="workout-delete" onClick={handleDelete}>
              Delete Workout
            </button>
          </nav>
        </div>
      </section>
    </main>
  );
}

export default WorkoutDetails;