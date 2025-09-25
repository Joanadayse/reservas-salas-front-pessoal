import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

export const NavItem: React.FC<NavItemProps> = ({ to, label, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        const base =
          "flex items-center p-2 rounded-lg font-inter text-[16px] font-semibold leading-[140%] transition-colors duration-200";
        const active = "bg-[#FFE8FB] text-[#C20FB5]";
        const hover = "hover:bg-[#E2E8F0] hover:text-[#45556C]";
        const inactive = "text-gray-600";

        return `${base} ${isActive ? active : `${inactive} ${hover}`}`;
      }}
    >
      {({ isActive }) => (
        <>
          {icon && (
            <span className={`w-5 h-5 mr-3 ${isActive ? "text-[#C20FB5]" : "text-[#45556C]"}`}>
              {icon}
            </span>
          )}
          {label}
        </>
      )}
    </NavLink>
  );
};
