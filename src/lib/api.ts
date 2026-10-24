import Constants from 'expo-constants';
import type { Curriculo, Pessoa } from './types';

const API_URL: string =
  process.env.EXPO_PUBLIC_API_URL ??
  (Constants.expoConfig?.extra?.apiUrl as string | undefined) ??
  'http://localhost:3000';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`Falha ao buscar ${path} (${res.status})`);
  return res.json() as Promise<T>;
}

export const api = {
  pessoas: () => get<Pessoa[]>('/pessoas'),
  curriculo: (id: number) => get<Curriculo>(`/pessoas/${id}/curriculo`),
};
