import type { ProfileData } from "../../../../types/bio"
import { TemplatesPanel } from "./panels/templates-panel"
import { ContentPanel } from "./panels/content-panel"
import { BackgroundPanel } from "./panels/background-panel"
import { StylePanel } from "./panels/style-panel"
import { SettingsPanel } from "./panels/settings-panel"
import { useState } from "react"
import { LeftSidebar } from "./left-sidebar"
import { useMedia } from "use-media";

interface RightPanelProps {
  activePanel: "templates" | "content" | "background" | "style" | "settings"
  profileData: ProfileData
  onUpdateProfile: (updates: Partial<ProfileData>) => void
  onUpdateElement: (elementId: string, content: any) => void
}

export function RightPanel({
  activePanel,
  profileData,
  onUpdateProfile,
  onUpdateElement,
}: RightPanelProps) {
  const handleApplyTemplate = (template: ProfileData) => {
    onUpdateProfile(template)
  }

  const isDesktop = useMedia({ minWidth: "768px" })
  const [activePanelMB, setActivePanelMB] = useState<
    "templates" | "content" | "background" | "style" | "settings"
  >("content")

  // Chọn panel phù hợp theo thiết bị
  const currentPanel = isDesktop ? activePanel : activePanelMB

  return (
    <div className="relative w-full pt-16 md:w-80 lg:w-96 bg-card border-l border-border h-[90vh] flex flex-col bg-white">
      {/* Nội dung panel có scroll */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
        {currentPanel === "templates" && (
          <TemplatesPanel onApplyTemplate={handleApplyTemplate} />
        )}
        {currentPanel === "content" && (
          <ContentPanel
            profileData={profileData}
            onUpdateProfile={onUpdateProfile}
            onUpdateElement={onUpdateElement}
          />
        )}
        {currentPanel === "background" && (
          <BackgroundPanel
            profileData={profileData}
            onUpdateProfile={onUpdateProfile}
            onUpdateElement={onUpdateElement}
          />
        )}
        {currentPanel === "style" && (
          <StylePanel
            profileData={profileData}
            onUpdateProfile={onUpdateProfile}
          />
        )}
        {currentPanel === "settings" && (
          <SettingsPanel
            profileData={profileData}
            onUpdateProfile={onUpdateProfile}
          />
        )}
      </div>

      {/* Sidebar chỉ hiện trên mobile và luôn nằm ở cuối */}
      {!isDesktop && (
        <div className="sticky bottom-0 left-0 right-0 bg-card border-t border-border z-10">
          <LeftSidebar
            activePanel={activePanelMB}
            onPanelChange={setActivePanelMB}
          />
        </div>
      )}
    </div>
  )
}
