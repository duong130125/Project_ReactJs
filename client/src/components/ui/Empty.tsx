type Props = {
  title?: string;
  description?: string;
};

export default function EmptyState({
  title = "Không có dữ liệu",
  description = "Hãy thử thay đổi bộ lọc hoặc thêm nội dung mới.",
}: Props) {
  return (
    <div className="text-center p-10 bg-white rounded-xl border border-slate-100 text-slate-500">
      <div className="text-lg font-semibold text-slate-700">{title}</div>
      <div className="text-sm mt-1">{description}</div>
    </div>
  );
}
