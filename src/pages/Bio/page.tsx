"use client";

import { useEffect, useState } from "react";
import { ProfileData } from "../../types/bio";
import ProfileRenderer from "./components/profile";
import axios from "axios";
import { useParams } from "react-router-dom";

export const getContentValue = (content: any) => {
  if (typeof content === "object" && content.value) return content.value;
  if (typeof content === "object" && content.text) return content.text;
  return String(content || "");
};

export default function Page() {
  const params = useParams();
  const userId = params?.userId as string; // lấy userId từ URL /bio/[userId]

  const [loading, setLoading] = useState(true);

  const [mockData] = useState<ProfileData>({
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
        content: { value: "Full-Stack Developer" },
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
        content: {
          value:
            "Hi! My name is Phong.\nI am a Developer and this is my profile.",
        },
        position: { x: 50, y: 42, width: 80, zIndex: 5 },
        size: { width: 280, height: 80 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-1",
        type: "link",
        content: {
          text: "INSTAGRAM",
          url: "https://www.instagram.com/pinlo_754/",
          icon: "/instagram.png",
        },
        position: { x: 50, y: 55, width: 90, zIndex: 5 },
        size: { width: 320, height: 40 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-2",
        type: "link",
        content: {
          text: "FACEBOOK",
          url: "https://www.facebook.com/PhongPinlo",
          icon: "/facebook.svg",
        },
        position: { x: 50, y: 62, width: 90, zIndex: 5 },
        size: { width: 320, height: 40 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-3",
        type: "link",
        content: {
          text: "TIKTOK",
          url: "https://www.tiktok.com/@pinlo754?lang=vi-VN",
          icon: "/tiktok.svg",
        },
        position: { x: 50, y: 69, width: 90, zIndex: 5 },
        size: { width: 320, height: 40 },
        alignment: "center",
        visible: true,
      },
      {
        id: "link-4",
        type: "link",
        content: {
          text: "YOUTUBE",
          url: "https://www.youtube.com/@pinlo1826",
          icon: "/youtube.svg",
        },
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

  const [profileData, setProfileData] = useState<ProfileData>(mockData);
  useEffect(() => {
    console.log("Fetching profile for userId:", userId);
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://68e6641521dd31f22cc56979.mockapi.io/template"
        );
        if (Array.isArray(res.data)) {
          // tìm user có userId trùng khớp
          const matched = res.data.find((item: any) => item.userId === userId);
          if (matched && matched.profileData) {
            setProfileData(matched.profileData);
          } else {
            console.warn("Không tìm thấy profile cho userId:", userId);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchProfile();
  }, []);

  return (
    <div className="w-screen h-screen m-0 p-0 overflow-hidden">
      <ProfileRenderer profileData={profileData} />
    </div>
  );
}
