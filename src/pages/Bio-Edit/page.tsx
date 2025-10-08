"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Settings, Smartphone, Monitor, Download, Upload } from "lucide-react";
import { LeftSidebar } from "./components/bio/left-sidebar";
import { MobilePreview } from "./components/bio/mobile-preview";
import { RightPanel } from "./components/bio/right-panel";
import Header from "../../components/sections/Header";
import { ProfileData, LayoutElement } from "@/types/bio";
import axios from "axios";
// ---- Component chính ----
export default function BioBuilder() {
  const updateElementSize = (
    elementId: string,
    size: { width: number; height: number }
  ) => {
    setProfileData((prev) => ({
      ...prev,
      elements: prev.elements.map((el) =>
        el.id === elementId ? { ...el, size } : el
      ),
    }));
  };

  const handlePublish = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Vui lòng đăng nhập trước khi publish!");
      return;
    }

    try {
      const payload = {
        userId,
        profileData,
      };

      const res = await axios.post(
        "https://68e6641521dd31f22cc56979.mockapi.io//template",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );     
    } catch (error: any) {
      console.error("Publish error:", error.response?.data || error.message);
      alert("Lỗi khi publish profile!");
    }
  };

  const [activePanel, setActivePanel] = useState<
    "templates" | "content" | "background" | "style" | "settings"
  >("content");
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");

  const [profileData, setProfileData] = useState<ProfileData>({
    layoutMode: "flex-vertical",
    elements: [
      {
        id: "bg-1",
        type: "background",
        content: { value: "/mountain-vista.png" },
        position: { x: 0, y: 0, width: 100, height: 192, zIndex: 0 },
        size: { width: 360, height: 192 },
        visible: true,
      },
      {
        id: "avatar-1",
        type: "avatar",
        content: { value: "/avatar.png" },
        position: { x: 50, y: 15, width: 28, zIndex: 10 },
        size: { width: 100, height: 100 },
        alignment: "center",
        visible: true,
      },
      {
        id: "name-1",
        type: "name",
        content: { value: "Thanh Phong" },
        position: { x: 50, y: 30, width: 100, zIndex: 5 },
        size: { width: 300, height: 40 },
        alignment: "center",
        visible: true,
      },
      {
        id: "title-1",
        type: "title",
        content: { value: "Banhmixiumai owner" },
        position: { x: 50, y: 35, width: 100, zIndex: 5 },
        size: { width: 300, height: 30 },
        alignment: "center",
        visible: true,
      },
      {
        id: "divider-1",
        type: "divider",
        content: {},
        position: { x: 50, y: 38, width: 8, zIndex: 5 },
        size: { width: 80, height: 2 },
        alignment: "center",
        visible: true,
      },
      {
        id: "bio-1",
        type: "bio",
        content: { value: "Hi! My name is Phong.\nI am a Banhmixiumai owner." },
        position: { x: 50, y: 42, width: 80, zIndex: 5 },
        size: { width: 280, height: 80 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-1",
        type: "link",
        content: { text: "INSTAGRAM", url: "#", icon: "/instagram.png" },
        position: { x: 50, y: 55, width: 90, zIndex: 5 },
        size: { width: 320, height: 40 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-2",
        type: "link",
        content: { text: "FACEBOOK", url: "#", icon: "/facebook.svg" },
        position: { x: 50, y: 62, width: 90, zIndex: 5 },
        size: { width: 320, height: 40 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-3",
        type: "link",
        content: { text: "TIKTOK", url: "#", icon: "/tiktok.svg" },
        position: { x: 50, y: 69, width: 90, zIndex: 5 },
        size: { width: 320, height: 40 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-4",
        type: "link",
        content: { text: "YOUTUBE", url: "#", icon: "/youtube.svg" },
        position: { x: 50, y: 76, width: 90, zIndex: 5 },
        size: { width: 320, height: 40 },
        alignment: "center",
        visible: true,
      },
    ],
    globalStyles: {
      buttonStyle: "rounded",
      buttonColor: "#2d3748",
      iconColor: "#2d3748",
      textStyles: {
        titles: "font-bold text-2xl",
        headings: "font-semibold text-xl",
        paragraphs: "text-sm",
        buttons: "font-medium text-sm",
      },
    },
    settings: {
      thumbnail: "",
      metaTitle: "",
      metaDescription: "",
      cookieBanner: false,
    },
  });

  // ---- Update helpers ----
  const updateProfileData = (updates: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...updates }));
  };

  const updateElementPosition = (
    elementId: string,
    position: Partial<LayoutElement["position"]>
  ) => {
    setProfileData((prev) => ({
      ...prev,
      elements: prev.elements.map((el) =>
        el.id === elementId
          ? { ...el, position: { ...el.position, ...position } }
          : el
      ),
    }));
  };

  const updateElementContent = (elementId: string, content: any) => {
    setProfileData((prev) => ({
      ...prev,
      elements: prev.elements.map((el) =>
        el.id === elementId ? { ...el, content } : el
      ),
    }));
  };

  const reorderElements = (startIndex: number, endIndex: number) => {
    const newElements = Array.from(profileData.elements);
    const [removed] = newElements.splice(startIndex, 1);
    newElements.splice(endIndex, 0, removed);
    updateProfileData({ elements: newElements });
  };

  // ---- Import/Export ----
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(profileData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bio-profile-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedData = JSON.parse(event.target?.result as string);
            setProfileData(importedData);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            alert("Invalid JSON file");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // ---- Render ----
  return (
    <div className="h-screen flex flex-col  mt-14">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col items-center bg-background p-8 overflow-auto">
          {/* Toggle mobile/desktop */}
          <div className="mb-6 flex items-center gap-2 bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                viewMode === "mobile" ? "bg-card shadow-sm" : "hover:bg-card/50"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-sm font-medium">Mobile</span>
            </button>
            <button
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                viewMode === "desktop"
                  ? "bg-card shadow-sm"
                  : "hover:bg-card/50"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="text-sm font-medium">Desktop</span>
            </button>
            <Button variant="outline" size="sm" onClick={handlePublish}>
              <Upload className="w-4 h-4 mr-2" />
              Publish
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportJSON}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <MobilePreview
            profileData={profileData}
            viewMode={viewMode}
            onReorder={reorderElements}
            onUpdatePosition={updateElementPosition}
          />
        </div>
        <LeftSidebar activePanel={activePanel} onPanelChange={setActivePanel} />
        <RightPanel
          activePanel={activePanel}
          profileData={profileData}
          onUpdateProfile={updateProfileData}
          onUpdateElement={updateElementContent}
        />
      </div>
    </div>
  );
}
