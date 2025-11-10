import React from "react";

export function Alert({ variant = "error", title, children, onClose }) {
  const colors = {
    error: "bg-red-50 text-red-700 border-red-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    success: "bg-green-50 text-green-700 border-green-200",
  };

  return (
    <div className={`${colors[variant]} rounded-lg p-4 border mb-4`}>
      {title && <h3 className="font-medium mb-1">{title}</h3>}
      <div className="text-sm">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
        >
          &times;
        </button>
      )}
    </div>
  );
}