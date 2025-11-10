import React from "react";

export function Label({ htmlFor, children, className = "" }) {
  return (
    <label htmlFor={htmlFor} className={`block text-gray-700 font-medium ${className}`}>
      {children}
    </label>
  );
}
