import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "danger";
  type: "button" | "submit";
  onClick?: () => void;
};

const base = "px-4 py-2 rounded-lg";

const variants = {
  primary: base + " bg-blue-500 hover:bg-blue-600 text-white",
  secondary: base + " bg-gray-100 hover:bg-gray-200 text-gray-700",
  danger: base + " bg-red-600 hover:bg-red-700 text-white",
};

const Button = ({ children, variant, type, onClick }: ButtonProps) => {
  return (
    <button type={type} className={variants[variant]} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
