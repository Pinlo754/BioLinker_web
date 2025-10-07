"use client";

import {
  getContentValue,
  LayoutElement,
  ProfileData,
} from "../../../../../types/bio";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { Textarea } from "../../../../../components/ui/textarea";
import {
  Plus,
  GripVertical,
  Trash2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";

interface ContentPanelProps {
  profileData: ProfileData;
  onUpdateProfile: (updates: Partial<ProfileData>) => void;
  onUpdateElement: (elementId: string, content: any) => void;
}

export function ContentPanel({
  profileData,
  onUpdateProfile,
}: ContentPanelProps) {
  const [expandedElement, setExpandedElement] = useState<string | null>(null);

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
    };
    onUpdateProfile({
      elements: [...profileData.elements, newElement],
    });
  };

  const deleteElement = (id: string) => {
    onUpdateProfile({
      elements: profileData.elements.filter(
        (el: LayoutElement) => el.id !== id
      ),
    });
  };

  const toggleVisibility = (id: string) => {
    onUpdateProfile({
      elements: profileData.elements.map((el: LayoutElement) =>
        el.id === id ? { ...el, visible: !el.visible } : el
      ),
    });
  };

  const updateElement = (id: string, updates: Partial<LayoutElement>) => {
    onUpdateProfile({
      elements: profileData.elements.map((el: LayoutElement) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    });
  };

  const getElementLabel = (element: LayoutElement) => {
    switch (element.type) {
      case "background":
        return "Background";
      case "avatar":
        return "Avatar";
      case "name":
        return `Name: ${getContentValue(element.content) || "Empty"}`;
      case "title":
        return `Title: ${getContentValue(element.content) || "Empty"}`;
      case "bio":
        return "Bio";
      case "divider":
        return "Divider";
      case "link":
        return `Link: ${getContentValue(element.content) || "Empty"}`;
      default:
        return element.type;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Edit Content</h2>

      <div className="mb-6">
        <Label className="mb-3 block">Add Elements</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => addElement("link")}
            className="bg-gradient-to-r from-[#16C875] to-[#6CDFAB] hover:scale-105 transition-transform duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Link
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addElement("bio")}
            className="bg-gradient-to-r from-[#16C875] to-[#6CDFAB] hover:scale-105 transition-transform duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Bio
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addElement("divider")}
            className="bg-gradient-to-r from-[#16C875] to-[#6CDFAB] hover:scale-105 transition-transform duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Divider
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addElement("avatar")}
            className="bg-gradient-to-r from-[#16C875] to-[#6CDFAB] hover:scale-105 transition-transform duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Avatar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addElement("background")}
            className="bg-gradient-to-r from-[#16C875] to-[#6CDFAB] hover:scale-105 transition-transform duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Background
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="block mb-2">Elements</Label>
        {profileData.elements.map((element: any) => (
          <div key={element.id} className="bg-muted rounded-lg overflow-hidden">
            <div
              className="flex items-center gap-3 p-4 hover:bg-accent transition-colors group cursor-pointer"
              onClick={() =>
                setExpandedElement(
                  expandedElement === element.id ? null : element.id
                )
              }
            >
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
              <span className="flex-1 text-sm font-medium truncate">
                {getElementLabel(element)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisibility(element.id);
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
                  e.stopPropagation();
                  deleteElement(element.id);
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
                {["name", "title", "bio"].includes(element.type) && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`${element.type}-${element.id}`}>
                        {element.type.charAt(0).toUpperCase() +
                          element.type.slice(1)}
                      </Label>

                      {element.type === "bio" ? (
                        <Textarea
                          id={`${element.type}-${element.id}`}
                          value={element.content.value || ""}
                          onChange={(e) =>
                            updateElement(element.id, {
                              content: {
                                ...element.content,
                                value: e.target.value,
                              },
                            })
                          }
                          placeholder={`Enter your ${element.type}`}
                          rows={3}
                          className="focus:ring-2 focus:ring-[#16C875] transition-all duration-200"
                        />
                      ) : (
                        <Input
                          id={`${element.type}-${element.id}`}
                          value={element.content.value || ""}
                          onChange={(e) =>
                            updateElement(element.id, {
                              content: {
                                ...element.content,
                                value: e.target.value,
                              },
                            })
                          }
                          placeholder={`Enter your ${element.type}`}
                          className="focus:ring-2 focus:ring-[#16C875] transition-all duration-200"
                        />
                      )}
                    </div>

                    {/* Text Color */}
                    <div>
                      <Label htmlFor={`${element.type}-color-${element.id}`}>
                        Text Color
                      </Label>
                      <input
                        type="color"
                        id={`${element.type}-color-${element.id}`}
                        value={element.content.textColor || "#000000"}
                        onChange={(e) =>
                          updateElement(element.id, {
                            content: {
                              ...element.content,
                              textColor: e.target.value,
                            },
                          })
                        }
                        className="w-full h-10 p-1 border rounded-md cursor-pointer"
                      />
                    </div>

                    {/* Font Size */}
                    <div>
                      <Label
                        htmlFor={`${element.type}-font-size-${element.id}`}
                      >
                        Font Size (px)
                      </Label>
                      <input
                        type="number"
                        id={`${element.type}-font-size-${element.id}`}
                        min={8}
                        max={72}
                        value={element.content.fontSize || 16}
                        onChange={(e) =>
                          updateElement(element.id, {
                            content: {
                              ...element.content,
                              fontSize: parseInt(e.target.value, 10),
                            },
                          })
                        }
                        className="w-full h-10 p-2 border rounded-md focus:ring-2 focus:ring-[#16C875] transition-all duration-200"
                      />
                    </div>

                    {/* Font Weight */}
                    <div>
                      <Label
                        htmlFor={`${element.type}-font-weight-${element.id}`}
                      >
                        Font Weight
                      </Label>
                      <select
                        id={`${element.type}-font-weight-${element.id}`}
                        value={element.content.fontWeight || "normal"}
                        onChange={(e) =>
                          updateElement(element.id, {
                            content: {
                              ...element.content,
                              fontWeight: e.target.value,
                            },
                          })
                        }
                        className="w-full h-10 p-2 border rounded-md bg-gradient-to-r from-[#16C875] to-[#6CDFAB] hover:scale-105 transition-transform duration-200"
                      >
                        <option value="100" className="font-thin">
                          Thin
                        </option>
                        <option value="300" className="font-light">
                          Light
                        </option>
                        <option value="400" className="font-normal">
                          Normal
                        </option>
                        <option value="500" className="font-medium">
                          Medium
                        </option>
                        <option value="600" className="font-semibold">
                          Semi-Bold
                        </option>
                        <option value="700" className="font-bold">
                          Bold
                        </option>
                        <option value="900" className="font-black">
                          Black
                        </option>
                      </select>
                    </div>

                    {/* Font Family */}
                    <div>
                      <Label
                        htmlFor={`${element.type}-font-family-${element.id}`}
                      >
                        Font Family
                      </Label>
                      <select
                        id={`${element.type}-font-family-${element.id}`}
                        value={element.content.fontFamily || "sans-serif"}
                        onChange={(e) =>
                          updateElement(element.id, {
                            content: {
                              ...element.content,
                              fontFamily: e.target.value,
                            },
                          })
                        }
                        className="w-full h-10 p-2 border rounded-md bg-gradient-to-r from-[#16C875] to-[#6CDFAB] hover:scale-105 transition-transform duration-200"
                      >
                        <option className="font-sans" value="sans-serif">
                          Sans Serif
                        </option>
                        <option className="font-serif" value="serif">
                          Serif
                        </option>
                        <option className="font-mono" value="monospace">
                          Monospace
                        </option>
                        <option className="[font-family:cursive]" value="cursive">
                          Cursive
                        </option>
                        <option className="[font-family:fantasy]" value="fantasy">
                          Fantasy
                        </option>
                        <option
                          className="[font-family:'Poppins',sans-serif]"
                          value="Poppins, sans-serif"
                        >
                          Poppins
                        </option>
                        <option
                          className="[font-family:'Roboto',sans-serif]"
                          value="Roboto, sans-serif"
                        >
                          Roboto
                        </option>
                      </select>
                    </div>
                  </div>
                )}

                {element.type === "avatar" && (
                  <div>
                    <Label htmlFor={`avatar-${element.id}`}>Avatar URL</Label>
                    <Input
                      id={`avatar-${element.id}`}
                      value={element.content.value || ""}
                      onChange={(e) =>
                        updateElement(element.id, {
                          content: { value: e.target.value },
                        })
                      }
                      placeholder="https://example.com/avatar.jpg"
                      className="focus:ring-2 focus:ring-[#16C875] transition-all duration-200"
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
                            content: {
                              ...element.content,
                              text: e.target.value,
                            },
                          })
                        }
                        placeholder="Button text"
                        className="focus:ring-2 focus:ring-[#16C875] transition-all duration-200"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div>
                        <Label htmlFor={`url-${element.id}`}>URL</Label>
                        <Input
                          id={`url-${element.id}`}
                          value={element.content.url || ""}
                          onChange={(e) =>
                            updateElement(element.id, {
                              content: {
                                ...element.content,
                                url: e.target.value,
                              },
                            })
                          }
                          placeholder="https://example.com"
                          className="focus:ring-2 focus:ring-[#16C875] transition-all duration-200"
                        />
                      </div>
                      <div className="w-[40%] overflow-hidden">
                        <Label htmlFor={`social-${element.id}`}>Social</Label>
                        <Select
                          value={element.content.social || ""}
                          onValueChange={(value) =>
                            updateElement(element.id, {
                              content: { ...element.content, social: value },
                            })
                          }
                        >
                          <SelectTrigger
                            id={`social-${element.id}`}
                            className="w-full bg-gradient-to-r from-[#16C875] to-[#6CDFAB] hover:scale-105 transition-transform duration-200"
                          >
                            <SelectValue placeholder="Social" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="facebook">
                              <div className="flex items-center gap-2">
                                <img
                                  src="/facebook.png"
                                  alt="Facebook"
                                  className="w-4 h-4"
                                />
                                <span>Facebook</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="instagram">
                              <div className="flex items-center gap-2">
                                <img
                                  src="/instagram.svg"
                                  alt="Instagram"
                                  className="w-4 h-4"
                                />
                                <span>Instagram</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="tiktok">
                              <div className="flex items-center gap-2">
                                <img
                                  src="/tiktok.svg"
                                  alt="Instagram"
                                  className="w-4 h-4"
                                />
                                <span>TikTok</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="youtube">
                              <div className="flex items-center gap-2">
                                <img
                                  src="/youtube.svg"
                                  alt="YouTube"
                                  className="w-4 h-4"
                                />
                                <span>YouTube</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="twitter">
                              <div className="flex items-center gap-2">
                                <img src="/x.svg" alt="Twitter" className="w-4 h-4" />
                                <span>X</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-3 border-t border-border">
                  <Label className="mb-2 block text-xs text-muted-foreground">
                    Position & Size
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label
                        htmlFor={`width-${element.id}`}
                        className="text-xs"
                      >
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
                            position: {
                              ...element.position,
                              width: Number(e.target.value),
                            },
                          })
                        }
                        className="focus:ring-2 focus:ring-[#16C875] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`zindex-${element.id}`}
                        className="text-xs"
                      >
                        Z-Index
                      </Label>
                      <Input
                        id={`zindex-${element.id}`}
                        type="number"
                        value={element.position.zIndex}
                        onChange={(e) =>
                          updateElement(element.id, {
                            position: {
                              ...element.position,
                              zIndex: Number(e.target.value),
                            },
                          })
                        }
                        className="focus:ring-2 focus:ring-[#16C875] transition-all duration-200"
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
  );
}
