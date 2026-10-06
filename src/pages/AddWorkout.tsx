import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>FitTrack</h1>
      <h2>Add Workout</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Workout Name</label>
          <br />
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Exercise</label>
          <br />
          <input
            type="text"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Muscle Group</label>
          <br />
          <input
            type="text"
            value={muscleGroup}
            onChange={(e) => setMuscleGroup(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Sets</label>
          <br />
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Reps</label>
          <br />
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Weight</label>
          <br />
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Notes</label>
          <br />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
}

export default AddWorkout;