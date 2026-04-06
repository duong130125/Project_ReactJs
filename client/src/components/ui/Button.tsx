import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: "sm" | "md" | "lg";
};

export default function UIButton({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl";

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
  };

  const variants: Record<Variant, string> = {
    primary:
      "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-400 shadow-md shadow-primary-200 hover:shadow-lg hover:shadow-primary-300",
    secondary:
      "bg-white text-slate-700 hover:bg-primary-50 hover:text-primary-600 border border-slate-200 hover:border-primary-300 focus:ring-primary-300",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-800",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-md shadow-red-200",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className ?? ""}`}
      {...rest}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
