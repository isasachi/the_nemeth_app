interface CustomRadioButtonProps {
    label: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({ label, name, value, checked, onChange }) => {
    return (
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="hidden"
        />
        <div className={`w-full h-auto flex items-center justify-center border rounded-lg p-2 transition-all 
          ${checked ? 'bg-violet-500 text-white border-transparent' : 'bg-white text-black-500 border-violet-500'} 
          hover:bg-violet-500 hover:text-white hover:border-transparent`}>
          <div className={`w-4 h-4 mr-2 rounded-full border-2 
            ${checked ? 'border-white bg-white' : 'border-violet-500 bg-transparent'}`}></div>
          {label}
        </div>
      </label>
    );
  };
  
  export default CustomRadioButton;