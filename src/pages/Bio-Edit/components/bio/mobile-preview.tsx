"use client";

import type React from "react";
import {
  ProfileData,
  LayoutElement,
  getContentValue,
} from "../../../../types/bio";
import { GripVertical, Move } from "lucide-react";
import { useState, useRef } from "react";

interface MobilePreviewProps {
  profileData: ProfileData;
  viewMode: "mobile" | "desktop";
  onReorder: (startIndex: number, endIndex: number) => void;
  onUpdatePosition: (
    elementId: string,
    position: Partial<LayoutElement["position"]>
  ) => void;
}

export function MobilePreview({
  profileData,
  viewMode,
  onReorder,
  onUpdatePosition,
}: MobilePreviewProps) {
  const isMobile = viewMode === "mobile";

  return (
    <div
      className={`${
        isMobile ? "w-[375px]" : "w-[800px]"
      } transition-all duration-300`}
    >
      {isMobile ? (
        <div
          className="relative mx-auto"
          style={{ width: "375px", height: "812px" }}
        >
          <div className="absolute inset-0 rounded-[3rem] border-[14px] border-gray-900 bg-gray-900 shadow-2xl">
            <div className="w-full h-full rounded-[2.3rem] overflow-hidden bg-white">
              <ProfileContent
                profileData={profileData}
                onReorder={onReorder}
                onUpdatePosition={onUpdatePosition}
                containerWidth={347}
                containerHeight={784}
              />
            </div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10" />
        </div>
      ) : (
        <div className="w-full rounded-2xl border border-border shadow-lg overflow-hidden bg-white">
          <ProfileContent
            profileData={profileData}
            onReorder={onReorder}
            onUpdatePosition={onUpdatePosition}
            containerWidth={800}
            containerHeight={1000}
          />
        </div>
      )}
    </div>
  );
}

function ProfileContent({
  profileData,
  onReorder,
  onUpdatePosition,
  containerWidth,
  containerHeight,
}: {
  profileData: ProfileData;
  onReorder: (startIndex: number, endIndex: number) => void;
  onUpdatePosition: (
    elementId: string,
    position: Partial<LayoutElement["position"]>
  ) => void;
  containerWidth: number;
  containerHeight: number;
}) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDraggingPosition, setIsDraggingPosition] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0, elementX: 0, elementY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const getButtonClass = () => {
    switch (profileData.globalStyles.buttonStyle) {
      case "pill":
        return "rounded-full";
      case "square":
        return "rounded-none";
      case "ribbon-left":
        return "rounded-r-full";
      case "ribbon-right":
        return "rounded-l-full";
      case "ribbon-both":
        return "rounded-full";
      default:
        return "rounded-lg";
    }
  };

  const handleDragStart = (index: number) => {
    if (profileData.layoutMode !== "absolute") {
      setDraggedIndex(index);
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (profileData.layoutMode !== "absolute") {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    if (
      draggedIndex !== null &&
      dragOverIndex !== null &&
      draggedIndex !== dragOverIndex
    ) {
      onReorder(draggedIndex, dragOverIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleDragEnd();
  };

  const handleMouseDown = (e: React.MouseEvent, element: LayoutElement) => {
    if (profileData.layoutMode === "absolute") {
      e.preventDefault();
      setIsDraggingPosition(true);
      setSelectedElement(element.id);
      dragStartPos.current = {
        x: e.clientX,
        y: e.clientY,
        elementX: element.position.x,
        elementY: element.position.y,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingPosition && selectedElement && containerRef.current) {
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      const deltaXPercent = (deltaX / containerWidth) * 100;
      const deltaYPercent = (deltaY / containerHeight) * 100;

      const newX = Math.max(
        0,
        Math.min(100, dragStartPos.current.elementX + deltaXPercent)
      );
      const newY = Math.max(
        0,
        Math.min(100, dragStartPos.current.elementY + deltaYPercent)
      );

      onUpdatePosition(selectedElement, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDraggingPosition(false);
  };

  // Sắp xếp elements theo zIndex
  const sortedElements = [...profileData.elements].sort(
    (a, b) => a.position.zIndex - b.position.zIndex
  );

  const renderElement = (element: LayoutElement, index: number) => {
    if (!element.visible) return null;

    const isAbsoluteMode = profileData.layoutMode === "absolute";
    const isDragging = draggedIndex === index;
    const isDragOver = dragOverIndex === index;
    const isSelected = selectedElement === element.id;

    const commonClasses = `transition-all ${
      isDragging ? "opacity-50 scale-95" : ""
    } ${isDragOver ? "scale-105" : ""} ${
      isSelected ? "ring-2 ring-blue-500" : ""
    }`;

    // Style cho absolute positioning
    const absoluteStyle = isAbsoluteMode
      ? {
          position: "absolute" as const,
          left: `${element.position.x}%`,
          top: `${element.position.y}%`,
          width: `${element.position.width}%`,
          transform:
            element.alignment === "center" ? "translateX(-50%)" : "none",
          zIndex: element.position.zIndex,
        }
      : {};

    const alignmentClass =
      element.alignment === "center"
        ? "mx-auto"
        : element.alignment === "right"
        ? "ml-auto"
        : "mr-auto";

    switch (element.type) {
      case "background":
        return (
          <div
            key={element.id}
            className={`relative group ${commonClasses} ${alignmentClass} w-full min-h-full`}
            onMouseDown={(e) => handleMouseDown(e, element)}
            onClick={() => setSelectedElement(element.id)}
            style={{
              ...absoluteStyle,
              width: isAbsoluteMode ? `${element.position.width}%` : "7rem",
              backgroundImage: `url(${
                getContentValue(element.content) || "/placeholder.svg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        );

      case "avatar":
        return (
          <div
            key={element.id}
            className={`relative group ${commonClasses} ${alignmentClass}`}
            style={{
              ...absoluteStyle,
              width: isAbsoluteMode ? `${element.position.width}%` : "7rem",
            }}
            onMouseDown={(e) => handleMouseDown(e, element)}
            onClick={() => setSelectedElement(element.id)}
          >
            <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
              <img
                src={getContentValue(element.content) || "/avatar.png"}
                alt="Avatar"
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
            {isAbsoluteMode && (
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Move className="w-4 h-4 text-gray-600 cursor-move" />
              </div>
            )}
          </div>
        );

      case "name":
        return (
          <div
            key={element.id}
            className={`relative group ${commonClasses}`}
            style={absoluteStyle}
            onMouseDown={(e) => handleMouseDown(e, element)}
            onClick={() => setSelectedElement(element.id)}
          >
            <h1
              className={`text-${element.alignment || "center"}`}
              style={{
                color: element.content.textColor || "#000",
                fontSize: element.content.fontSize
                  ? `${element.content.fontSize}px`
                  : "24px",
                fontWeight: element.content.fontWeight || "bold",
                fontFamily: element.content.fontFamily || "Poppins, sans-serif",
              }}
            >
              {getContentValue(element.content)}
            </h1>

            {isAbsoluteMode && (
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Move className="w-4 h-4 text-gray-600 cursor-move" />
              </div>
            )}
          </div>
        );

      case "title":
        return (
          <div
            key={element.id}
            className={`relative group ${commonClasses}`}
            style={absoluteStyle}
            onMouseDown={(e) => handleMouseDown(e, element)}
            onClick={() => setSelectedElement(element.id)}
          >
            <p
              className={`text-${element.alignment || "center"}`}
              style={{
                color: element.content.textColor || "#555",
                fontSize: element.content.fontSize
                  ? `${element.content.fontSize}px`
                  : "16px",
                fontWeight: element.content.fontWeight || "normal",
                fontFamily: element.content.fontFamily || "Poppins, sans-serif",
              }}
            >
              {getContentValue(element.content)}
            </p>

            {isAbsoluteMode && (
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Move className="w-4 h-4 text-gray-600 cursor-move" />
              </div>
            )}
          </div>
        );

      case "divider":
        return (
          <div
            key={element.id}
            className={`relative group ${commonClasses} ${alignmentClass}`}
            style={absoluteStyle}
            onMouseDown={(e) => handleMouseDown(e, element)}
            onClick={() => setSelectedElement(element.id)}
          >
            <div
              className="h-0.5 bg-gray-900"
              style={{ width: isAbsoluteMode ? "100%" : "2rem" }}
            />
            {isAbsoluteMode && (
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Move className="w-4 h-4 text-gray-600 cursor-move" />
              </div>
            )}
          </div>
        );

      case "bio":
        return (
          <div
            key={element.id}
            className={`relative group ${commonClasses}`}
            style={absoluteStyle}
            onMouseDown={(e) => handleMouseDown(e, element)}
            onClick={() => setSelectedElement(element.id)}
          >
            <p
              className={`whitespace-pre-line leading-relaxed text-${
                element.alignment || "center"
              }`}
              style={{
                color: element.content.textColor || "#555",
                fontSize: element.content.fontSize
                  ? `${element.content.fontSize}px`
                  : "14px",
                fontWeight: element.content.fontWeight || "normal",
                fontFamily: element.content.fontFamily || "Poppins, sans-serif",
              }}
            >
              {getContentValue(element.content)}
            </p>

            {isAbsoluteMode && (
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Move className="w-4 h-4 text-gray-600 cursor-move" />
              </div>
            )}
          </div>
        );

      case "link":
        return (
          <div
            key={element.id}
            draggable={!isAbsoluteMode}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            className={`relative group ${commonClasses} ${
              profileData.layoutMode === "flex-vertical" ? "w-[85%]" : "w-full"
            }`}
            style={absoluteStyle}
            onMouseDown={(e) => isAbsoluteMode && handleMouseDown(e, element)}
            onClick={() => setSelectedElement(element.id)}
          >
            {!isAbsoluteMode && (
              <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10">
                <GripVertical className="w-4 h-4 text-gray-400" />
              </div>
            )}

            <button
              className={`text-white font-medium text-sm transition-all hover:scale-105 flex items-center justify-between px-20 ${getButtonClass()}  w-full`}
              style={{ backgroundColor: profileData.globalStyles.buttonColor }}
            >
              {element.content.icon && (
                <img
                  src={element.content.icon}
                  alt="icon"
                  className="w-9 h-9 object-contain"
                  loading="lazy"
                />
              )}

              <span className="mx-auto my-3">
                {getContentValue(element.content)}
              </span>
            </button>

            {isAbsoluteMode && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Move className="w-4 h-4 text-white drop-shadow-lg cursor-move" />
              </div>
            )}

            {isDragOver && draggedIndex !== null && draggedIndex !== index && (
              <div className="absolute -top-1.5 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        cursor: isDraggingPosition ? "grabbing" : "default",
        height: containerHeight,
        width: containerWidth,
        overflow: "hidden",
      }}
    >
      {/* ✅ Nếu là absolute thì giữ nguyên */}
      {profileData.layoutMode === "absolute" ? (
        <div className="relative w-full h-full">
          {sortedElements.map((element, index) =>
            renderElement(element, index)
          )}
        </div>
      ) : profileData.layoutMode === "flex-vertical" ? (
        // ✅ Bắt đầu layout vertical giống ProfileRenderer
        <div className="relative flex flex-col items-center justify-start gap-4 h-full w-full">
          {/* Background full màn */}
          {profileData.elements
            .filter((el) => el.type === "background")
            .map((el, index) => (
              <img
                key={el.id}
                src={getContentValue(el.content) || "/placeholder.svg"}
                alt="background"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              />
            ))}

          {/* Nội dung */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-3 w-full px-4">
            {sortedElements
              .filter((el) => el.type === "avatar")
              .map((el, i) => renderElement(el, i))}

            {sortedElements
              .filter((el) => el.type === "name")
              .map((el, i) => renderElement(el, i))}

            {sortedElements
              .filter((el) => el.type === "title")
              .map((el, i) => renderElement(el, i))}

            {sortedElements
              .filter((el) => el.type === "bio")
              .map((el, i) => renderElement(el, i))}

            {sortedElements
              .filter((el) => el.type === "link")
              .map((el, i) => renderElement(el, i))}

            {sortedElements
              .filter((el) => el.type === "divider")
              .map((el, i) => renderElement(el, i))}
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          {/* Background full màn */}
          {profileData.elements
            .filter((el) => el.type === "background")
            .map((el) => (
              <img
                key={el.id}
                src={getContentValue(el.content) || "/placeholder.svg"}
                alt="background"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              />
            ))}

          {/* Nội dung */}
          <div className="relative z-10 flex flex-row flex-wrap items-start justify-center gap-4 p-6 w-full h-full overflow-auto">
            {sortedElements
              .filter((el) => el.type === "avatar")
              .map((el, i) => renderElement(el, i))}

            {sortedElements
              .filter((el) => el.type === "name")
              .map((el, i) => renderElement(el, i))}

            {sortedElements
              .filter((el) => el.type === "title")
              .map((el, i) => renderElement(el, i))}

            {sortedElements
              .filter((el) => el.type === "bio")
              .map((el, i) => renderElement(el, i))}

            {sortedElements
              .filter((el) => el.type === "link")
              .map((el, i) => renderElement(el, i))}

            {sortedElements
              .filter((el) => el.type === "divider")
              .map((el, i) => renderElement(el, i))}
          </div>
        </div>
      )}
    </div>
  );
}
