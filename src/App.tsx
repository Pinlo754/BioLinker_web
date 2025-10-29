import { Outlet, useLocation } from "react-router-dom";
import MobileBottomNav from "./components/sections/BottomMenu";

export default function App() {
  const location = useLocation();

  // Xác định tab đang active theo URL
  const active =
    location.pathname.startsWith("/marketplace")
      ? "market"
      : location.pathname.startsWith("/bio-edit")
      ? "edit"
      : location.pathname.startsWith("/account")
      ? "profile"
      : "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Phần nội dung trang con */}
      <div className="pb-20">
        <Outlet />
      </div>

      {/* Thanh bottom nav cho mobile */}
      {(location.pathname.startsWith("/marketplace") ||
        location.pathname.startsWith("/bio-edit") ||
        location.pathname.startsWith("/account")) && (
        <MobileBottomNav />
      )}
    </div>
  );
}
