import { Outlet, useLocation } from "react-router-dom";
import MobileBottomNav from "./components/sections/BottomMenu";

export default function App() {
  const location = useLocation();
  const path = location.pathname;

  const isBioLinkerPage = /^\/biolinker\/[^/]+\/?$/.test(path); // cho phép dấu / cuối
  console.log("PATH:", path, "isBioLinkerPage:", isBioLinkerPage);

  const active =
    path.startsWith("/marketplace")
      ? "market"
      : path.startsWith("/bio-edit")
      ? "edit"
      : path.startsWith("/account")
      ? "profile"
      : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-20">
        <Outlet />
      </div>

      {!isBioLinkerPage &&
        (path.startsWith("/marketplace") ||
          path.startsWith("/bio-edit") ||
          path.startsWith("/account")) && <MobileBottomNav />}
    </div>
  );
}
