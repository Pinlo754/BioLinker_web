"use client"

import { useState } from "react"
import { QRCodeGenerator } from "../../components/qr-code-generator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Options } from "../../src/types"

export default function SimplePage() {
  const [url, setUrl] = useState("https://example.com")

  const options: Partial<Options> = {
    data: url,
    dotsOptions: {
      color: "#000000",
      type: "rounded",
    },
    backgroundOptions: {
      color: "#ffffff",
    },
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Simple QR Code Generator</h1>
          <p className="text-muted-foreground">Generate a QR code from any URL</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate QR Code</CardTitle>
            <CardDescription>Enter a URL to generate a QR code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url">URL or Text</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full"
              />
            </div>

            <div className="flex justify-center">
              <QRCodeGenerator options={options} size={350} />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
