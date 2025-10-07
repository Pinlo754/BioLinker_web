"use client"

import type { ProfileData } from "../../../../../types/bio"
import { Label } from "../../../../../components/ui/label"
import { Input } from "../../../../../components/ui/input"
import { Textarea } from "../../../../../components/ui/textarea"
import { Button } from "../../../../../components/ui/button"
import { Switch } from "../../../../../components/ui/switch"

interface SettingsPanelProps {
  profileData: ProfileData
  onUpdateProfile: (updates: Partial<ProfileData>) => void
}

export function SettingsPanel({ profileData, onUpdateProfile }: SettingsPanelProps) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Settings</h2>

      {/* Text Style */}
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Text style</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Customize how your website will look when shared on social media
        </p>
      </div>

      {/* Thumbnail */}
      <div className="mb-6">
        <Label className="mb-2 block">
          Thumbnail <span className="text-muted-foreground text-xs">(recommended size 1200x630px)</span>
        </Label>
        <div className="flex gap-3">
          <div className="w-32 h-20 bg-muted rounded-lg" />
          <Button variant="outline" className="flex-1 bg-transparent">
            Add Image
          </Button>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <Label htmlFor="meta-title" className="mb-2 block">
          Title
        </Label>
        <Input
          id="meta-title"
          placeholder="Enter title"
          value={profileData.settings.metaTitle}
          onChange={(e) =>
            onUpdateProfile({
              settings: { ...profileData.settings, metaTitle: e.target.value },
            })
          }
        />
      </div>

      {/* Description */}
      <div className="mb-8">
        <Label htmlFor="meta-description" className="mb-2 block">
          Description
        </Label>
        <Textarea
          id="meta-description"
          placeholder="Enter Description"
          rows={4}
          value={profileData.settings.metaDescription}
          onChange={(e) =>
            onUpdateProfile({
              settings: { ...profileData.settings, metaDescription: e.target.value },
            })
          }
        />
      </div>

      {/* Cookie Collection */}
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold mb-2">Cookie Collection</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Some regional laws require website owners to inform visitors of cookie tracking.
        </p>
        <div className="flex items-center justify-between">
          <Label htmlFor="cookie-banner">Enable cookie collection banner</Label>
          <Switch
            id="cookie-banner"
            checked={profileData.settings.cookieBanner}
            onCheckedChange={(checked) =>
              onUpdateProfile({
                settings: { ...profileData.settings, cookieBanner: checked },
              })
            }
          />
        </div>
      </div>
    </div>
  )
}
