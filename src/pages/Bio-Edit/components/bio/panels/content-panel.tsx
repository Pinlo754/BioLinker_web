"use client"

import { type ProfileData, type LayoutElement, getContentValue } from "../../../page"
import { Button } from "../../../../../components/ui/button"
import { Input } from "../../../../../components/ui/input"
import { Label } from "../../../../../components/ui/label"
import { Textarea } from "../../../../../components/ui/textarea"
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface ContentPanelProps {
  profileData: ProfileData
  onUpdateProfile: (updates: Partial<ProfileData>) => void
  onUpdateElement: (elementId: string, content: any) => void
}

export function ContentPanel({ profileData, onUpdateProfile, onUpdateElement }: ContentPanelProps) {
  const [expandedElement, setExpandedElement] = useState<string | null>(null)

  const addElement = (type: LayoutElement["type"]) => {
    const newElement: LayoutElement = {
      id: `${type}-${Date.now()}`,
      type,
      content: type === "link" ? { text: "New Link", url: "#" } : { value: "" },
      position: {
        x: 30,
        y: 10,
        width: 40,
        zIndex: profileData.elements.length + 1,
      },
      alignment: "center",
      visible: true,
    }
    onUpdateProfile({
      elements: [...profileData.elements, newElement],
    })
  }

  const deleteElement = (id: string) => {
  onUpdateProfile({
    elements: profileData.elements.filter((el: LayoutElement) => el.id !== id),
  })
}

const toggleVisibility = (id: string) => {
  onUpdateProfile({
    elements: profileData.elements.map((el: LayoutElement) =>
      el.id === id ? { ...el, visible: !el.visible } : el
    ),
  })
}

const updateElement = (id: string, updates: Partial<LayoutElement>) => {
  onUpdateProfile({
    elements: profileData.elements.map((el: LayoutElement) =>
      el.id === id ? { ...el, ...updates } : el
    ),
  })
}


  const getElementLabel = (element: LayoutElement) => {
    switch (element.type) {
      case "background":
        return "Background"
      case "avatar":
        return "Avatar"
      case "name":
        return `Name: ${getContentValue(element.content) || "Empty"}`
      case "title":
        return `Title: ${getContentValue(element.content) || "Empty"}`
      case "bio":
        return "Bio"
      case "divider":
        return "Divider"
      case "link":
        return `Link: ${getContentValue(element.content) || "Empty"}`
      default:
        return element.type
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Edit Content</h2>

      <div className="mb-6">
        <Label className="mb-3 block">Add Elements</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={() => addElement("link")}>
            <Plus className="w-4 h-4 mr-2" />
            Link
          </Button>
          <Button variant="outline" size="sm" onClick={() => addElement("bio")}>
            <Plus className="w-4 h-4 mr-2" />
            Bio
          </Button>
          <Button variant="outline" size="sm" onClick={() => addElement("divider")}>
            <Plus className="w-4 h-4 mr-2" />
            Divider
          </Button>
          <Button variant="outline" size="sm" onClick={() => addElement("avatar")}>
            <Plus className="w-4 h-4 mr-2" />
            Avatar
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="block mb-2">Elements</Label>
        {profileData.elements.map((element:any) => (
          <div key={element.id} className="bg-muted rounded-lg overflow-hidden">
            <div
              className="flex items-center gap-3 p-4 hover:bg-accent transition-colors group cursor-pointer"
              onClick={() => setExpandedElement(expandedElement === element.id ? null : element.id)}
            >
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
              <span className="flex-1 text-sm font-medium truncate">{getElementLabel(element)}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleVisibility(element.id)
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {element.visible ? (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteElement(element.id)
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
              {expandedElement === element.id ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>

            {expandedElement === element.id && (
              <div className="p-4 pt-0 space-y-3 border-t border-border">
                {element.type === "name" && (
                  <div>
                    <Label htmlFor={`name-${element.id}`}>Name</Label>
                    <Input
                      id={`name-${element.id}`}
                      value={element.content.value || ""}
                      onChange={(e) => updateElement(element.id, { content: { value: e.target.value } })}
                      placeholder="Your name"
                    />
                  </div>
                )}

                {element.type === "title" && (
                  <div>
                    <Label htmlFor={`title-${element.id}`}>Title</Label>
                    <Input
                      id={`title-${element.id}`}
                      value={element.content.value || ""}
                      onChange={(e) => updateElement(element.id, { content: { value: e.target.value } })}
                      placeholder="Your title"
                    />
                  </div>
                )}

                {element.type === "bio" && (
                  <div>
                    <Label htmlFor={`bio-${element.id}`}>Bio</Label>
                    <Textarea
                      id={`bio-${element.id}`}
                      value={element.content.value || ""}
                      onChange={(e) => updateElement(element.id, { content: { value: e.target.value } })}
                      placeholder="Tell us about yourself"
                      rows={3}
                    />
                  </div>
                )}

                {element.type === "avatar" && (
                  <div>
                    <Label htmlFor={`avatar-${element.id}`}>Avatar URL</Label>
                    <Input
                      id={`avatar-${element.id}`}
                      value={element.content.value || ""}
                      onChange={(e) => updateElement(element.id, { content: { value: e.target.value } })}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                )}

                {element.type === "link" && (
                  <>
                    <div>
                      <Label htmlFor={`text-${element.id}`}>Button Text</Label>
                      <Input
                        id={`text-${element.id}`}
                        value={element.content.text || ""}
                        onChange={(e) =>
                          updateElement(element.id, {
                            content: { ...element.content, text: e.target.value },
                          })
                        }
                        placeholder="Button text"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`url-${element.id}`}>URL</Label>
                      <Input
                        id={`url-${element.id}`}
                        value={element.content.url || ""}
                        onChange={(e) =>
                          updateElement(element.id, {
                            content: { ...element.content, url: e.target.value },
                          })
                        }
                        placeholder="https://example.com"
                      />
                    </div>
                  </>
                )}

                <div className="pt-3 border-t border-border">
                  <Label className="mb-2 block text-xs text-muted-foreground">Position & Size</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`width-${element.id}`} className="text-xs">
                        Width (%)
                      </Label>
                      <Input
                        id={`width-${element.id}`}
                        type="number"
                        min="0"
                        max="100"
                        value={element.position.width}
                        onChange={(e) =>
                          updateElement(element.id, {
                            position: { ...element.position, width: Number(e.target.value) },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor={`zindex-${element.id}`} className="text-xs">
                        Z-Index
                      </Label>
                      <Input
                        id={`zindex-${element.id}`}
                        type="number"
                        value={element.position.zIndex}
                        onChange={(e) =>
                          updateElement(element.id, {
                            position: { ...element.position, zIndex: Number(e.target.value) },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
