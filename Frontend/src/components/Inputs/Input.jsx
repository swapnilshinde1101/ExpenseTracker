import React, { useState } from 'react';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'; // ✅ Import icons

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className="relative w-full">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none border-b border-gray-300 py-2 pr-10"
          value={value}
          onChange={(e) => onChange(e.target.value)} // ✅ Fixed here
        />

        {type === "password" && (
          <span
            className="absolute top-2 right-2 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FaEye size={22} className="text-primary" />
            ) : (
              <FaRegEyeSlash size={22} className="text-slate-400" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
