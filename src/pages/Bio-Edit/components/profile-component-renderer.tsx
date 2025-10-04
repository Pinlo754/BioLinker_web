"use client";

import { getContentValue, type LayoutElement } from "../page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Linkedin, Github, Instagram, Globe } from "lucide-react";

interface ProfileComponentRendererProps {
  component: LayoutElement;
}

export function ProfileComponentRenderer({
  component,
}: ProfileComponentRendererProps) {
  const { type, content, styles } = component;

  const baseStyles = {
    fontSize: styles?.fontSize || "16px",
    color: styles?.color || "#374151",
    backgroundColor: styles?.backgroundColor || "transparent",
    borderRadius: styles?.borderRadius || "8px",
    padding: styles?.padding || "12px",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  switch (type) {
    case "text":
      return (
        <div style={baseStyles} className="text-balance">
          {getContentValue(component.content) || "Your text here"}
        </div>
      );

    case "image":
      return (
        <div
          style={{ ...baseStyles, padding: "0" }}
          className="overflow-hidden"
        >
          <img
            src={
              getContentValue(component.content) ||
              "/placeholder.svg?height=200&width=200&query=profile photo"
            }
            alt={getContentValue(component.content) || "Profile image"}
            width={200}
            height={200}
            className="w-full h-full object-cover"
            style={{ borderRadius: styles?.borderRadius || "8px" }}
          />
        </div>
      );

    case "button":
      return (
        <div style={{ ...baseStyles, padding: "0" }}>
          <Button
            className="w-full h-full"
            style={{
              backgroundColor: styles?.backgroundColor || "#15803d",
              color: styles?.color || "#ffffff",
              borderRadius: styles?.borderRadius || "8px",
            }}
          >
            {getContentValue(component.content) || "Click me"}
          </Button>
        </div>
      );
    case "link":
      const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
          case "twitter":
            return Twitter;
          case "linkedin":
            return Linkedin;
          case "github":
            return Github;
          case "instagram":
            return Instagram;
          default:
            return Globe;
        }
      };

      const links = (typeof content === "object" && content?.links) || [];

      return (
        <div style={{ ...baseStyles, gap: "8px", flexWrap: "wrap" }}>
          {links.map((link, index) => {
            const IconComponent = getSocialIcon(link.platform);
            return (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent"
                onClick={() => window.open(link.url, "_blank")}
              >
                <IconComponent className="w-4 h-4" />
                {link.platform}
              </Button>
            );
          })}
        </div>
      );

    case "bio":
      return (
        <Card style={{ ...baseStyles, padding: "0" }}>
          <CardContent className="p-4">
            <p className="text-sm leading-relaxed text-pretty">
              {getContentValue(component.content) ||
                "Tell us about yourself..."}
            </p>
          </CardContent>
        </Card>
      );

    case "skills":
      const skills = (typeof content === "object" && content?.skills) || [];

      return (
        <div style={{ ...baseStyles, gap: "8px", flexWrap: "wrap" }}>
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      );

    default:
      return <div style={baseStyles}>Unknown component type: {type}</div>;
  }
}
