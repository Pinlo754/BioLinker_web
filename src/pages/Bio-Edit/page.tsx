"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Settings,
  Smartphone,
  Monitor,
  Download,
  Upload,
  Save,
} from "lucide-react";
import { LeftSidebar } from "./components/bio/left-sidebar";
import { MobilePreview } from "./components/bio/mobile-preview";
import { RightPanel } from "./components/bio/right-panel";
import Header from "../../components/sections/Header";
import { ProfileData, LayoutElement } from "@/types/bio";
import TemplateModal from "./components/template-modal";
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
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const userName = user?.customerDomain || "";

    if (!userName) {
      alert("Vui lòng đăng nhập trước khi publish!");
      return;
    }

    try {
      // 1️⃣ Kiểm tra userName đã tồn tại chưa
      const getRes = await axios.get(
        `https://68e6641521dd31f22cc56979.mockapi.io/template?userName=${userName}`
      );

      const existingData = getRes.data;
      if (existingData.length > 0) {
        const oldId = existingData[0].id;
        await axios.delete(
          `https://68e6641521dd31f22cc56979.mockapi.io/template/${oldId}`
        );
      }

      // 3️⃣ Tạo mới (ghi đè)
      const payload = { userName, profileData };
      await axios.post(
        "https://68e6641521dd31f22cc56979.mockapi.io/template",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Publish thành công!");
    } catch (error: any) {
      console.error("Publish error:", error.response?.data || error.message);
      alert("Lỗi khi publish profile!");
    }
  };

  const [activePanel, setActivePanel] = useState<
    "templates" | "content" | "background" | "style" | "settings"
  >("content");
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");

  const [profileData, setProfileData] = useState<ProfileData>(() => {
    // Nếu trong sessionStorage đã có dữ liệu trước đó thì lấy lại
    const saved = sessionStorage.getItem("profileData");
    return saved
      ? JSON.parse(saved)
      : {
          layoutMode: "flex-vertical",
          elements: [
            {
              id: "background-1761132455488",
              type: "background",
              content: {
                value: "#ffffff",
              },
              position: {
                x: 30,
                y: 10,
                width: 40,
                zIndex: 6,
              },
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
        };
  });

  useEffect(() => {
    sessionStorage.setItem("profileData", JSON.stringify(profileData));
  }, [profileData]);

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

  // ---- Tutorial Overlay ----
  const [showTutorial, setShowTutorial] = useState<boolean>(() => {
    const beginner = localStorage.getItem("isBeginner");
    return beginner === null || beginner === "true"; // nếu chưa có hoặc = true thì hiển thị
  });

  const handleNeverRemind = async () => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) return;
      const user = JSON.parse(userString);

      // Gọi API PUT để set isBeginner = false
      const response = await fetch(`https://yourapi.com/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, isBeginner: false }),
      });

      if (!response.ok) throw new Error("Cập nhật thất bại");

      // Cập nhật lại localStorage và ẩn tutorial
      const updatedUser = { ...user, isBeginner: false };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setShowTutorial(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  const [step, setStep] = useState(0); // bước hiện tại

  // Danh sách hình ảnh hướng dẫn
  const tutorialImages = [
    "/Trial1.png",
    "/Trial2.png",
    "/Trial3.png",
    "/Trial4.png",
    "/Trial5.png",
    "/Trial6.png",
    "/Trial7.png",
  ];

  const handleNextStep = () => {
    if (step < tutorialImages.length - 1) {
      setStep(step + 1);
    } else {
      // Khi hết bước cuối → tắt hướng dẫn
      handleSkipTutorial();
    }
  };

  const handlePreviosStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSkipTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("isBeginner", "false");
  };

  const [TemplateId, setTemplateId] = useState("");

  const createTemplateId = async () => {};
  // Hàm post dữ liệu template lên API backend
  const handleSaveTemplate = async (templateId: string) => {
    try {
      if (!profileData.elements.length) {
        alert("Chưa có element nào để lưu!");
        return;
      }

      // Map dữ liệu FE sang body API
      const payload = profileData.elements.map((el, index) => ({
        templateId: templateId,
        elementType: el.type,
        position: {
          x: el.position.x,
          y: el.position.y,
          width: el.position.width,
          height: el.position.height || 0,
          zIndex: el.position.zIndex,
        },
        size: {
          width: el.size?.width || el.position.width,
          height: el.size?.height || el.position.height || 0,
        },
        style: {
          fontSize: el.styles?.fontSize || 14,
          fontWeight: el.styles?.fontWeight || "normal",
          color: el.styles?.color || "#000000",
          backgroundColor: el.styles?.backgroundColor || "#ffffff",
          borderRadius: el.styles?.borderRadius || 0,
          padding: el.styles?.padding || 0,
        },
        element: {
          text: el.content?.text || el.content?.value || "",
          url: el.content?.url || "",
          imageUrl: el.content?.src || el.content?.imageUrl || "",
          skills: el.content?.skills || [],
        },
        orderIndex: index,
      }));

      console.log("Payload gửi đi:", payload);

      // Gửi POST
      const res = await axios.post(
        "https://yourapi.com/api/template-data", // 🔹 thay bằng API thật của bạn
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Kết quả:", res.data);
      alert("Lưu template thành công!");
    } catch (error: any) {
      console.error(
        "Lỗi khi lưu template:",
        error.response?.data || error.message
      );
      alert("Lỗi khi lưu template!");
    }
  };

  const [showTemplateModal, setShowTemplateModal] = useState(false);
  // Hàm mở modal
  const handleOpenTemplateModal = () => {
    setShowTemplateModal(true);
  };

  // Khi tạo thành công
  const handleTemplateCreated = async (templateId: string) => {
    // Gọi hàm lưu layout
    await handleSaveTemplate(templateId);
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
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenTemplateModal}
            >
              <Save className="w-4 h-4 mr-2" />
              Tạo Template
            </Button>
            {showTemplateModal && (
              <TemplateModal
                onClose={() => setShowTemplateModal(false)}
                onTemplateCreated={handleTemplateCreated}
              />
            )}
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

      {showTutorial && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center text-center text-white p-4">
          <img
            src={tutorialImages[step]}
            alt={`Step ${step + 1}`}
            className="max-w-[80%] max-h-[70%] rounded-lg shadow-lg mb-6"
          />

          <div className="flex gap-4">
            <Button
              variant="secondary"
              onClick={handlePreviosStep}
              disabled={step === 0}
              className={`${
                step > 0
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Trước
            </Button>
            <Button
              variant="secondary"
              onClick={handleNextStep}
              className="bg-white text-black hover:bg-gray-200"
            >
              {step < tutorialImages.length - 1 ? "Next" : "Finish"}
            </Button>
            <Button
              variant="outline"
              onClick={handleSkipTutorial}
              className="text-white border-white hover:bg-white/20"
            >
              Skip
            </Button>
          </div>
          <Button
            onClick={() => {
              handleSkipTutorial();
              handleNeverRemind();
            }}
            className="mt-2 bg-gray-300 hover:bg-gray-400 text-black"
          >
            Không nhắc lại
          </Button>
        </div>
      )}
    </div>
  );
}
