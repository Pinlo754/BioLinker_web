"use client";

import { LayoutTemplate, LayoutGrid, Palette, Layers, Settings } from "lucide-react";
import React from "react";

type Panel = "templates" | "content" | "background" | "style" | "settings";

interface LeftSidebarProps {
  activePanel: Panel;
  onPanelChange: (panel: Panel) => void;
}

export function LeftSidebar({ activePanel, onPanelChange }: LeftSidebarProps) {
  const navItems = [
    { id: "templates" as Panel, icon: LayoutTemplate, label: "Templates" },
    { id: "content" as Panel, icon: LayoutGrid, label: "Content" },
    { id: "background" as Panel, icon: Palette, label: "Background" },
    { id: "style" as Panel, icon: Layers, label: "Style" },
    { id: "settings" as Panel, icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/* 💻 Desktop Sidebar */}
      <div className="hidden md:flex md:w-16 lg:w-20 bg-sidebar border-r border-border flex-col items-center py-4 md:py-6 gap-3 md:gap-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPanelChange(item.id)}
              className={`w-full flex flex-col items-center gap-1 p-2 md:p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white"
                  : "text-sidebar-foreground hover:bg-accent"
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 📱 Mobile Bottom Bar */}
      <div className="z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-t border-slate-200 dark:border-slate-800 flex justify-around items-center py-2 px-1 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPanelChange(item.id)}
              className={`flex flex-col items-center justify-center rounded-lg px-3 py-1 transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
