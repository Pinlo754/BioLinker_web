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
  const userName = params?.userName as string;

  const [loading, setLoading] = useState(true);

  const [mockData] = useState<ProfileData>({
          layoutMode: "flex-vertical",
          elements: [],
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
    console.log("Fetching profile for userId:", userName);
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://68e6641521dd31f22cc56979.mockapi.io/template"
        );
        if (Array.isArray(res.data)) {
          // tìm user có userId trùng khớp
          const matched = res.data.find((item: any) => item.userName === userName);
          if (matched && matched.profileData) {
            setProfileData(matched.profileData);
          } else {
            console.warn("Không tìm thấy profile cho userId:", userName);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userName) fetchProfile();
  }, []);

  return (
    <div className="w-screen h-screen m-0 p-0 overflow-hidden">
      <ProfileRenderer profileData={profileData} />
    </div>
  );
}
