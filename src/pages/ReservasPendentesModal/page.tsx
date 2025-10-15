import { Button } from "@joana23a/styled-lib";

interface Reserva {
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

// Mock de reserva
const reservaMock: Reserva = {
  id: 1,
  nome: "Joana Dayse",
  telefone: "(99) 99999-9999",
  email: "joana@example.com",
  setor: "TI",
  gerencia: "Gerência de Projetos",
  superintendencia: "Superintendência de Tecnologia",
  finalidade: "Reunião de alinhamento de equipe",
  participantes: ["Equipe em Geral", "Gerente"],
};

interface ReservaPendenteModalProps {
  reserva?: Reserva;
  onClose: () => void;
  onAprovar: (id: number) => void;
  onRecusar: (id: number) => void;
}

export const ReservaPendenteModal: React.FC<ReservaPendenteModalProps> = ({
  reserva = reservaMock,
  onClose,
  onAprovar,
  onRecusar,
}) => {
  const setores = ["Financeiro", "RH", "TI", "Comercial"];
  const participantesOpcoes = ["Equipe em Geral", "Executivo", "Gerente", "Superintendente", "Diretor"];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Solicitação de Reserva</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Nome, Telefone e Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <div className="text-gray-800">{reserva.nome}</div>

            <div className="grid grid-cols-2 gap-2 mt-2 text-gray-800 text-sm">
              <div>
                <label className="block font-medium mb-1">Telefone</label>
                <div>{reserva.telefone}</div>
              </div>
              <div>
                <label className="block font-medium mb-1">E-mail</label>
                <div>{reserva.email}</div>
              </div>
            </div>
          </div>

          {/* Setor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Setor</label>
            <div className="grid grid-cols-2 gap-2">
              {setores.map((s) => (
                <label key={s} className="flex items-center gap-2 text-gray-700 text-sm">
                  <input type="checkbox" checked={reserva.setor === s} readOnly />
                  {s}
                </label>
              ))}
            </div>
          </div>

          {/* Gerência e Superintendência */}
          <div className="grid grid-cols-2 gap-4 text-gray-800">
            <div>
              <label className="block text-sm font-medium mb-1">Gerência</label>
              <div>{reserva.gerencia}</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Superintendência</label>
              <div>{reserva.superintendencia}</div>
            </div>
          </div>

          {/* Finalidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Finalidade</label>
            <div className="text-gray-800">{reserva.finalidade}</div>
          </div>

          {/* Participantes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quem vai participar?</label>
            <div className="grid grid-cols-2 gap-2">
              {participantesOpcoes.map((p) => (
                <label key={p} className="flex items-center gap-2 text-gray-700 text-sm">
                  <input type="checkbox" checked={reserva.participantes.includes(p)} readOnly />
                  {p}
                </label>
              ))}
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-3 pt-4">
            <Button onClick={onClose} variant="secondary">
              Fechar
            </Button>
            <Button onClick={() => onRecusar(reserva.id)} className="bg-red-500 hover:bg-red-600">
              Recusar
            </Button>
            <Button onClick={() => onAprovar(reserva.id)} className="bg-green-500 hover:bg-green-600">
              Aceitar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
