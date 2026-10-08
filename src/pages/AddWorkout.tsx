import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddWorkout() {
  const navigate = useNavigate();

  const [workoutName, setWorkoutName] = useState("");
  const [exercise, setExercise] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          workoutName,
          exercise,
          muscleGroup,
          sets: Number(sets),
          reps: Number(reps),
          weight: Number(weight),
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not create workout");
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      setError("Could not connect to the server");
    }
  };

  return (
    <main className="dashboard-page add-workout-page">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <h1>FitTrack</h1>
          <div className="dashboard-title">
            <p className="dashboard-eyebrow">TRAINING LOG</p>
            <h2>Add Workout</h2>
          </div>
        </div>

        <Link className="workout-back" to="/dashboard">
          Back to Dashboard
        </Link>
      </header>

      <section
        className="dashboard-content add-workout-content"
        aria-label="Add a workout"
      >
        <div className="add-workout-card">
          <form className="add-workout-form" onSubmit={handleSubmit}>
            <div className="add-workout-field">
              <label htmlFor="workout-name">Workout Name</label>
              <input
                id="workout-name"
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                required
              />
            </div>

            <div className="add-workout-field">
              <label htmlFor="exercise">Exercise</label>
              <input
                id="exercise"
                type="text"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                required
              />
            </div>

            <div className="add-workout-field">
              <label htmlFor="muscle-group">Muscle Group</label>
              <input
                id="muscle-group"
                type="text"
                value={muscleGroup}
                onChange={(e) => setMuscleGroup(e.target.value)}
                required
              />
            </div>

            <div className="add-workout-numeric-grid">
              <div className="add-workout-field">
                <label htmlFor="sets">Sets</label>
                <input
                  id="sets"
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  required
                />
              </div>

              <div className="add-workout-field">
                <label htmlFor="reps">Reps</label>
                <input
                  id="reps"
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  required
                />
              </div>

              <div className="add-workout-field">
                <label htmlFor="weight">Weight</label>
                <input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="add-workout-field">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {error && <p className="dashboard-error">{error}</p>}

            <button
              className="dashboard-add-workout add-workout-submit"
              type="submit"
            >
              Add Workout
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddWorkout;