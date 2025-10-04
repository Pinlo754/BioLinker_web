"use client"

import { Input } from "../../../../../components/ui/input"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "../../../../../components/ui/tabs"
import type { LayoutElement, ProfileData } from "../../../page"

const TEMPLATES: ProfileData[] = [
  {
    layoutMode: "flex-vertical",
    elements: [
      {
        id: "bg-1",
        type: "background",
        content: { value: "/mountain-vista.png" },
        position: { x: 0, y: 0, width: 100, height: 192, zIndex: 0 },
        visible: true,
      },
      {
        id: "avatar-1",
        type: "avatar",
        content: { value: "/professional-headshot.png" },
        position: { x: 50, y: 15, width: 28, zIndex: 10 },
        alignment: "center",
        visible: true,
      },
      {
        id: "name-1",
        type: "name",
        content: { value: "Thanh Phong" },
        position: { x: 50, y: 30, width: 100, zIndex: 5 },
        alignment: "center",
        visible: true,
      },
      {
        id: "title-1",
        type: "title",
        content: { value: "Banhmixiumai owner" },
        position: { x: 50, y: 35, width: 100, zIndex: 5 },
        alignment: "center",
        visible: true,
      },
      {
        id: "divider-1",
        type: "divider",
        content: {},
        position: { x: 50, y: 38, width: 8, zIndex: 5 },
        alignment: "center",
        visible: true,
      },
      {
        id: "bio-1",
        type: "bio",
        content: { value: "Hi! My name is Phong.\nI am a Banhmixiumai owner." },
        position: { x: 50, y: 42, width: 80, zIndex: 5 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-1",
        type: "link",
        content: { text: "WEBSITE", url: "#" },
        position: { x: 50, y: 55, width: 90, zIndex: 5 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-2",
        type: "link",
        content: { text: "PORTFOLIO", url: "#" },
        position: { x: 50, y: 62, width: 90, zIndex: 5 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-3",
        type: "link",
        content: { text: "ABOUT ME", url: "#" },
        position: { x: 50, y: 69, width: 90, zIndex: 5 },
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
      metaTitle: "Thanh Phong - Banhmixiumai owner",
      metaDescription: "Hi! My name is Phong. I am a Banhmixiumai owner.",
      cookieBanner: false,
    },
  },
  {
    layoutMode: "flex-vertical",
    elements: [
      {
        id: "bg-2",
        type: "background",
        content: { value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
        position: { x: 0, y: 0, width: 100, height: 192, zIndex: 0 },
        visible: true,
      },
      {
        id: "avatar-2",
        type: "avatar",
        content: { value: "/placeholder.svg?height=200&width=200" },
        position: { x: 50, y: 15, width: 28, zIndex: 10 },
        alignment: "center",
        visible: true,
      },
      {
        id: "name-2",
        type: "name",
        content: { value: "Creative Designer" },
        position: { x: 50, y: 30, width: 100, zIndex: 5 },
        alignment: "center",
        visible: true,
      },
      {
        id: "title-2",
        type: "title",
        content: { value: "UI/UX Designer" },
        position: { x: 50, y: 35, width: 100, zIndex: 5 },
        alignment: "center",
        visible: true,
      },
      {
        id: "bio-2",
        type: "bio",
        content: { value: "Passionate about creating beautiful digital experiences." },
        position: { x: 50, y: 42, width: 80, zIndex: 5 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-21",
        type: "link",
        content: { text: "Portfolio", url: "#" },
        position: { x: 50, y: 55, width: 90, zIndex: 5 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-22",
        type: "link",
        content: { text: "Dribbble", url: "#" },
        position: { x: 50, y: 62, width: 90, zIndex: 5 },
        alignment: "center",
        visible: true,
      },
    ],
    globalStyles: {
      buttonStyle: "pill",
      buttonColor: "#667eea",
      iconColor: "#667eea",
      textStyles: {
        titles: "font-bold text-3xl",
        headings: "font-semibold text-xl",
        paragraphs: "text-base",
        buttons: "font-semibold text-sm",
      },
    },
    settings: {
      thumbnail: "",
      metaTitle: "Creative Designer Portfolio",
      metaDescription: "Passionate about creating beautiful digital experiences.",
      cookieBanner: true,
    },
  },
  {
    layoutMode: "absolute",
    elements: [
      {
        id: "bg-3",
        type: "background",
        content: { value: "#f5f5f5" },
        position: { x: 0, y: 0, width: 100, height: 192, zIndex: 0 },
        visible: true,
      },
      {
        id: "name-3",
        type: "name",
        content: { value: "Minimal Pro" },
        position: { x: 20, y: 25, width: 60, zIndex: 5 },
        alignment: "left",
        visible: true,
      },
      {
        id: "title-3",
        type: "title",
        content: { value: "Interior Designer" },
        position: { x: 20, y: 30, width: 60, zIndex: 5 },
        alignment: "left",
        visible: true,
      },
      {
        id: "avatar-3",
        type: "avatar",
        content: { value: "/placeholder.svg?height=200&width=200" },
        position: { x: 75, y: 20, width: 20, zIndex: 10 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-31",
        type: "link",
        content: { text: "ABOUT", url: "#" },
        position: { x: 50, y: 55, width: 90, zIndex: 5 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-32",
        type: "link",
        content: { text: "PORTFOLIO", url: "#" },
        position: { x: 50, y: 62, width: 90, zIndex: 5 },
        alignment: "center",
        visible: true,
      },
    ],
    globalStyles: {
      buttonStyle: "square",
      buttonColor: "#000000",
      iconColor: "#000000",
      textStyles: {
        titles: "font-light text-2xl",
        headings: "font-normal text-lg",
        paragraphs: "text-sm",
        buttons: "font-normal text-sm uppercase tracking-wider",
      },
    },
    settings: {
      thumbnail: "",
      metaTitle: "Minimal Pro - Interior Designer",
      metaDescription: "Less is more. Creating spaces that inspire.",
      cookieBanner: false,
    },
  },
]

interface TemplatesPanelProps {
  onApplyTemplate?: (template: ProfileData) => void
}

export function TemplatesPanel({ onApplyTemplate }: TemplatesPanelProps) {
  const getContentValue = (el: LayoutElement) => {
  return typeof el.content === "string" ? el.content : el.content.value
}

const getTemplateName = (template: ProfileData) => {
  const nameElement = template.elements.find((el) => el.type === "name")
  return nameElement ? getContentValue(nameElement) : "Untitled"
}

const getTemplateTitle = (template: ProfileData) => {
  const titleElement = template.elements.find((el) => el.type === "title")
  return titleElement ? getContentValue(titleElement) : ""
}

const getTemplateBackground = (template: ProfileData): string => {
  const bgElement = template.elements.find((el) => el.type === "background")
  if (!bgElement) return "#ffffff"

  if (typeof bgElement.content === "string") {
    return bgElement.content
  }

  return bgElement.content?.value ?? "#ffffff"
}

const getTemplateLinks = (template: ProfileData) => {
  return template.elements.filter((el) => el.type === "link").slice(0, 3)
}


  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-9" />
        </div>
        <Select defaultValue="ai">
          <SelectTrigger className="w-40 ml-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ai">AI-Generated</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="recent">Recent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">
            All
          </TabsTrigger>
          <TabsTrigger value="biochat" className="flex-1">
            BioChat
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 gap-4">
        {TEMPLATES.map((template, index) => {
          const background = getTemplateBackground(template)
          return (
            <button
              key={index}
              onClick={() => onApplyTemplate?.(template)}
              className="relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-colors group"
            >
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-4"
                style={{
                  background: background.startsWith("linear-gradient")
                    ? background
                    : background.startsWith("#")
                      ? background
                      : `url(${background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 w-full">
                  <div className="text-center mb-3">
                    <h3 className="font-bold text-sm">{getTemplateName(template)}</h3>
                    <p className="text-xs text-muted-foreground">{getTemplateTitle(template)}</p>
                  </div>
                  <div className="space-y-1">
                    {getTemplateLinks(template).map((link: any) => (
                      <div
                        key={link.id}
                        className="text-xs py-1 px-2 rounded text-center"
                        style={{
                          backgroundColor: template.globalStyles.buttonColor,
                          color: "#fff",
                          borderRadius:
                            template.globalStyles.buttonStyle === "pill"
                              ? "9999px"
                              : template.globalStyles.buttonStyle === "square"
                                ? "4px"
                                : "8px",
                        }}
                      >
                        {link.content.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
