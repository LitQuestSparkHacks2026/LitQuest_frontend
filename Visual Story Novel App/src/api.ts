const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5001";

export async function fetchScene(sceneId: string) {
  const res = await fetch(`${API_BASE}/api/scenes/${sceneId}`);
  if (!res.ok) throw new Error(`Failed to load ${sceneId}`);
  return res.json();
}
