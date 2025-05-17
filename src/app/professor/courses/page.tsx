"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface Resource {
  _id: string;
  type: "file" | "link";
  name?: string;
  url?: string;
  uploadedAt?: string;
}

export default function ProfessorCoursesPage() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<Resource[]>([]);
  const [link, setLink] = useState("");
  const [linkName, setLinkName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    fetchResources();
  }, [router]);

  async function fetchResources() {
    const res = await fetch("/api/professor/courses/resources", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setResources(data.resources);
    }
  }

  async function handleFileUpload(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/professor/courses/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "File upload failed");
      return;
    }
    setSuccess("File uploaded!");
    if (fileInputRef.current) fileInputRef.current.value = "";
    fetchResources();
  }

  async function handleLinkSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!link || !linkName) return;
    const res = await fetch("/api/professor/courses/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: link, name: linkName }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Link upload failed");
      return;
    }
    setSuccess("Link added!");
    setLink("");
    setLinkName("");
    fetchResources();
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Manage Courses / Upload Content</h2>
      <form onSubmit={handleFileUpload} style={{ marginBottom: 16 }}>
        <input type="file" ref={fileInputRef} required />
        <button type="submit">Upload File</button>
      </form>
      <form onSubmit={handleLinkSubmit} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Resource Name"
          value={linkName}
          onChange={e => setLinkName(e.target.value)}
          required
          style={{ marginRight: 8 }}
        />
        <input
          type="url"
          placeholder="Resource Link (https://...)"
          value={link}
          onChange={e => setLink(e.target.value)}
          required
          style={{ marginRight: 8 }}
        />
        <button type="submit">Add Link</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
      <h3>Uploaded Resources</h3>
      <ul>
        {resources.map(r => (
          <li key={r._id}>
            {r.type === "file" ? (
              <a href={r.url} target="_blank" rel="noopener noreferrer">{r.name || r.url}</a>
            ) : (
              <a href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 