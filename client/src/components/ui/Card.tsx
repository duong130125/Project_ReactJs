import { ReactNode } from "react";

type Props = {
  title?: string;
  description?: string;
  mediaUrl?: string;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  badge?: string;
};

export default function Card({
  title,
  description,
  mediaUrl,
  actions,
  children,
  className,
  badge,
}: Props) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden card-hover ${
        className ?? ""
      }`}
    >
      {mediaUrl && (
        <div className="relative overflow-hidden">
          <img
            src={mediaUrl}
            alt={title ?? "media"}
            className="w-full h-44 md:h-48 object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          {badge && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full shadow-md">
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="p-5">
        {title && (
          <h3 className="text-base md:text-lg font-bold text-slate-800 line-clamp-2">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">
            {description}
          </p>
        )}
        {children}
        {actions && <div className="mt-4">{actions}</div>}
      </div>
    </div>
  );
}
