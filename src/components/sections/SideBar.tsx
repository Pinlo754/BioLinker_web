import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";

type AsideBarProps = {
  categoryOptions: string[];
  filterTemplates: (jobFilter?: string, categoryFilter?: string) => void;
};

const AsideBar = ({ categoryOptions, filterTemplates }: AsideBarProps) => {
  // State accordion
  const [open, setOpen] = useState({
    jobOptions: true,
    categoryOptions: true,
  });

  const toggle = (key: keyof typeof open) =>
    setOpen((o) => ({ ...o, [key]: !o[key] }));

  const jobOptions = [
    "Nghệ sĩ",
    "Thiết kế",
    "Lập trình viên",
    "Cá nhân",
    "Khác",
    "Nhà sản xuất âm nhạc",
    "Nhà sáng tạo nội dung",
    "Chủ doanh nghiệp",
  ];

  const [selectedJobOptions, setSelectedJobOptions] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleApply = () => {
    filterTemplates(selectedJobOptions, selectedCategory);
  };

  const clearAll = () => {
    setSelectedJobOptions("");
    setSelectedCategory("");
    filterTemplates("", "");
  };

  // State hamburger trên mobile
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderContent = () => (
    <div className="flex flex-col gap-4">
      {/* Job */}
      <div className="bg-white rounded-3xl shadow px-6 py-4">
        <button
          className="flex w-full items-center justify-between text-lg font-semibold text-gray-800"
          onClick={() => toggle("jobOptions")}
        >
          Nghề nghiệp
          <ChevronDown
            className={`ml-2 transition-transform ${
              open.jobOptions ? "rotate-180" : ""
            }`}
          />
        </button>
        {open.jobOptions && (
          <div className="mt-4 flex flex-wrap gap-2">
            {jobOptions.map((job, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded-full text-base font-medium ${
                  selectedJobOptions === job
                    ? "bg-emerald-500 text-white"
                    : "border border-emerald-300 text-emerald-700"
                }`}
                onClick={() =>
                  setSelectedJobOptions(selectedJobOptions === job ? "" : job)
                }
              >
                {job}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Category */}
      <div className="bg-white rounded-3xl shadow px-6 py-4">
        <button
          className="flex w-full items-center justify-between text-lg font-semibold text-gray-800"
          onClick={() => toggle("categoryOptions")}
        >
          Danh mục
          <ChevronDown
            className={`ml-2 transition-transform ${
              open.categoryOptions ? "rotate-180" : ""
            }`}
          />
        </button>
        {open.categoryOptions && (
          <div className="mt-4 flex flex-wrap gap-2">
            {categoryOptions.slice(0, 10).map((cat, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded-full text-base font-medium ${
                  selectedCategory === cat
                    ? "bg-emerald-500 text-white"
                    : "border border-emerald-300 text-emerald-700"
                }`}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat ? "" : cat)
                }
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Apply & Clear */}
      <div className="mt-6 flex flex-col gap-3">
        <button
          className="w-full py-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white text-lg font-semibold shadow hover:opacity-90 transition"
          onClick={handleApply}
        >
          Áp dụng
        </button>
        <button
          className="w-full py-3 rounded-full bg-gray-100 text-gray-400 text-lg font-semibold shadow"
          onClick={clearAll}
        >
          Xóa tất cả
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-full max-w-xs flex-col">{renderContent()}</aside>

      {/* Mobile hamburger */}
      <div className="lg:hidden relative">
        <button
          className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setMobileOpen(false)}
            ></div>
            <div className="fixed top-0 right-0 h-full w-72 bg-white z-50 p-6 overflow-y-auto shadow-lg">
              {renderContent()}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AsideBar;