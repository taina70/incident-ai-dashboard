import type { Analysis, NewLog } from "../types";

const API_INCIDENTS =
  import.meta.env.VITE_API_INCIDENTS || "http://localhost:3003/analyses";
const API_LOGS = import.meta.env.VITE_API_LOGS || "http://localhost:3000/logs";

export async function fetchAnalyses(page = 1, limit = 20): Promise<Analysis[]> {
  const res = await fetch(`${API_INCIDENTS}?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Falha ao buscar análises");
  const json = await res.json();
  return json.data || json;
}

export async function sendLog(log: NewLog): Promise<void> {
  const res = await fetch(API_LOGS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log),
  });
  if (!res.ok) throw new Error("Falha ao enviar log");
}
