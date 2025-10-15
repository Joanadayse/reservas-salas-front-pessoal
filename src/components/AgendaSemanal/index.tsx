"use client";

import { addWeeks, format, startOfWeek, subWeeks } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "../Icon";
import { AdicionarReservaModal } from "../../pages/AdicionarReserva/page";
import { ReservaPendenteModal } from "../../pages/ReservasPendentesModal/page";
import type { ReservaAgenda, ReservaPendente } from "../../types/reserva";

interface Reserva {
  id: number;
  sala: string;
  titulo: string;
  dia: string;
  horario: "manha" | "tarde" | "diaInteiro";
  cor: string;
}

const salas = [
  "Auditório EQT Lab",
  "Duília de Mello",
  "Santos Dumont",
  "Alan Turing",
  "Thomas Edison",
];

const dias = ["SEG", "TER", "QUA", "QUI", "SEX"];

const reservasMock: Reserva[] = [
  { id: 1, sala: "Auditório EQT Lab", titulo: "Workshop - Tech", dia: "SEX", horario: "manha", cor: "bg-blue-200" },
  { id: 2, sala: "Duília de Mello", titulo: "Vai dar Case", dia: "SEG", horario: "tarde", cor: "bg-purple-200" },
  { id: 3, sala: "Thomas Edison", titulo: "Capacitech", dia: "SEX", horario: "diaInteiro", cor: "bg-yellow-200" },
  { id: 4, sala: "Auditório EQT Lab", titulo: "Workshop Soluções", dia: "SEG", horario: "tarde", cor: "bg-blue-200" },
  { id: 5, sala: "Duília de Mello", titulo: "RR - Contabilidade", dia: "SEG", horario: "manha", cor: "bg-purple-200" },
  { id: 6, sala: "Santos Dumont", titulo: "Reunião - RH", dia: "TER", horario: "manha", cor: "bg-purple-200" },
  { id: 7, sala: "Duília de Mello", titulo: "RR - Tributos", dia: "QUA", horario: "manha", cor: "bg-purple-200" },
  { id: 8, sala: "Duília de Mello", titulo: "Workshop - Marketing", dia: "QUA", horario: "tarde", cor: "bg-purple-200" },
  { id: 9, sala: "Santos Dumont", titulo: "Reunião - mkt", dia: "QUI", horario: "manha", cor: "bg-purple-200" },
  { id: 10, sala: "Santos Dumont", titulo: "Equipe One", dia: "QUI", horario: "tarde", cor: "bg-purple-200" },
  { id: 11, sala: "Alan Turing", titulo: "Tech Siz", dia: "SEG", horario: "manha", cor: "bg-purple-200" },
  { id: 12, sala: "Thomas Edison", titulo: "IA em Ação", dia: "SEG", horario: "tarde", cor: "bg-yellow-200" },
  { id: 13, sala: "Duília de Mello", titulo: "PENDENTE- Aguardando Confirmação", dia: "TER", horario: "tarde", cor: "bg-red-400 text-white" },
];

export default function AgendaSemanal() {
  const [reservas, setReservas] = useState<ReservaAgenda[]>(reservasMock);
  const [reservaSelecionada, setReservaSelecionada] = useState<ReservaPendente | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<{ sala: string; dia: string; horario: "manha" | "tarde" | "diaInteiro" } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPendenteOpen, setIsModalPendenteOpen] = useState(false);

  const nomeBloco = {
    manha: "08:00 - 12:00",
    tarde: "13:00 - 18:00",
    diaInteiro: "08:00 - 18:00",
  };

const handleClickReserva = (
  reserva: Reserva | undefined,
  sala: string,
  dia: string,
  bloco: "manha" | "tarde" | "diaInteiro"
) => {
  // ✅ só entra aqui se existir reserva
  if (reserva && reserva.titulo?.includes("PENDENTE")) {
    // cria um mock completo de ReservaPendente com os campos esperados
    const reservaParaModal: ReservaPendente = {
      id: reserva.id,
      nome: "Joana Dayse",
      telefone: "(99) 99999-9999",
      email: "joana@example.com",
      setor: "TI",
      gerencia: "Gerência de Projetos",
      superintendencia: "Superintendência de Tecnologia",
      finalidade: reserva.titulo,
      participantes: ["Equipe em Geral", "Gerente"],
    };

    setReservaSelecionada(reservaParaModal);
    setIsModalPendenteOpen(true);
    return;
  }

  // Se clicou num slot vazio ou reserva normal, segue a lógica padrão
  if (!reserva) {
    setSelectedSlot({ sala, dia, horario: bloco });
    setIsModalOpen(true);
    return;
  }

  // Validações de conflitos
  const reservaExistente = reservas.find(
    r => r.sala === sala && r.dia === dia && r.horario === bloco
  );
  const reservaDiaInteiro = reservas.find(
    r => r.sala === sala && r.dia === dia && r.horario === "diaInteiro"
  );
  const reservaManha = reservas.find(
    r => r.sala === sala && r.dia === dia && r.horario === "manha"
  );
  const reservaTarde = reservas.find(
    r => r.sala === sala && r.dia === dia && r.horario === "tarde"
  );

  if (reservaExistente) {
    alert(`Horário já reservado: ${reservaExistente.titulo}`);
    return;
  }

  if (bloco !== "diaInteiro" && reservaDiaInteiro) {
    alert(`O dia inteiro já está reservado para: ${reservaDiaInteiro.titulo}`);
    return;
  }

  if (bloco === "diaInteiro" && (reservaManha || reservaTarde)) {
    alert(
      `Não é possível reservar o dia inteiro, pois já existe uma reserva em ${
        reservaManha ? "manhã" : "tarde"
      }.`
    );
    return;
  }

  setSelectedSlot({ sala, dia, horario: bloco });
  setIsModalOpen(true);
};


  // Funções para fechar o modal e adicionar a reserva
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddReserva = (novaReserva: Omit<Reserva, "id" | "sala" | "dia" | "horario"> & { cor?: string }) => {
    if (!selectedSlot) return;

    const nova: Reserva = {
      id: reservas.length + 1,
      sala: selectedSlot.sala,
      dia: selectedSlot.dia,
      horario: selectedSlot.horario,
      ...novaReserva,
      cor: novaReserva.cor || "",
      titulo: novaReserva.titulo,
    };

    setReservas([...reservas, nova]);
    setIsModalOpen(false);
    setSelectedSlot(null);
  };
  

  const handleAprovarReserva = (id: number) => {
    setReservas(prev =>
      prev.map(r =>
        r.id === id ? { ...r, titulo: r.titulo.replace("PENDENTE- ", ""), cor: "bg-green-400 text-white" } : r
      )
    );
    setIsModalPendenteOpen(false);
    setReservaSelecionada(null);
  };

  const handleRecusarReserva = (id: number) => {
    setReservas(prev => prev.filter(r => r.id !== id));
    setIsModalPendenteOpen(false);
    setReservaSelecionada(null);
  };

  // Navegação de semanas
  const goToPreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const goToNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

  // Dias da semana
  const getDaysOfWeek = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    return Array.from({ length: 5 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      return day;
    });
  };

  const displayedDays = getDaysOfWeek();

  const formattedWeekRange = () => {
    const start = displayedDays[0];
    const end = displayedDays[displayedDays.length - 1];
    return `${format(start, "dd", { locale: ptBR })} - ${format(end, "dd 'de' MMMM, yyyy", { locale: ptBR })}`;
  };

  return (
    <>
      <div className="overflow-x-auto shadow-xl w-full mx-auto">
        <div className="rounded-lg bg-white p-2">
          <div className="mb-8 flex justify-between items-center p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Agenda Semanal</h1>
            <div className="flex items-center space-x-4">
              <img src="logo-cor-original.png" alt="Logo" className="h-10 w-40" />
              <button onClick={goToPreviousWeek} className="p-2 text-gray-600 hover:text-gray-800">
                <ChevronLeft />
              </button>
              <p className="text-gray-600 text-base font-medium">{formattedWeekRange()}</p>
              <button onClick={goToNextWeek} className="p-2 text-gray-600 hover:text-gray-800">
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* Cabeçalho */}
          <div className="grid grid-cols-6 border-[#E2E8F0] min-w-[700px]">
            <div className="py-6 px-2 text-center font-semibold bg-[#FAFBFF]">Salas</div>
            {dias.map(dia => (
              <div key={dia} className="py-6 px-2 text-center font-semibold border-[#E2E8F0] bg-[#FAFBFF]">
                {dia}
              </div>
            ))}
          </div>

          {/* Linhas por sala */}
          {salas.map(sala => (
            <div key={sala} className="grid grid-cols-6 border-b border-[#E2E8F0] bg-white min-w-[700px]">
              <div className="py-6 px-2 font-medium border-r border-[#E2E8F0]">{sala}</div>

              {dias.map(dia => {
                const reservaDiaInteiro = reservas.find(r => r.sala === sala && r.dia === dia && r.horario === "diaInteiro");
                const reservaManha = reservas.find(r => r.sala === sala && r.dia === dia && r.horario === "manha");
                const reservaTarde = reservas.find(r => r.sala === sala && r.dia === dia && r.horario === "tarde");

                return (
                  <div key={dia} className="flex flex-col justify-center gap-1 h-24 border-r last:border-r-0 border-[#E2E8F0]">
                    {reservaDiaInteiro ? (
                      <div
                        className={`flex-1 flex items-center justify-center rounded px-2 py-1 cursor-pointer transition ${reservaDiaInteiro.cor} text-black`}
                        onClick={() => handleClickReserva(reservaDiaInteiro, sala, dia, "diaInteiro")}
                      >
                        <div className="text-center">
                          <p className="font-medium text-sm">{reservaDiaInteiro.titulo}</p>
                          <p className="text-xs">{nomeBloco["diaInteiro"]}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col flex-1 gap-1">
                        <div
                          className={`flex-1 flex items-center justify-center rounded px-2 py-1 cursor-pointer transition ${
                            reservaManha ? `${reservaManha.cor} text-black` : "bg-white text-gray-400 hover:bg-gray-100"
                          }`}
                          onClick={() => handleClickReserva(reservaManha, sala, dia, "manha")}
                        >
                          {reservaManha ? (
                            <div className="text-center">
                              <p className="font-medium text-sm">{reservaManha.titulo}</p>
                              <p className="text-xs">{nomeBloco.manha}</p>
                            </div>
                          ) : (
                            <span className="text-sm">Livre</span>
                          )}
                        </div>
                        <div
                          className={`flex-1 flex items-center justify-center rounded px-2 py-1 cursor-pointer transition ${
                            reservaTarde ? `${reservaTarde.cor} text-black` : "bg-white text-gray-400 hover:bg-gray-100"
                          }`}
                          onClick={() => handleClickReserva(reservaTarde, sala, dia, "tarde")}
                        >
                          {reservaTarde ? (
                            <div className="text-center">
                              <p className="font-medium text-sm">{reservaTarde.titulo}</p>
                              <p className="text-xs">{nomeBloco.tarde}</p>
                            </div>
                          ) : (
                            <span className="text-sm">Livre</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <AdicionarReservaModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleAddReserva} />

      {isModalPendenteOpen && reservaSelecionada && (
        <ReservaPendenteModal
          reserva={reservaSelecionada}
          onClose={() => setIsModalPendenteOpen(false)}
          onAprovar={handleAprovarReserva}
          onRecusar={handleRecusarReserva}
        />
      )}
    </>
  );
}
