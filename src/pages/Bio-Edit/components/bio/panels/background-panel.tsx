"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../../../components/ui/tabs";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { ProfileData, LayoutElement } from "../../../../../types/bio";
import upload from "../../../../../lib/upload";
import { Button } from "../../../../../components/ui/button";
import { LuUpload } from "react-icons/lu";

interface BackgroundPanelProps {
  profileData: ProfileData;
  onUpdateProfile: (updates: Partial<ProfileData>) => void;
  onUpdateElement: (elementId: string, content: any) => void;
}

export function BackgroundPanel({
  profileData,
  onUpdateProfile,
  onUpdateElement,
}: BackgroundPanelProps) {
  const backgrounds = [
    { id: 1, type: "gradient", url: "/green-gradient.png" },
    { id: 2, type: "gradient", url: "/blue-gradient.png" },
    { id: 3, type: "image", url: "/marble-texture.png" },
    { id: 4, type: "image", url: "/vietnam-landmark.jpg" },
    { id: 5, type: "image", url: "/mountain-vista.png" },
  ];

  const solidColors = [
    "#ffffff",
    "#f5f5f5",
    "#e5e5e5",
    "#d4d4d4",
    "#000000",
    "#1a1a1a",
    "#2d3748",
    "#4a5568",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#ef4444",
    "#f97316",
  ];

  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  ];

  const backgroundElement = profileData.elements.find(
    (el: LayoutElement) => el.type === "background"
  );

  const updateBackground = (value: string) => {
  if (backgroundElement) {
    const updatedContent =
      typeof backgroundElement.content === "object"
        ? { ...backgroundElement.content, value }
        : { value };

    onUpdateElement(backgroundElement.id, updatedContent);
  }
};


  const currentBackground =
    typeof backgroundElement?.content === "string"
      ? backgroundElement.content
      : backgroundElement?.content.value || "#ffffff";

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Background</h2>

      <Tabs defaultValue="image" className="mb-6">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="image">Image</TabsTrigger>
          <TabsTrigger value="color">Color</TabsTrigger>
          <TabsTrigger value="gradient">Gradient</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="image" className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-9" />
            </div>
            <Select defaultValue="ai">
              <SelectTrigger className="w-32 ml-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai">AI</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {backgrounds.map((bg) => (
              <button
                key={bg.id}
                onClick={() => updateBackground(bg.url)}
                className={`relative aspect-[3/2] rounded-lg overflow-hidden border-2 transition-colors ${
                  currentBackground === bg.url
                    ? "border-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={bg.url || "/placeholder.svg"}
                  alt="Background"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="color" className="mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="custom-color">Custom Color</Label>
              <div className="flex gap-3 mt-2">
                <Input
                  id="custom-color"
                  type="color"
                  value={
                    currentBackground.startsWith("#")
                      ? currentBackground
                      : "#ffffff"
                  }
                  onChange={(e) => updateBackground(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  value={
                    currentBackground.startsWith("#")
                      ? currentBackground
                      : "#ffffff"
                  }
                  onChange={(e) => updateBackground(e.target.value)}
                  className="flex-1"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div>
              <Label>Preset Colors</Label>
              <div className="grid grid-cols-8 gap-2 mt-2">
                {solidColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateBackground(color)}
                    className={`w-full aspect-square rounded-lg border-2 transition-all ${
                      currentBackground === color
                        ? "border-primary scale-110"
                        : "border-border hover:border-primary/50"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gradient" className="mt-6">
          <div>
            <Label>Gradient Presets</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {gradients.map((gradient, index) => (
                <button
                  key={index}
                  onClick={() => updateBackground(gradient)}
                  className={`h-20 rounded-lg border-2 transition-all ${
                    currentBackground === gradient
                      ? "border-primary scale-105"
                      : "border-border hover:border-primary/50"
                  }`}
                  style={{ background: gradient }}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="mt-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="bg-url">Background Image URL</Label>
              <div className="flex w-full gap-1">
              <Input
                id="bg-url"
                value={
                  currentBackground.startsWith("http") ||
                  currentBackground.startsWith("/")
                    ? currentBackground
                    : ""
                }
                onChange={(e) => updateBackground(e.target.value)}
                placeholder="https://example.com/image.jpg hoặc /local-image.jpg"
                className="focus:ring-2 focus:ring-[#16C875] transition-all duration-200 w-[80%]"
              />

              {/* Nút chọn ảnh từ máy */}
              <Button
                type="button"
                variant="outline"
                className="w-[15%] text-sm"
                onClick={() => document.getElementById("bg-file")?.click()}
              >
                {LuUpload({ className: "w-5 h-5 text-gray-600" })}
              </Button>
              </div>
              

              <input
                id="bg-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const fileUrl = await upload(file); // upload(file) phải trả về URL ảnh
                    updateBackground(fileUrl);
                  }
                }}
              />

              {/* Hiển thị ảnh xem trước */}
              {currentBackground && (
                <img
                  src={currentBackground}
                  alt="Background preview"
                  className="w-full h-32 object-cover rounded-lg mt-2 border"
                />
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Enter a URL to an image or upload your own image to use as
              background
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
