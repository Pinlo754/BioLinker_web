import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QRCodeGenerator } from "../../components/qr-code-generator"
import type { Options } from "../../src/types"

export default function ExamplesPage() {
  const examples = [
    {
      title: "Simple QR Code",
      description: "Basic QR code with default styling",
      options: {
        data: "https://example.com",
        dotsOptions: {
          color: "#000000",
          type: "dots",
        },
        backgroundOptions: {
          color: "#ffffff",
        },
      } as Partial<Options>,
    },
    {
      title: "Rounded Dots",
      description: "QR code with rounded dot style",
      options: {
        data: "https://example.com",
        dotsOptions: {
          color: "#1e40af",
          type: "rounded",
        },
        backgroundOptions: {
          color: "#f0f9ff",
        },
        cornersSquareOptions: {
          color: "#1e40af",
          type: "square",
        },
      } as Partial<Options>,
    },
    {
      title: "Classy Style",
      description: "QR code with classy dot pattern",
      options: {
        data: "https://example.com",
        dotsOptions: {
          color: "#7c3aed",
          type: "classy",
        },
        backgroundOptions: {
          color: "#faf5ff",
        },
        cornersSquareOptions: {
          color: "#7c3aed",
          type: "square",
        },
      } as Partial<Options>,
    },
    {
      title: "Extra Rounded",
      description: "QR code with extra rounded corners",
      options: {
        data: "https://example.com",
        dotsOptions: {
          color: "#059669",
          type: "extra-rounded",
        },
        backgroundOptions: {
          color: "#f0fdf4",
        },
        cornersSquareOptions: {
          color: "#059669",
          type: "extra-rounded",
        },
      } as Partial<Options>,
    },
    {
      title: "Square Dots",
      description: "QR code with square dot style",
      options: {
        data: "https://example.com",
        dotsOptions: {
          color: "#dc2626",
          type: "square",
        },
        backgroundOptions: {
          color: "#fef2f2",
        },
        cornersSquareOptions: {
          color: "#dc2626",
          type: "square",
        },
      } as Partial<Options>,
    },
    {
      title: "Classy Rounded",
      description: "QR code with classy rounded style",
      options: {
        data: "https://example.com",
        dotsOptions: {
          color: "#ea580c",
          type: "classy-rounded",
        },
        backgroundOptions: {
          color: "#fff7ed",
        },
        cornersSquareOptions: {
          color: "#ea580c",
          type: "square",
        },
      } as Partial<Options>,
    },
  ]

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">QR Code Examples</h1>
          <p className="text-muted-foreground">Explore different styling options and combinations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center">
                <QRCodeGenerator options={example.options} size={250} className="shadow-sm" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
