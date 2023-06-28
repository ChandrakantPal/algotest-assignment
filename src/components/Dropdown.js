import * as React from "react";
import ArrowDownIcon from "./icons/ArrowDownIcon";

const Dropdown = ({ options, value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  const toggleDropdown = () => {
    setOpen((current) => !current);
  };

  const selectOption = (option) => {
    onChange(option.value);
    setOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption.label : "Select an option"}
        <ArrowDownIcon />
      </button>

      {open && (
        <div className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <button
                key={option.value}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left ${
                  value === option.value ? "bg-gray-200" : ""
                }`}
                role="menuitem"
                onClick={() => selectOption(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
