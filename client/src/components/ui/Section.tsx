import { ReactNode } from "react";

type Props = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function Section({
  title,
  description,
  icon,
  children,
  className,
}: Props) {
  return (
    <section
      className={`bg-white rounded-xl shadow-sm border border-slate-100 p-6 ${
        className ?? ""
      }`}
    >
      {(title || description) && (
        <header className="mb-4 flex items-start">
          {icon && <div className="mr-3 mt-1 text-blue-600">{icon}</div>}
          <div>
            {title && (
              <h2 className="text-lg md:text-xl font-bold text-slate-800">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-slate-500 mt-1">{description}</p>
            )}
          </div>
        </header>
      )}
      {children}
    </section>
  );
}
