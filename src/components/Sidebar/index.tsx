import React from 'react';

import { CalendarIcon, Graphic, History, List } from '../Icon';
import { DropdownSelect } from '../DropdownSelect';
import { NavItem } from '../NavItem';




interface OptionType {
  label: string;
  value: string;
}



interface SidebarProps {
    className?: string;

}



const options = [
  { value: 'local1', label: 'Local 1' },
  { value: 'local2', label: 'Local 2' },
];

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [selectedOption, setSelectedOption] = React.useState<
    { value: string; label: string } | null
  >(options[0]);

  // Função utilitária para classes de navegação
// const getNavLinkClasses = ({ isActive }: { isActive: boolean }) => {
//   const baseClasses = "flex items-center p-2 rounded-lg font-medium text-lg transition-all duration-200";
//   const activeClasses = "bg-fuchsia-100 text-fuchsia-500";
//   const inactiveClasses = "text-gray-600 hover:bg-gray-200";

//   return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
// };

  // Função utilitária para o filtro de cores dos ícones
// const getIconFilter = (isActive: boolean) => {
//   // Filtro para a cor ativa (roxo/fuchsia)
//   const activeFilter = "invert(22%) sepia(89%) saturate(2601%) hue-rotate(282deg) brightness(92%) contrast(97%)";

//   // Filtro para a cor inativa (cinza)
//   const inactiveFilter = "invert(17%) sepia(15%) saturate(1325%) hue-rotate(172deg) brightness(94%) contrast(93%)";

//   return isActive ? activeFilter : inactiveFilter;
// };

  return (
   <div className={`w-[250px] flex flex-col justify-start p-6 h-screen bg-white rounded-md border border-gray-200 shadow-2xl ${className}`}>

      {/* Logo e Wrapper */}
      <div className="pb-4">
        <img src="/logo.png" alt="Logo" className="h-[80px] object-contain" />
      </div>

      

      {/* Seletor de Localização */}
<div className="pb-2">
  <div className="flex justify-start mb-2">
    <span className="text-[#45556C] font-inter text-[16px] font-semibold leading-[140%]">
      Local
    </span>
  </div>
<DropdownSelect
  options={options}
  value={selectedOption}
  onChange={setSelectedOption}
/>
</div>
   <nav className="flex flex-col gap-3">
         <div className="flex justify-start mt-4">
    <span className="text-[#45556C] font-inter text-[16px] font-semibold leading-[140%]">
      Menu
    </span>
  </div>

<NavItem to="/" label="Reservas" icon={<CalendarIcon />} />
<NavItem to="/ambientes" label="Ambientes" icon={<List />} />
<NavItem to="/historico" label="Histórico" icon={<History />} />
<NavItem to="/dashboard" label="Estatísticas" icon={<Graphic />} />
      </nav>

 

    </div>
  );
};

export default Sidebar;