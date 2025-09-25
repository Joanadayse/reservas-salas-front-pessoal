const API_URL = 'http://127.0.0.1:8000/api';

export async function getReservas() {
  const res = await fetch(`${API_URL}/reservas/`);
  return res.json();
}