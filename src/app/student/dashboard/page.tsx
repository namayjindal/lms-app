"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" }).then(async (res) => {
      if (!res.ok) {
        router.replace("/login");
        return;
      }
      const data = await res.json();
      if (data.user?.role !== "student") {
        router.replace("/login");
        return;
      }
      setUser(data.user);
      setLoading(false);
    });
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.replace("/login");
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Student Dashboard</h2>
      <p>Welcome, {user?.name}!</p>
      <ul>
        <li><a href="/assignments">Assignments</a></li>
        <li><a href="/courses">Courses</a></li>
        <li><a href="/grades">Grades</a></li>
        <li><a href="/discussions">Discussions</a></li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
} 