import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
    />
  );
}
