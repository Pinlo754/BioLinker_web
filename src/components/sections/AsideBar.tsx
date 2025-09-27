import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AsideBar() {
  // State cho accordion
  const [open, setOpen] = useState({
    ai: true,
    orientation: true,
    color: true,
    people: true,
    gender: false,
    age: false,
    job: false,
  });

  // Options
  const aiOptions = ["Only-AI Generated", "Exclude-AI Generated", "All"] as const;
  const orientationOptions = [
    "Horizontal",
    "Vertical",
    "Square",
    "Panoramic",
    "Mobile",
    "Desktop",
  ] as const;

  const toggle = (key: keyof typeof open) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  // Checkbox selections
  const [selectedAi, setSelectedAi] = useState<string[]>([]);
  const [selectedOrientation, setSelectedOrientation] = useState<string[]>([]);

  const toggleSelection = (section: "ai" | "orientation", value: string) => {
    if (section === "ai") {
      setSelectedAi((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else if (section === "orientation") {
      setSelectedOrientation((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    }
  };

  const clearAll = () => {
    setSelectedAi([]);
    setSelectedOrientation([]);
  };

  return (
    <aside className="w-full max-w-xs bg-white min-h-screen px-4 py-6 flex flex-col gap-4">
      {/* Free / Premium */}
      <div className="flex gap-4 mb-4">
        <button className="flex-1 bg-white rounded-full py-3 text-lg font-medium text-gray-700 shadow">
          Free
        </button>
        <button className="flex-1 bg-white rounded-full py-3 text-lg font-medium text-gray-700 shadow">
          Premium
        </button>
      </div>

      {/* AI Generated */}
      <div className="bg-white rounded-3xl shadow px-6 py-4 mb-2">
        <button
          className="flex w-full items-center justify-between text-lg font-semibold text-gray-800"
          onClick={() => toggle("ai")}
        >
          AI Generated
          <ChevronDown className={`ml-2 transition-transform ${open.ai ? "rotate-180" : ""}`} />
        </button>
        {open.ai && (
          <div className="mt-4 flex flex-col gap-3">
            {aiOptions.map((txt) => (
              <label key={txt} className="flex items-center gap-3 text-gray-700 text-lg">
                <input
                  type="checkbox"
                  className="accent-green-400 w-6 h-6"
                  checked={selectedAi.includes(txt)}
                  onChange={() => toggleSelection("ai", txt)}
                />
                {txt}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Orientation */}
      <div className="bg-white rounded-3xl shadow px-6 py-4 mb-2">
        <button
          className="flex w-full items-center justify-between text-lg font-semibold text-gray-800"
          onClick={() => toggle("orientation")}
        >
          Orientation
          <ChevronDown className={`ml-2 transition-transform ${open.orientation ? "rotate-180" : ""}`} />
        </button>
        {open.orientation && (
          <div className="mt-4 flex flex-col gap-3">
            {orientationOptions.map((txt) => (
              <label key={txt} className="flex items-center gap-3 text-gray-700 text-lg">
                <input
                  type="checkbox"
                  className="accent-green-400 w-6 h-6"
                  checked={selectedOrientation.includes(txt)}
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
          onClick={() => toggle("color")}
        >
          Color
          <ChevronDown className={`ml-2 transition-transform ${open.color ? "rotate-180" : ""}`} />
        </button>
        {open.color && (
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              "bg-black", "bg-white", "bg-green-300", "bg-blue-200", "bg-blue-500", "bg-indigo-400",
              "bg-pink-200", "bg-red-400", "bg-orange-400", "bg-yellow-200", "bg-gray-300"
            ].map((c, i) => (
              <span key={i} className={`${c} w-8 h-8 rounded-full border border-gray-200 cursor-pointer`}></span>
            ))}
          </div>
        )}
      </div>

      {/* People */}
      <div className="bg-white rounded-3xl shadow px-6 py-4 mb-2">
        <button
          className="flex w-full items-center justify-between text-lg font-semibold text-gray-800"
          onClick={() => toggle("people")}
        >
          People
          <ChevronDown className={`ml-2 transition-transform ${open.people ? "rotate-180" : ""}`} />
        </button>
        {open.people && (
          <div className="mt-4 flex flex-col gap-3">
            {/* Gender */}
            <div>
              <button
                className="flex w-full items-center justify-between text-base font-medium text-gray-700"
                onClick={() => toggle("gender")}
                type="button"
              >
                Gender
                <ChevronDown className={`ml-2 transition-transform ${open.gender ? "rotate-180" : ""}`} />
              </button>
              {open.gender && (
                <input
                  type="text"
                  placeholder="Gender"
                  className="w-full mt-2 border rounded-full px-4 py-2"
                />
              )}
            </div>
            {/* Age */}
            <div>
              <button
                className="flex w-full items-center justify-between text-base font-medium text-gray-700"
                onClick={() => toggle("age")}
                type="button"
              >
                Age
                <ChevronDown className={`ml-2 transition-transform ${open.age ? "rotate-180" : ""}`} />
              </button>
              {open.age && (
                <input
                  type="text"
                  placeholder="Age"
                  className="w-full mt-2 border rounded-full px-4 py-2"
                />
              )}
            </div>
            {/* Job */}
            <div>
              <button
                className="flex w-full items-center justify-between text-base font-medium text-gray-700"
                onClick={() => toggle("job")}
                type="button"
              >
                Job
                <ChevronDown className={`ml-2 transition-transform ${open.job ? "rotate-180" : ""}`} />
              </button>
              {open.job && (
                <input
                  type="text"
                  placeholder="Job"
                  className="w-full mt-2 border rounded-full px-4 py-2"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Nút Apply & Clear all */}
      <div className="mt-6 flex flex-col gap-3">
        <button className="w-full py-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white text-lg font-semibold shadow hover:opacity-90 transition">
          Apply
        </button>
        <button className="w-full py-3 rounded-full bg-gray-100 text-gray-400 text-lg font-semibold shadow" onClick={clearAll}>
          Clear all
        </button>
      </div>
    </aside>
  );
}