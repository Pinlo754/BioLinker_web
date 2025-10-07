import React from "react";
import { ProfileData, LayoutElement, getContentValue } from "../../../types/bio";
import { get } from "http";


interface Props {
  profileData: ProfileData;
  className?: string;
}

export default function ProfileRenderer({ profileData, className }: Props) {
  const isAbsolute = profileData.layoutMode === "absolute";

  const sorted = [...profileData.elements].sort(
    (a, b) => (a.position?.zIndex ?? 0) - (b.position?.zIndex ?? 0)
  );

  const getTextStyle = (el: LayoutElement): React.CSSProperties => ({
    color: el.content?.textColor ?? "#111",
    fontSize: el.content?.fontSize ? `${el.content.fontSize}px` : undefined,
    fontWeight: el.content?.fontWeight ?? undefined,
    fontFamily: el.content?.fontFamily ?? undefined,
    textAlign: el.alignment ?? "left",
  });

  const renderAbsolute = (el: LayoutElement) => {
    const style: React.CSSProperties = {
      position: "absolute",
      left: `${el.position.x}%`,
      top: `${el.position.y}%`,
      width: `${el.position.width}%`,
      zIndex: el.position.zIndex,
      transform: el.alignment === "center" ? "translateX(-50%)" : undefined,
      textAlign: (el.alignment ?? "left") as React.CSSProperties["textAlign"],
    };

    switch (el.type) {
      case "background":
        return (
          <img
            key={el.id}
            src={getContentValue(el.content) || "/placeholder.svg"}
            alt="background"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: el.position.zIndex,
            }}
          />
        );

      case "avatar":
        return (
          <div key={el.id} style={style} className="flex justify-center items-center">
            <div
              style={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "9999px",
                overflow: "hidden",
                border: "4px solid white",
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={getContentValue(el.content) || "/avatar.png"}
                alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        );

      case "name":
        return (
          <div key={el.id} style={style}>
            <h1 className={`${profileData.globalStyles?.textStyles?.titles ?? "text-2xl font-bold"}`} style={getTextStyle(el)}>
              {getContentValue(el.content)}
            </h1>
          </div>
        );

      case "title":
        return (
          <div key={el.id} style={style}>
            <p className={`${profileData.globalStyles?.textStyles?.headings ?? "text-sm font-semibold text-gray-600"}`} style={getTextStyle(el)}>
              {getContentValue(el.content)}
            </p>
          </div>
        );

      case "divider":
        return (
          <div key={el.id} style={style}>
            <div style={{ height: 2, width: "100%", backgroundColor: "#111" }} />
          </div>
        );

      case "bio":
        return (
          <div key={el.id} style={style}>
            <p
              className={`${profileData.globalStyles?.textStyles?.paragraphs ?? "text-sm text-gray-700"}`}
              style={{ ...getTextStyle(el), whiteSpace: "pre-line", lineHeight: 1.5 }}
              
            >
              {getContentValue(el.content)}
            </p>
          </div>
        );

      case "link":
  return (
    <div key={el.id} style={style}>
      <a
        href={(el.content && el.content.url) || "#"}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-transform hover:scale-105 ${
          profileData.globalStyles?.buttonStyle ?? "rounded-lg"
        }`}
        style={{
          backgroundColor: profileData.globalStyles?.buttonColor ?? "#2d3748",
          color: "#fff",
          textDecoration: "none",
          padding: "10px 18px",
          borderRadius:
            profileData.globalStyles?.buttonStyle === "pill" ? 9999 : 8,
        }}
      >
        {/* Hiển thị icon nếu có */}
        {el.content?.icon && (
          <img
            src={el.content.icon}
            alt="icon"
            className="w-5 h-5 object-contain"
            loading="lazy"
          />
        )}

        {/* Hiển thị text */}
        <span>{getContentValue(el.content)}</span>
      </a>
    </div>
  );


      default:
        return (
          <div key={el.id} style={style}>
            {getContentValue(el.content)}
          </div>
        );
    }
  };

  const renderFlexElement = (el: LayoutElement) => {
    switch (el.type) {
      case "background":
        return (
          <img
            key={el.id}
            src={getContentValue(el.content) || "/placeholder.svg"}
            alt="background"
            className="w-full h-full object-fit"
          />
        );

      case "avatar":
        return (
          <div key={el.id} className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-2">
            <img src={getContentValue(el.content) || "/avatar.png"} alt="avatar" className="w-full h-full object-cover" />
          </div>
        );

      case "name":
        return (
          <h1 key={el.id} className={`${profileData.globalStyles?.textStyles?.titles ?? "text-xl font-bold"} mb-1 text-center`} style={getTextStyle(el)}>
            {getContentValue(el.content)}
          </h1>
        );

      case "title":
        return (
          <p key={el.id} className={`${profileData.globalStyles?.textStyles?.headings ?? "text-sm text-gray-600"} mb-3 text-center`} style={getTextStyle(el)}>
            {getContentValue(el.content)}
          </p>
        );

      case "bio":
        return (
          <p key={el.id} className={`${profileData.globalStyles?.textStyles?.paragraphs ?? "text-sm text-gray-700"} mb-3 text-center`} style={{ ...getTextStyle(el), whiteSpace: "pre-line", lineHeight: 1.5 }}>
            {getContentValue(el.content)}
          </p>
        );

      case "link":
  return (
    <a
      key={el.id}
      href={(el.content && el.content.url) || "#"}
      className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-transform hover:scale-105  max-w-[500px]"
      style={{
        width: "85%", // ✅ luôn cố định 85% màn hình
        backgroundColor: profileData.globalStyles?.buttonColor ?? "#2d3748",
        color: "#fff",
        borderRadius:
          profileData.globalStyles?.buttonStyle === "pill" ? 9999 : 8,
        textDecoration: "none",
        padding: "10px 18px",
      }}
    >
      {/* Hiển thị icon nếu có */}
      {el.content?.icon && (
        <img
          src={el.content.icon}
          alt="icon"
          className="w-5 h-5 object-contain"
          loading="lazy"
        />
      )}

      {/* Hiển thị text */}
      <span>{getContentValue(el.content)}</span>
    </a>
  );


      case "divider":
        return <div key={el.id} className="w-16 h-0.5 bg-black my-2" />;

      default:
        return (
          <div key={el.id} className="mb-2">
            {getContentValue(el.content)}
          </div>
        );
    }
  };

 return (
  <div
    className={className ?? ""}
    style={{
      width: "full",
      height: "full",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {isAbsolute ? (
      // Absolute layout
      <div style={{ position: "relative", width: "100%", minHeight: 640 }}>
        {sorted.map((el) => renderAbsolute(el))}
      </div>
    ) : profileData.layoutMode === "flex-vertical" ? (
      // ✅ Flex vertical layout (background full + thứ tự sắp xếp)
      <div
        className="relative flex flex-col items-center justify-start gap-4 min-h-screen"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* ✅ Background full màn */}
        {profileData.elements
          .filter((el) => el.type === "background")
          .map((el) => (
            <img
              key={el.id}
              src={getContentValue(el.content) || "/placeholder.svg"}
              alt="background"
              className="absolute top-0 left-0 w-full h-full object-cover z-0 mx-auto"
            />
          ))}

        {/* ✅ Nội dung foreground */}
        <div className="relative z-10 w-[90%] flex flex-col items-center gap-3 px-4 my-auto">
          {/* Avatar */}
          {sorted
            .filter((el) => el.type === "avatar")
            .map((el) => renderFlexElement(el))}
          {/* Name */}
          {sorted
            .filter((el) => el.type === "name")
            .map((el) => renderFlexElement(el))}
          {/* Title */}
          {sorted
            .filter((el) => el.type === "title")
            .map((el) => renderFlexElement(el))}
          {/* Bio */}
          {sorted
            .filter((el) => el.type === "bio")
            .map((el) => renderFlexElement(el))}
          {/* Links */}
          {sorted
            .filter((el) => el.type === "link")
            .map((el) => renderFlexElement(el))}
          {/* Divider */}
          {sorted
            .filter((el) => el.type === "divider")
            .map((el) => renderFlexElement(el))}
          {/* Các phần tử khác (nếu có) */}
          {sorted
            .filter(
              (el) =>
                !["background", "avatar", "name", "title", "bio", "link", "divider"].includes(el.type)
            )
            .map((el) => renderFlexElement(el))}
        </div>
      </div>
    ) : (
      // Flex horizontal giữ nguyên
      <div className="flex flex-row items-start gap-6 flex-wrap">
        {sorted.map((el) => renderFlexElement(el))}
      </div>
    )}
  </div>
);

}
