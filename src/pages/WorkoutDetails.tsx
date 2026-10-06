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
          `http://localhost:3000/api/workouts/${id}`,
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
        `http://localhost:3000/api/workouts/${id}`,
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
    return <p>{error}</p>;
  }

  if (!workout) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>FitTrack</h1>

      <h2>{workout.workoutName}</h2>

      <p>Exercise: {workout.exercise}</p>
      <p>Muscle Group: {workout.muscleGroup}</p>
      <p>Sets: {workout.sets}</p>
      <p>Reps: {workout.reps}</p>
      <p>Weight: {workout.weight}</p>
      <p>Notes: {workout.notes}</p>

      <Link to={`/workouts/${workout._id}/edit`}>
        Edit Workout
      </Link>

      <br />

      <button onClick={handleDelete}>
        Delete Workout
      </button>

      <br />

      <Link to="/dashboard">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default WorkoutDetails;