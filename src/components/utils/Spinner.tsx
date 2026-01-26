import { CgSpinner } from "react-icons/cg";

export default function Spinner({
  loading = true,
  width = "w-20",
  height = "h-20",
  color = "text-blue-500",
}) {
  if (!loading) return null;

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <CgSpinner
        className={`${width} ${height} ${color} animate-spin`}
      />
    </div>
  );
}
