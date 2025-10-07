// src/types/profile.ts
export type LayoutElement = {
  id: string;
  type:
    | "background"
    | "avatar"
    | "name"
    | "title"
    | "bio"
    | "divider"
    | "link"
    | "text"
    | "image"
    | "button"
    | "skills";
  content: any;
  position: {
    x: number;
    y: number;
    width: number;
    height?: number;
    zIndex: number;
  };
  size?: {
    width: number;
    height: number;
  };
  alignment?: "left" | "right" | "center" | "justify";
  visible: boolean;
  styles?: {
    fontSize?: number;
    fontWeight?: "normal" | "bold";
    color?: string;
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
  };
};

export type ProfileData = {
  layoutMode: "absolute" | "flex-vertical" | "flex-horizontal";
  elements: LayoutElement[];
  globalStyles: {
    buttonStyle: string;
    buttonColor: string;
    iconColor: string;
    textStyles: {
      titles: string;
      headings: string;
      paragraphs: string;
      buttons: string;
    };
  };
  settings: {
    thumbnail: string;
    metaTitle: string;
    metaDescription: string;
    cookieBanner: boolean;
  };
};

export type LayoutContent =
  | string
  | {
      src?: string;
      href?: string;
      text?: string;
      value?: string;
      url?: string;
      links?: { platform: string; url: string }[];
      skills?: string[];
    };


export type ContentBlock = {
  id: string;
  type: "text" | "image-gallery" | "link" | "social-links";
  content: any;
};

export function getContentValue(content: LayoutContent): string {
  if (typeof content === "string") {
    return content;
  }

  // Ưu tiên theo thứ tự giá trị hay dùng
  return (
    content.value ||
    content.text ||
    content.src ||
    content.url ||
    content.href ||
    ""
  );
}