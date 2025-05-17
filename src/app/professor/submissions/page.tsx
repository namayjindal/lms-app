"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfessorSubmissionsPage() {
  const [loading, setLoading] = useState(true);
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
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>View Student Submissions</h2>
      <p>Here professors can view student submissions. (To be implemented)</p>
    </div>
  );
} 