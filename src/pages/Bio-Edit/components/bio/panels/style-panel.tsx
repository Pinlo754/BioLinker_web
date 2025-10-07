"use client"

import type { ProfileData } from "../../../../../types/bio"
import { Input } from "../../../../../components/ui/input"
import { Label } from "../../../../../components/ui/label"
import { Search, LayoutGrid, Rows, Maximize2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../components/ui/select"
import { Button } from "../../../../../components/ui/button"

interface StylePanelProps {
  profileData: ProfileData
  onUpdateProfile: (updates: Partial<ProfileData>) => void
}

export function StylePanel({ profileData, onUpdateProfile }: StylePanelProps) {
  const buttonShapes = [
    { id: "rounded", label: "Rounded", class: "rounded-lg" },
    { id: "pill", label: "Pill", class: "rounded-full" },
    { id: "square", label: "Square", class: "rounded-none" },
    { id: "ribbon-left", label: "Ribbon Left", class: "rounded-r-full" },
    { id: "ribbon-right", label: "Ribbon Right", class: "rounded-l-full" },
    { id: "ribbon-both", label: "Ribbon Both", class: "rounded-full" },
  ]

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Style</h2>

      <div className="mb-6">
        <Label className="mb-3 block">Layout Mode</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={profileData.layoutMode === "flex-vertical" ? "default" : "outline"}
            size="sm"
            onClick={() => onUpdateProfile({ layoutMode: "flex-vertical" })}
            className="flex flex-col items-center gap-1 h-auto py-3"
          >
            <Rows className="w-5 h-5" />
            <span className="text-xs">Vertical</span>
          </Button>
          <Button
            variant={profileData.layoutMode === "flex-horizontal" ? "default" : "outline"}
            size="sm"
            onClick={() => onUpdateProfile({ layoutMode: "flex-horizontal" })}
            className="flex flex-col items-center gap-1 h-auto py-3"
          >
            <LayoutGrid className="w-5 h-5 rotate-90" />
            <span className="text-xs">Horizontal</span>
          </Button>
          <Button
            variant={profileData.layoutMode === "absolute" ? "default" : "outline"}
            size="sm"
            onClick={() => onUpdateProfile({ layoutMode: "absolute" })}
            className="flex flex-col items-center gap-1 h-auto py-3"
          >
            <Maximize2 className="w-5 h-5" />
            <span className="text-xs">Free</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {profileData.layoutMode === "flex-vertical" && "Elements stack vertically"}
          {profileData.layoutMode === "flex-horizontal" && "Elements arrange horizontally"}
          {profileData.layoutMode === "absolute" && "Drag elements freely anywhere"}
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-9" />
        </div>
        <Select defaultValue="ai">
          <SelectTrigger className="w-40 ml-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ai">AI-Generated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Button Shapes */}
      <div className="mb-6">
        <Label className="mb-3 block">Button Shapes</Label>
        <div className="grid grid-cols-3 gap-3">
          {buttonShapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() =>
                onUpdateProfile({
                  globalStyles: { ...profileData.globalStyles, buttonStyle: shape.id },
                })
              }
              className={`h-16 border-2 transition-colors ${shape.class} ${
                profileData.globalStyles.buttonStyle === shape.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Button Fill Color */}
      <div className="mb-6">
        <Label htmlFor="button-color" className="mb-3 block">
          Button fill color
        </Label>
        <div className="flex gap-3">
          <Input
            id="button-color"
            type="color"
            value={profileData.globalStyles.buttonColor}
            onChange={(e) =>
              onUpdateProfile({
                globalStyles: { ...profileData.globalStyles, buttonColor: e.target.value },
              })
            }
            className="w-20 h-10"
          />
          <Input
            value={profileData.globalStyles.buttonColor}
            onChange={(e) =>
              onUpdateProfile({
                globalStyles: { ...profileData.globalStyles, buttonColor: e.target.value },
              })
            }
            className="flex-1"
          />
        </div>
      </div>

      {/* Icon Color */}
      <div className="mb-6">
        <Label htmlFor="icon-color" className="mb-3 block">
          Icon color
        </Label>
        <div className="flex gap-3">
          <Input
            id="icon-color"
            type="color"
            value={profileData.globalStyles.iconColor}
            onChange={(e) =>
              onUpdateProfile({
                globalStyles: { ...profileData.globalStyles, iconColor: e.target.value },
              })
            }
            className="w-20 h-10"
          />
          <Input
            value={profileData.globalStyles.iconColor}
            onChange={(e) =>
              onUpdateProfile({
                globalStyles: { ...profileData.globalStyles, iconColor: e.target.value },
              })
            }
            className="flex-1"
          />
        </div>
      </div>
    </div>
  )
}
