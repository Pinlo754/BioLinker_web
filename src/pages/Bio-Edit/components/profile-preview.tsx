"use client"

import { getContentValue, type LayoutElement } from "../page"
import { ProfileComponentRenderer } from "../components/profile-component-renderer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Download, ExternalLink } from "lucide-react"

interface ProfilePreviewProps {
  components: LayoutElement[]
}

export function ProfilePreview({ components }: ProfilePreviewProps) {
  const handleShare = () => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(window.location.href)
    // You could add a toast notification here
  }

  const handleExport = () => {
    // In a real app, this would export the profile as HTML/PDF
    const profileData = JSON.stringify(components, null, 2)
    const blob = new Blob([profileData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "profile-data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Preview Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Profile Preview</h2>
            <p className="text-sm text-muted-foreground">This is how your profile will look to visitors</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in New Tab
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex justify-center p-8">
        <div className="w-full max-w-4xl">
          {components.length === 0 ? (
            <Card className="p-12">
              <CardContent className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No Components Added</h3>
                <p className="text-muted-foreground">Switch back to edit mode to add components to your profile.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden min-h-[600px]">
              {/* Render all components in their positions */}
              {components.map((component) => (
                <div
                  key={component.id}
                  className="absolute"
                  style={{
                    left: component.position.x,
                    top: component.position.y,
                    width: component.size?.width,
                    height: component.size?.height,
                  }}
                >
                  <ProfileComponentRenderer component={component} />
                </div>
              ))}
            </div>
          )}

          {/* Profile Stats */}
          {components.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{components.length}</div>
                  <div className="text-sm text-muted-foreground">Components</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {components.filter((c) => c.type === "link").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Social Links</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {components
                      .filter((c) => c.type === "skills")
                      .reduce((acc, c) => acc + (getContentValue(c.content)?.length || 0), 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Skills</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
