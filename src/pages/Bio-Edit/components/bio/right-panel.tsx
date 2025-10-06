import type { ProfileData } from "../../page"
import { TemplatesPanel } from "./panels/templates-panel"
import { ContentPanel } from "./panels/content-panel"
import { BackgroundPanel } from "./panels/background-panel"
import { StylePanel } from "./panels/style-panel"
import { SettingsPanel } from "./panels/settings-panel"

interface RightPanelProps {
  activePanel: "templates" | "content" | "background" | "style" | "settings"
  profileData: ProfileData
  onUpdateProfile: (updates: Partial<ProfileData>) => void
  onUpdateElement: (elementId: string, content: any) => void
}

export function RightPanel({ activePanel, profileData, onUpdateProfile, onUpdateElement }: RightPanelProps) {
  const handleApplyTemplate = (template: ProfileData) => {
    onUpdateProfile(template)
  }

  return (
    <div className="w-96 bg-card border-l border-border overflow-y-auto">
      {activePanel === "templates" && <TemplatesPanel onApplyTemplate={handleApplyTemplate} />}
      {activePanel === "content" && (
        <ContentPanel profileData={profileData} onUpdateProfile={onUpdateProfile} onUpdateElement={onUpdateElement} />
      )}
      {activePanel === "background" && (
        <BackgroundPanel
          profileData={profileData}
          onUpdateProfile={onUpdateProfile}
          onUpdateElement={onUpdateElement}
        />
      )}
      {activePanel === "style" && <StylePanel profileData={profileData} onUpdateProfile={onUpdateProfile} />}
      {activePanel === "settings" && <SettingsPanel profileData={profileData} onUpdateProfile={onUpdateProfile} />}
    </div>
  )
}
