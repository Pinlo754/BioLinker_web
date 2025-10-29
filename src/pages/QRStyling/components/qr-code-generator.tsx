"use client"

import { useEffect, useRef } from "react"
import QRCodeStyling from "../src/core/QRCodeStyling"
import type { Options } from "../src/types"

interface QRCodeGeneratorProps {
  options: Partial<Options>
  size?: number
  className?: string
}

export function QRCodeGenerator({ options, size = 300, className = "" }: QRCodeGeneratorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const qrCodeRef = useRef<QRCodeStyling | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: size,
        height: size,
        ...options,
      })
    } else {
      // Update existing QR code with new options
      qrCodeRef.current.update({
        width: size,
        height: size,
        ...options,
      })
    }

    // Clear container and append QR code
    containerRef.current.innerHTML = ""
    qrCodeRef.current.append(containerRef.current)
  }, [options, size])

  const handleDownload = async (format: "png" | "svg" | "jpeg" = "png") => {
    if (qrCodeRef.current) {
      await qrCodeRef.current.download({
        name: "qr-code",
        extension: format,
      })
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={containerRef} className={`flex items-center justify-center bg-white p-4 rounded-lg ${className}`} />
      <div className="flex gap-2">
        <button
          onClick={() => handleDownload("png")}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Tải PNG
        </button>
        <button
          onClick={() => handleDownload("svg")}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
        >
          Tải SVG
        </button>
      </div>
    </div>
  )
}
