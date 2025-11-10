import React from "react";

export function RadioGroup({ children, defaultValue, className }) {
  return (
    <div className={`flex flex-col gap-2 ${className || ""}`}>
      {children}
    </div>
  );
}

export function RadioGroupItem({ id, value, name, checked, onChange }) {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
    />
  );
}
