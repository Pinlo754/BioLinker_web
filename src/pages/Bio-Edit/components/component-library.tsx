"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Type, ImageIcon, MousePointer, Share2, FileText, Award, Plus } from "lucide-react"

interface ComponentLibraryProps {
  onAddComponent: (type: "text" | "image" | "button" | "social-links" | "bio" | "skills") => void
}

const componentTypes = [
  {
    type: "text" as const,
    name: "Text Block",
    description: "Add headings, paragraphs, or any text content",
    icon: Type,
    color: "text-blue-600",
  },
  {
    type: "image" as const,
    name: "Image",
    description: "Upload or link to profile photos and images",
    icon: ImageIcon,
    color: "text-green-600",
  },
  {
    type: "button" as const,
    name: "Button",
    description: "Interactive buttons with custom links",
    icon: MousePointer,
    color: "text-purple-600",
  },
  {
    type: "social-links" as const,
    name: "Social Links",
    description: "Connect your social media profiles",
    icon: Share2,
    color: "text-pink-600",
  },
  {
    type: "bio" as const,
    name: "Bio Section",
    description: "Tell your story with a formatted bio",
    icon: FileText,
    color: "text-orange-600",
  },
  {
    type: "skills" as const,
    name: "Skills",
    description: "Showcase your skills and expertise",
    icon: Award,
    color: "text-indigo-600",
  },
]

export function ComponentLibrary({ onAddComponent }: ComponentLibraryProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Components</h2>
        <p className="text-sm text-muted-foreground mt-1">Drag components to build your profile</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {componentTypes.map((component) => {
          const IconComponent = component.icon
          return (
            <Card
              key={component.type}
              className="cursor-pointer hover:shadow-md transition-shadow bg-sidebar-primary border-sidebar-border"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${component.color}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sidebar-primary-foreground text-sm">{component.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{component.description}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3 w-full text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                      onClick={() => onAddComponent(component.type)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground text-center">
          <p>Click components to add them to your profile</p>
        </div>
      </div>
    </div>
  )
}
