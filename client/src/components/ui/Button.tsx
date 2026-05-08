import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200";

  const variants = {
    primary:
      "bg-white text-black hover:bg-zinc-200",

    secondary:
      "bg-zinc-800 text-white hover:bg-zinc-700",
  };

  const disabledStyles =
    "cursor-not-allowed opacity-60";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        ${base}
        ${variants[variant]}
        ${
          loading || disabled
            ? disabledStyles
            : ""
        }
        ${className}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};