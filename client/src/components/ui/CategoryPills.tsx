type Props = {
  items: { id: string | number; label: string }[];
  onSelect?: (id: string | number) => void;
  activeId?: string | number;
};

export default function CategoryPills({ items, onSelect, activeId }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => onSelect?.(it.id)}
          className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200 ${
            activeId === it.id
              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-500 shadow-md shadow-primary-200"
              : "bg-white text-slate-600 border-slate-200 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300"
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
