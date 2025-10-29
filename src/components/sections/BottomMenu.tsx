import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
};

type Props = {
  className?: string;
};

export default function MobileBottomNav({ className = "" }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const items: NavItem[] = [
    {
      id: "market",
      label: "Market",
      path: "/marketplace",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 10h18l-2 10H5L3 10z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 6a4 4 0 0 1-8 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "edit",
      label: "Edit",
      path: "/bio-edit",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 20h9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "account",
      label: "Account",
      path: "/account",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M4 20a8 8 0 0 1 16 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const handleNavigation = (item: NavItem) => {
    // ✅ Kiểm tra đăng nhập khi nhấn "Account"
    if (item.id === "account") {
      const user = localStorage.getItem("user");
      if (!user) {
        navigate("/login");
        return;
      }
    }
    navigate(item.path);
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden ${className}`}
      aria-label="Bottom navigation"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto max-w-xl">
        <div className="bg-gradient-to-r from-[#16C875]/20 to-[#6CDFAB]/20 backdrop-blur-md border-t border-green-200 rounded-t-2xl shadow-lg flex justify-between items-center">
          {items.map((it) => {
            const isActive = location.pathname.startsWith(it.path);
            return (
              <button
                key={it.id}
                onClick={() => handleNavigation(it)}
                aria-current={isActive ? "page" : undefined}
                aria-label={it.label}
                className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-t-2xl transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white shadow-md scale-[1.05]"
                    : "text-gray-700 hover:bg-white/60 hover:text-green-700"
                }`}
              >
                <div className="w-6 h-6">{it.icon}</div>
                <span className="text-[11px] leading-none mt-0.5 font-medium">
                  {it.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
