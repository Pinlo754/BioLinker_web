"use client"

import { LayoutTemplate, LayoutGrid, Palette, Layers, Settings } from "lucide-react"

type Panel = "templates" | "content" | "background" | "style" | "settings"

interface LeftSidebarProps {
  activePanel: Panel
  onPanelChange: (panel: Panel) => void
}

export function LeftSidebar({ activePanel, onPanelChange }: LeftSidebarProps) {
  const navItems = [
    { id: "templates" as Panel, icon: LayoutTemplate, label: "Templates" },
    { id: "content" as Panel, icon: LayoutGrid, label: "Content" },
    { id: "background" as Panel, icon: Palette, label: "Background" },
    { id: "style" as Panel, icon: Layers, label: "Style" },
    { id: "settings" as Panel, icon: Settings, label: "Settings" },
  ]

  return (
    <div className="w-20 bg-sidebar border-r border-border flex flex-col items-center py-6 gap-6">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activePanel === item.id
        return (
          <button
            key={item.id}
            onClick={() => onPanelChange(item.id)}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
              isActive ? "bg-primary text-primary-foreground" : "text-sidebar-foreground hover:bg-accent"
            }`}
            title={item.label}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
