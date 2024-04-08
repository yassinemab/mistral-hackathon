import { useEffect, useState } from "react";

interface DropdownInputProps {
  onChangeValue: (value: string) => void;
  placeholder: string;
  classNameInput?: string;
  options: {
    value: string;
    label: string;
  }[];
}
export const DropdownInput = ({ onChangeValue, placeholder, classNameInput, options }: DropdownInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (inputValue) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChangeValue(e.target.value);
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    onChangeValue(value);
    setIsOpen(false); // Ferme le dropdown après sélection
  };
  return (
    <div className={"relative z-10"}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className={classNameInput}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
      />
      {isOpen && (
        <div className="absolute left-0 top-100 right-0 bg-white border border-gray-300 rounded shadow-lg z-20">
          <ul>
            {
              options.map((option) => (
                <li key={option.value} className="text-[#222222] p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect(option.value)}>{option.label}</li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  )
}
