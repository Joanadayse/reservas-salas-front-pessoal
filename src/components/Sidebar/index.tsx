import * as React from 'react';
import { CalendarIcon, Graphic, History, List } from '../Icon';
import { DropdownSelect } from '../DropdownSelect';
import { NavItem } from '../NavItem';





interface SidebarProps {
    className?: string;

}



const options = [
  { value: 'local1', label: 'São luis' },
  { value: 'local2', label: 'Caldeiras' },
];

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [selectedOption, setSelectedOption] = React.useState<
    { value: string; label: string } | null
  >(options[0]);


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