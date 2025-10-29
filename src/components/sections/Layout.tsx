// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import MobileBottomNav from "./BottomMenu";

export default function MainLayout() {
  return (
    <div>
      <MobileBottomNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
