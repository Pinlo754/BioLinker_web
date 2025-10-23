import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AsideBar() {
  // State cho accordion
  const [open, setOpen] = useState({
    orientation: false,
    jobOptions: true,
    categoryOptions: true,
  });

  // Options
  const orientationOptions = [
    "Chiều ngang",
    "Chiều dọc",
    "Bình thường",
  ] as const;

  const jobOptions = [
    "Nghệ sĩ",
    "Thiết kế",
    "Lập trình viên",
    "Cá nhân",
    "Khác",
    "Nhà sản xuất âm nhạc",
    "Nhà sáng tạo nội dung",
    "Chủ doanh nghiệp",
  ] as const;

  const toggle = (key: keyof typeof open) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  // Checkbox selections
  const [selectedOrientation, setSelectedOrientation] = useState("");
  const [selectedJobOptions, setSelectedJobOptions] = useState("");

  const toggleSelection = (section:"orientation", value: string) => {
      setSelectedOrientation(value)
  };

  const clearAll = () => {
    setSelectedOrientation("");
  };

  return (
    <aside className="w-full max-w-xs bg-white min-h-screen px-4 py-6 flex flex-col gap-4">


      {/* Orientation */}
      <div className="bg-white rounded-3xl shadow px-6 py-4 mb-2">
        <button
          className="flex w-full items-center justify-between text-lg font-semibold text-gray-800"
          onClick={() => toggle("orientation")}
        >
          Định hướng
          <ChevronDown className={`ml-2 transition-transform ${open.orientation ? "rotate-180" : ""}`} />
        </button>
        {open.orientation && (
          <div className="mt-4 flex flex-col gap-3">
            {orientationOptions.map((txt) => (
              <label key={txt} className="flex items-center gap-3 text-gray-700 text-lg">
                <input
                  type="checkbox"
                  className="accent-green-400 w-6 h-6"
                  checked={selectedOrientation === txt}
                  onChange={() => toggleSelection("orientation", txt)}
                />
                {txt}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Color */}
      <div className="bg-white rounded-3xl shadow px-6 py-4 mb-2">
        <button
          className="flex w-full items-center justify-between text-lg font-semibold text-gray-800"
          onClick={() => toggle("jobOptions")}
        >
          Nghề nghiệp
          <ChevronDown className={`ml-2 transition-transform ${open.jobOptions ? "rotate-180" : ""}`} />
        </button>
        {open.jobOptions && (
          <div className="mt-4 flex flex-wrap gap-2">
            {jobOptions.map((job, i) => (
              <button className={`px-3 py-1 rounded-full text-base font-medium ${selectedJobOptions === job ? "bg-emerald-500 text-white" : "border border-emerald-300 text-emerald-700"}`}
              onClick={() => setSelectedJobOptions(job)}>
              {job}
            </button>
            ))}
          </div>
        )}
      </div>

      {/* People */}
      <div className="bg-white rounded-3xl shadow px-6 py-4 mb-2">
        <button
          className="flex w-full items-center justify-between text-lg font-semibold text-gray-800"
          onClick={() => toggle("categoryOptions")}
        >
          Danh mục
          <ChevronDown className={`ml-2 transition-transform ${open.categoryOptions ? "rotate-180" : ""}`} />
        </button>
        {open.categoryOptions && (
          <div className="mt-4 flex flex-col gap-3">
            
          </div>
        )}
      </div>

      {/* Nút Apply & Clear all */}
      <div className="mt-6 flex flex-col gap-3">
        <button className="w-full py-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white text-lg font-semibold shadow hover:opacity-90 transition">
          Áp dụng
        </button>
        <button className="w-full py-3 rounded-full bg-gray-100 text-gray-400 text-lg font-semibold shadow" onClick={clearAll}>
          Xóa tất cả
        </button>
      </div>
    </aside>
  );
}