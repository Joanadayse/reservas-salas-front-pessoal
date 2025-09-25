import { Button, DropdownSelect, Input } from "@joana23a/styled-lib";
import { useState } from "react";
interface ReservaFormProps {
  onClose?: () => void;
  onSave?: (data: any) => void;
  isOpen: boolean;
}

interface OptionType {
  label: string;
  value: string;
}






export const AdicionarReservaModal: React.FC<ReservaFormProps> = ({ onClose, onSave , isOpen}) => {
 if (!isOpen) return null;
  
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState<OptionType | null>(null);
  const [ambiente, setAmbiente] = useState<OptionType | null>(null);
   const [periodo, setPeriodo] = useState<OptionType | null>(null);
  const [data, setData] = useState("");
  const [setor, setSetor] = useState("");
  const [finalidade, setFinalidade] = useState("");
  const [observacoes, setObservacoes] = useState("");
 

  const locais = ["Caldeiras", "São Luís"];
    const ambientes= ["duila de melo", "santos Dummont", "Alan Turing", "Thomas Edison"];
  const periodos = [
    { value: "manha", label: "Manhã (08:00 - 12:00)" },
    { value: "tarde", label: "Tarde (13:00 - 17:00)" },
    { value: "dia-inteiro", label: "Dia Inteiro (08:00 - 17:00)" },
  ];


  const locaisOptions: OptionType[] = locais.map(loc => ({ label: loc, value: loc }));
  const ambientesOptions: OptionType[] = ambientes.map(amb => ({ label: amb, value: amb }));
  const periodosOptions: OptionType[] = periodos.map(per => ({ label: per.label, value: per.value }));


    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({ 
         titulo: finalidade,
         cor: "bg-blue-200",
        nome, 
        local: local?.valueOf || "",
        ambiente: ambiente?.valueOf || "", 
        data, 
        periodo: periodo?.valueOf || "",
        setor, 
        finalidade, 
        observacoes 
      });
    }
    if (onClose) onClose();
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Nova Reserva</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <Input
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e: any) => setNome(e.target.value)}
          />
        </div>
 <div className="grid grid-cols-2 gap-4">
        {/* Local */}
      <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Local
            </label>
            <DropdownSelect
              options={locaisOptions}
              value={local}
              onChange={setLocal}
              placeholder="Selecione um local"
            />
          </div>

      <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ambiente
            </label>
            <DropdownSelect
              options={ambientesOptions}
              value={ambiente}
              onChange={setAmbiente}
              placeholder="Selecione um ambiente"
            />
          </div>
          </div>

        {/* Data e Período */}
 <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data
              </label>
              <Input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Período
              </label>
              <DropdownSelect
                options={periodosOptions}
                value={periodo}
                onChange={setPeriodo}
                placeholder="Selecione um período"
              />
            </div>
          </div>

        {/* Setor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Setor
          </label>
          <Input
            placeholder="Digite o setor"
            value={setor}
            onChange={(e: any) => setSetor(e.target.value)}
          />
        </div>

        {/* Finalidade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Finalidade
          </label>
          <Input
            placeholder="Ex: Reunião de Equipe, Workshop..."
            value={finalidade}
            onChange={(e: any) => setFinalidade(e.target.value)}
          />
        </div>

        {/* Observações */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Observações (opcional)
          </label>
          <textarea
            placeholder="Informações adicionais sobre a reserva"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C20FB5]"
            rows={3}
          />
        </div>

        {/* Ações */}
        <div className="flex justify-end gap-3 pt-4">
          <Button  onClick={onClose} variant="secondary">
            Cancelar
          </Button>
          <Button  type="submit">
            Salvar Reserva
          </Button>
        </div>
      </form>
    </div>
    </div>
  );
};
