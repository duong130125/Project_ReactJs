import { FormEvent, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

type Props = {
  placeholder?: string;
  onSearch?: (q: string) => void;
  className?: string;
};

export default function SearchBar({
  placeholder = "Tìm khóa học, môn học...",
  onSearch,
  className,
}: Props) {
  const [q, setQ] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(q.trim());
  };

  return (
    <form
      onSubmit={submit}
      className={`flex items-center bg-white rounded-xl border border-slate-200 px-4 py-2.5 shadow-card focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all ${
        className ?? ""
      }`}
    >
      <HiOutlineSearch className="h-5 w-5 text-slate-400 flex-shrink-0" />
      <input
        className="flex-1 px-3 outline-none text-sm text-slate-700 placeholder-slate-400"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm"
      >
        Tìm kiếm
      </button>
    </form>
  );
}
