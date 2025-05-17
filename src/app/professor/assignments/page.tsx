"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Assignment {
  _id: string;
  title: string;
  description: string;
}

export default function ProfessorAssignmentsPage() {
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" }).then(async (res) => {
      if (!res.ok) {
        router.replace("/login");
        return;
      }
      const data = await res.json();
      if (data.user?.role !== "professor") {
        router.replace("/login");
        return;
      }
      setLoading(false);
    });
    fetchAssignments();
  }, [router]);

  async function fetchAssignments() {
    const res = await fetch("/api/professor/assignments", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setAssignments(data.assignments);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("/api/professor/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to create assignment");
      return;
    }
    setSuccess("Assignment created!");
    setTitle("");
    setDescription("");
    fetchAssignments();
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Create Assignments</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
        <button type="submit">Create Assignment</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}
      </form>
      <h3>Assignments</h3>
      <ul>
        {assignments.map(a => (
          <li key={a._id}><b>{a.title}</b>: {a.description}</li>
        ))}
      </ul>
    </div>
  );
} 