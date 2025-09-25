import Select, { type SingleValue } from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

interface DropdownSelectProps {
  options: OptionType[];
  value: OptionType | null;
  onChange: (option: OptionType | null) => void;
  placeholder?: string;
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Selecione...',
}) => {
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      width: 197,
      height: 56,
      borderRadius: 8,
      padding: '0 12px',
      backgroundColor: state.isFocused ? '#FFE8FB' : '#FAFBFF',
      borderColor: '#CAD5E2',
      boxShadow: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent:  'flex-start',
       gap: '8px',
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '140%',
      cursor: 'pointer',
    }),
    placeholder: (base: any) => ({
      ...base,
      color: '#738196',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#C20FB5',
        textAlign: 'left', 
  flex: 1, 
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: '#FAFBFF',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? '#FFE8FB' : '#FAFBFF',
      color: '#738196',
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '140%',
      padding: '12px 16px',
      cursor: 'pointer',
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: '#C20FB5',
       marginLeft: 'auto'
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={(option: SingleValue<OptionType>) => onChange(option)}
      styles={customStyles}
      placeholder={placeholder}
      isSearchable={false}
    />
  );
};