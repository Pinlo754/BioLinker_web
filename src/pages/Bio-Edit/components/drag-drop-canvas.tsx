"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import type { LayoutElement } from "../../../types/bio"
import { ProfileComponentRenderer } from "../components/profile-component-renderer"
import { Trash2, Move } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DragDropCanvasProps {
  components: LayoutElement[]
  selectedComponent: LayoutElement | null
  onSelectComponent: (component: LayoutElement | null) => void
  onUpdateComponent: (id: string, updates: Partial<LayoutElement>) => void
  onDeleteComponent: (id: string) => void
}

export function DragDropCanvas({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent,
}: DragDropCanvasProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  // --- Drag element ---
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, component: LayoutElement) => {
      e.preventDefault()
      e.stopPropagation()

      onSelectComponent(component)
      setIsDragging(true)

      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left - component.position.x,
          y: e.clientY - rect.top - component.position.y,
        })
      }
    },
    [onSelectComponent],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !selectedComponent) return

      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const newX = Math.max(0, e.clientX - rect.left - dragOffset.x)
        const newY = Math.max(0, e.clientY - rect.top - dragOffset.y)

        onUpdateComponent(selectedComponent.id, {
          position: { ...selectedComponent.position, x: newX, y: newY },
        })
      }
    },
    [isDragging, selectedComponent, dragOffset, onUpdateComponent],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onSelectComponent(null)
      }
    },
    [onSelectComponent],
  )

  // --- Resize element ---
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, component: LayoutElement) => {
      e.preventDefault()
      e.stopPropagation()

      const startX = e.clientX
      const startY = e.clientY
      const startWidth = component.size?.width || 100
      const startHeight = component.size?.height || 50

      const handleResize = (e: MouseEvent) => {
        const deltaX = e.clientX - startX
        const deltaY = e.clientY - startY

        onUpdateComponent(component.id, {
          size: {
            width: Math.max(50, startWidth + deltaX),
            height: Math.max(30, startHeight + deltaY),
          },
        })
      }

      const handleResizeEnd = () => {
        document.removeEventListener("mousemove", handleResize)
        document.removeEventListener("mouseup", handleResizeEnd)
      }

      document.addEventListener("mousemove", handleResize)
      document.addEventListener("mouseup", handleResizeEnd)
    },
    [onUpdateComponent],
  )

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Move className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {selectedComponent ? `Selected: ${selectedComponent.type}` : "Click to select components"}
          </span>
        </div>
        {selectedComponent && (
          <Button variant="ghost" size="sm" onClick={() => onDeleteComponent(selectedComponent.id)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        )}
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="flex-1 relative bg-background overflow-hidden cursor-default"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Empty state */}
        {components.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Add components from sidebar...</p>
          </div>
        )}

        {/* Render components */}
        {components.map((component) => (
          <div
            key={component.id}
            className={`absolute cursor-move select-none ${
              selectedComponent?.id === component.id
                ? "ring-2 ring-primary ring-offset-2"
                : "hover:ring-1 hover:ring-border"
            }`}
            style={{
              left: component.position.x,
              top: component.position.y,
              width: component.size?.width,
              height: component.size?.height,
              zIndex: component.position.zIndex,
            }}
            onMouseDown={(e) => handleMouseDown(e, component)}
          >
            <ProfileComponentRenderer component={component} />

            {/* Resize handle */}
            {selectedComponent?.id === component.id && (
              <div
                className="absolute bottom-0 right-0 w-3 h-3 bg-primary cursor-se-resize"
                onMouseDown={(e) => handleResizeStart(e, component)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
