"use client";

import { useState}  from "react";
import { ProfileData } from "../../types/bio";
import ProfileRenderer from "./components/profile";
import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";

export const getContentValue = (content: any) => {
  if (typeof content === "object" && content.value) return content.value;
  if (typeof content === "object" && content.text) return content.text;
  return String(content || "");
};



export default function Page() {
  const [profileData] = useState<ProfileData>({
  "layoutMode": "absolute",
  "elements": [
    {
      "id": "bg-1",
      "type": "background",
      "content": {
        "value": "/mountain-vista.png"
      },
      "position": {
        "x": 0,
        "y": 0,
        "width": 100,
        "height": 192,
        "zIndex": 0
      },
      "size": {
        "width": 360,
        "height": 192
      },
      "visible": true
    },
    {
      "id": "avatar-1",
      "type": "avatar",
      "content": {
        "value": "/avatar.png"
      },
      "position": {
        "x": 50,
        "y": 15,
        "width": 28,
        "zIndex": 10
      },
      "size": {
        "width": 100,
        "height": 100
      },
      "alignment": "center",
      "visible": true
    },
    {
      "id": "name-1",
      "type": "name",
      "content": {
        "value": "Thanh Phong"
      },
      "position": {
        "x": 50,
        "y": 30,
        "width": 100,
        "zIndex": 5
      },
      "size": {
        "width": 300,
        "height": 40
      },
      "alignment": "center",
      "visible": true
    },
    {
      "id": "title-1",
      "type": "title",
      "content": {
        "value": "Banhmixiumai owner"
      },
      "position": {
        "x": 50,
        "y": 35,
        "width": 100,
        "zIndex": 5
      },
      "size": {
        "width": 300,
        "height": 30
      },
      "alignment": "center",
      "visible": true
    },
    {
      "id": "divider-1",
      "type": "divider",
      "content": {},
      "position": {
        "x": 50,
        "y": 38,
        "width": 8,
        "zIndex": 5
      },
      "size": {
        "width": 80,
        "height": 2
      },
      "alignment": "center",
      "visible": true
    },
    {
      "id": "bio-1",
      "type": "bio",
      "content": {
        "value": "Hi! My name is Phong.\nI am a Banhmixiumai owner."
      },
      "position": {
        "x": 50,
        "y": 42,
        "width": 80,
        "zIndex": 5
      },
      "size": {
        "width": 280,
        "height": 80
      },
      "alignment": "center",
      "visible": true
    },
    {
      "id": "link-1",
      "type": "link",
      "content": {
        "text": "WEBSITE",
        "url": "#"
      },
      "position": {
        "x": 50,
        "y": 55,
        "width": 90,
        "zIndex": 5
      },
      "size": {
        "width": 320,
        "height": 40
      },
      "alignment": "center",
      "visible": true
    },
    {
      "id": "link-2",
      "type": "link",
      "content": {
        "text": "PORTFOLIO",
        "url": "#"
      },
      "position": {
        "x": 50,
        "y": 62,
        "width": 90,
        "zIndex": 5
      },
      "size": {
        "width": 320,
        "height": 40
      },
      "alignment": "center",
      "visible": true
    },
    {
      "id": "link-3",
      "type": "link",
      "content": {
        "text": "ABOUT ME",
        "url": "#"
      },
      "position": {
        "x": 50,
        "y": 69,
        "width": 90,
        "zIndex": 5
      },
      "size": {
        "width": 320,
        "height": 40
      },
      "alignment": "center",
      "visible": true
    },
    {
      "id": "link-4",
      "type": "link",
      "content": {
        "text": "MY STORE",
        "url": "#"
      },
      "position": {
        "x": 50,
        "y": 76,
        "width": 90,
        "zIndex": 5
      },
      "size": {
        "width": 320,
        "height": 40
      },
      "alignment": "center",
      "visible": true
    },
    {
      "id": "link-5",
      "type": "link",
      "content": {
        "text": "CONTACT ME",
        "url": "#"
      },
      "position": {
        "x": 50,
        "y": 83,
        "width": 90,
        "zIndex": 5
      },
      "size": {
        "width": 320,
        "height": 40
      },
      "alignment": "center",
      "visible": true
    }
  ],
  "globalStyles": {
    "buttonStyle": "rounded",
    "buttonColor": "#2d3748",
    "iconColor": "#2d3748",
    "textStyles": {
      "titles": "font-bold text-2xl",
      "headings": "font-semibold text-xl",
      "paragraphs": "text-sm",
      "buttons": "font-medium text-sm"
    }
  },
  "settings": {
    "thumbnail": "",
    "metaTitle": "",
    "metaDescription": "",
    "cookieBanner": false
  }
});

  return (
    <div className="w-screen h-screen m-0 p-0 overflow-hidden">
    <ProfileRenderer profileData={profileData} />
  </div>
  );
}
