import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  color?: "blue" | "green" | "orange" | "purple";
  className?: string;
};

const colorMap = {
  blue: "bg-blue-50 text-blue-600 ring-blue-200",
  green: "bg-green-50 text-green-600 ring-green-200",
  orange: "bg-orange-50 text-orange-600 ring-orange-200",
  purple: "bg-violet-50 text-violet-600 ring-violet-200",
};

export default function IconBadge({ icon, color = "blue", className }: Props) {
  return (
    <div
      className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ring-1 ${
        colorMap[color]
      } ${className ?? ""}`}
    >
      {icon}
    </div>
  );
}
