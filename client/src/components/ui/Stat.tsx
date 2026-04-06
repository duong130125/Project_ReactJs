type Props = {
  value: string;
  label: string;
  icon?: string;
};

export default function Stat({ value, label, icon }: Props) {
  return (
    <div className="text-center p-5 bg-white/60 backdrop-blur rounded-2xl border border-white/30 shadow-card">
      {icon && <div className="text-2xl mb-1">{icon}</div>}
      <div className="text-2xl md:text-3xl font-extrabold text-gradient-primary">
        {value}
      </div>
      <div className="text-xs md:text-sm text-slate-500 mt-1 font-medium">
        {label}
      </div>
    </div>
  );
}
