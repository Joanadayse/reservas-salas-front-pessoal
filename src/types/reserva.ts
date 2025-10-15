// types.ts
export interface ReservaAgenda {
  id: number;
  sala: string;
  titulo: string;
  dia: string;
  horario: "manha" | "tarde" | "diaInteiro";
  cor: string;
}

export interface ReservaPendente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  setor: string;
  gerencia: string;
  superintendencia: string;
  finalidade: string;
  participantes: string[];
}

