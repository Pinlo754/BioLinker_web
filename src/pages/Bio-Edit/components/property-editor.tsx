"use client";

import { useState } from "react";
import type { LayoutElement } from "../../../types/bio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings, Plus, X } from "lucide-react";

interface PropertyEditorProps {
  selectedComponent: LayoutElement | null;
  onUpdateComponent: (id: string, updates: Partial<LayoutElement>) => void;
}

export function PropertyEditor({
  selectedComponent,
  onUpdateComponent,
}: PropertyEditorProps) {
  const [newSkill, setNewSkill] = useState("");
  const [newSocialPlatform, setNewSocialPlatform] = useState("");
  const [newSocialUrl, setNewSocialUrl] = useState("");

  if (!selectedComponent) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            Properties
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select a component to edit its properties
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Settings className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No component selected</p>
          </div>
        </div>
      </div>
    );
  }

  // --- helpers ---
  const updateContent = (updates: Record<string, any>) => {
    const current =
      typeof selectedComponent.content === "object"
        ? selectedComponent.content
        : {};
    onUpdateComponent(selectedComponent.id, {
      content: { ...current, ...updates },
    });
  };

  const updateStyle = (updates: Record<string, any>) => {
    onUpdateComponent(selectedComponent.id, {
      styles: { ...(selectedComponent.styles || {}), ...updates },
    });
  };

  // --- skills ---
  const addSkill = () => {
    if (newSkill.trim()) {
      const skills =
        (typeof selectedComponent.content === "object" &&
          selectedComponent.content.skills) ||
        [];
      updateContent({ skills: [...skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const skills =
      (typeof selectedComponent.content === "object" &&
        selectedComponent.content.skills) ||
      [];
    updateContent({
      skills: skills.filter((_: string, i: number) => i !== index),
    });
  };

  // --- social links ---
  const addSocialLink = () => {
    if (newSocialPlatform && newSocialUrl.trim()) {
      const links =
        (typeof selectedComponent.content === "object" &&
          selectedComponent.content.links) ||
        [];
      updateContent({
        links: [
          ...links,
          { platform: newSocialPlatform, url: newSocialUrl.trim() },
        ],
      });
      setNewSocialPlatform("");
      setNewSocialUrl("");
    }
  };

  const removeSocialLink = (index: number) => {
    const links =
      (typeof selectedComponent.content === "object" &&
        selectedComponent.content.links) ||
      [];
    updateContent({ links: links.filter((_: any, i: number) => i !== index) });
  };

  const style = selectedComponent.styles || {};

  // --- render ---
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-semibold text-sidebar-foreground">
          Properties
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Editing: <span className="font-medium">{selectedComponent.type}</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedComponent.type === "text" && (
              <div>
                <Label htmlFor="text-content">Text</Label>
                <Textarea
                  id="text-content"
                  value={
                    (typeof selectedComponent.content === "object" &&
                      selectedComponent.content.text) ||
                    ""
                  }
                  onChange={(e) => updateContent({ text: e.target.value })}
                  placeholder="Enter your text..."
                  className="mt-1"
                />
              </div>
            )}

            {selectedComponent.type === "image" && (
              <>
                <div>
                  <Label htmlFor="image-src">Image URL</Label>
                  <Input
                    id="image-src"
                    value={
                      (typeof selectedComponent.content === "object" &&
                        selectedComponent.content.src) ||
                      ""
                    }
                    onChange={(e) => updateContent({ src: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="image-alt">Alt Text</Label>
                  <Input
                    id="image-alt"
                    value={
                      (typeof selectedComponent.content === "object" &&
                        selectedComponent.content.value) ||
                      ""
                    }
                    onChange={(e) => updateContent({ alt: e.target.value })}
                    placeholder="Describe the image"
                    className="mt-1"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === "button" && (
              <>
                <div>
                  <Label htmlFor="button-text">Button Text</Label>
                  <Input
                    id="button-text"
                    value={
                      (typeof selectedComponent.content === "object" &&
                        selectedComponent.content.text) ||
                      ""
                    }
                    onChange={(e) => updateContent({ text: e.target.value })}
                    placeholder="Click me"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="button-link">Link URL</Label>
                  <Input
                    id="button-link"
                    value={
                      (typeof selectedComponent.content === "object" &&
                        selectedComponent.content.url) ||
                      ""
                    }
                    onChange={(e) => updateContent({ link: e.target.value })}
                    placeholder="https://example.com"
                    className="mt-1"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === "bio" && (
              <div>
                <Label htmlFor="bio-text">Bio Text</Label>
                <Textarea
                  id="bio-text"
                  value={
                    (typeof selectedComponent.content === "object" &&
                      selectedComponent.content.text) ||
                    ""
                  }
                  onChange={(e) => updateContent({ text: e.target.value })}
                  placeholder="Tell us about yourself..."
                  className="mt-1"
                  rows={4}
                />
              </div>
            )}

            {selectedComponent.type === "skills" && (
              <div>
                <Label>Skills</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {(typeof selectedComponent.content === "object" &&
                      selectedComponent.content.skills?.map(
                        (skill: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {skill}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 w-4 h-4"
                              onClick={() => removeSkill(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Badge>
                        )
                      )) ||
                      null}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    />
                    <Button onClick={addSkill} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {selectedComponent.type === "link" && (
              <div>
                <Label>Social Links</Label>
                <div className="mt-2 space-y-2">
                  {(typeof selectedComponent.content === "object" &&
                    selectedComponent.content.links?.map(
                      (link: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 border rounded"
                        >
                          <span className="text-sm font-medium capitalize">
                            {link.platform}
                          </span>
                          <span className="text-sm text-muted-foreground flex-1 truncate">
                            {link.url}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1"
                            onClick={() => removeSocialLink(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      )
                    )) ||
                    null}
                  <div className="space-y-2">
                    <Select
                      value={newSocialPlatform}
                      onValueChange={setNewSocialPlatform}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="github">GitHub</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Input
                        value={newSocialUrl}
                        onChange={(e) => setNewSocialUrl(e.target.value)}
                        placeholder="https://..."
                      />
                      <Button onClick={addSocialLink} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Separator />

        {/* Styling */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Styling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="font-size">Font Size</Label>
                <Input
                  id="font-size"
                  value={style.fontSize || ""}
                  onChange={(e) => updateStyle({ fontSize: e.target.value })}
                  placeholder="16px"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="text-color">Text Color</Label>
                <Input
                  id="text-color"
                  type="color"
                  value={style.color || "#374151"}
                  onChange={(e) => updateStyle({ color: e.target.value })}
                  className="mt-1 h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bg-color">Background</Label>
                <Input
                  id="bg-color"
                  type="color"
                  value={style.backgroundColor || "#ffffff"}
                  onChange={(e) =>
                    updateStyle({ backgroundColor: e.target.value })
                  }
                  className="mt-1 h-10"
                />
              </div>
              <div>
                <Label htmlFor="border-radius">Border Radius</Label>
                <Input
                  id="border-radius"
                  value={style.borderRadius || ""}
                  onChange={(e) =>
                    updateStyle({ borderRadius: e.target.value })
                  }
                  placeholder="8px"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                value={style.padding || ""}
                onChange={(e) => updateStyle({ padding: e.target.value })}
                placeholder="12px"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Position & Size */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Position & Size</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pos-x">X Position</Label>
                <Input
                  id="pos-x"
                  type="number"
                  value={selectedComponent.position.x}
                  onChange={(e) =>
                    onUpdateComponent(selectedComponent.id, {
                      position: {
                        ...selectedComponent.position,
                        x: Number(e.target.value) || 0,
                      },
                    })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="pos-y">Y Position</Label>
                <Input
                  id="pos-y"
                  type="number"
                  value={selectedComponent.position.y}
                  onChange={(e) =>
                    onUpdateComponent(selectedComponent.id, {
                      position: {
                        ...selectedComponent.position,
                        y: Number(e.target.value) || 0,
                      },
                    })
                  }
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  type="number"
                  value={selectedComponent.size?.width}
                  onChange={(e) =>
                    onUpdateComponent(selectedComponent.id, {
                      size: {
                        width: selectedComponent.size?.width ?? 100, // mặc định 100 nếu undefined
                        height: Number(e.target.value) || 50,
                      },
                    })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="number"
                  value={selectedComponent.size?.height}
                  onChange={(e) =>
                    onUpdateComponent(selectedComponent.id, {
                      size: {
                        width: selectedComponent.size?.width ?? 100,
                        height: Number(e.target.value) || 50,
                      },
                    })
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
