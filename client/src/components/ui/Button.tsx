import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  loading = false,
  variant = "primary",
  className = "",
}) => {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${base} ${variants[variant]} ${className} ${
        loading ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};