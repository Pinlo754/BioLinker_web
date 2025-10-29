"use client"

import { useEffect, useState } from "react"
import { QRCodeGenerator } from "./qr-code-generator"
import type { Options } from "../src/types"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { fetcherWithParams } from "../../../api/fetchers"

export function QRCodeBuilder() {  
  const [data, setData] = useState("https://example.com")
  const [dotsColor, setDotsColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [cornerSquareColor, setCornerSquareColor] = useState("#000000")
  const [cornerDotColor, setCornerDotColor] = useState("#000000")
  const [size, setSize] = useState(300)
  
  const qrOptions: Partial<Options> = {
    data,
    type: "canvas",
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "H",
    },
    imageOptions: {
      hideBackgroundDots: false,
      imageSize: 0.4,
      margin: 0,
    },
    dotsOptions: {
      color: dotsColor,
      type: "rounded",
    },
    backgroundOptions: {
      color: backgroundColor,
    },
    cornersSquareOptions: {
      color: cornerSquareColor,
      type: "square",
    },
    cornersDotOptions: {
      color: cornerDotColor,
      type: "dot",
    },
  }

  const [userData, setUserData] = useState<any>(null);

  const fetchUser = async () => {
    const userId = localStorage.getItem("userId");
    const fetch = await fetcherWithParams(`Auth/${userId}`, { userId: userId });
    setUserData(fetch);
  }

  useEffect( () => {
  const domain = localStorage.getItem("customerDomain")
  fetchUser();
  if (domain) setData("raw")
}, [])

  useEffect( () => {
    console.log("User Data:");
    console.log( userData);
    setData(userData?.customerDomain ? `https://biolinker.io.vn/biolinker/${userData?.customerDomain}` : "https://example.com");
}, [userData])


  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Xem trước</TabsTrigger>
          <TabsTrigger value="settings">Thiết lập</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardContent className="flex justify-center">
              <QRCodeGenerator options={qrOptions} size={size} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thiết lập QR Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Data Input */}
              <div className="space-y-2">
                <Label htmlFor="data">URL</Label>
                <Input
                  id="data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  placeholder="Enter URL or text"
                  className="w-full"
                />
              </div>

              {/* Size */}
              <div className="space-y-2">
                <Label htmlFor="size">Size: {size}px</Label>
                <input
                  id="size"
                  type="range"
                  min="100"
                  max="500"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dotsColor">Dots Color</Label>
                  <div className="flex gap-2">
                    <input
                      id="dotsColor"
                      type="color"
                      value={dotsColor}
                      onChange={(e) => setDotsColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <Input value={dotsColor} onChange={(e) => setDotsColor(e.target.value)} className="flex-1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bgColor">Background Color</Label>
                  <div className="flex gap-2">
                    <input
                      id="bgColor"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cornerSquareColor">Corner Square Color</Label>
                  <div className="flex gap-2">
                    <input
                      id="cornerSquareColor"
                      type="color"
                      value={cornerSquareColor}
                      onChange={(e) => setCornerSquareColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={cornerSquareColor}
                      onChange={(e) => setCornerSquareColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cornerDotColor">Corner Dot Color</Label>
                  <div className="flex gap-2">
                    <input
                      id="cornerDotColor"
                      type="color"
                      value={cornerDotColor}
                      onChange={(e) => setCornerDotColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={cornerDotColor}
                      onChange={(e) => setCornerDotColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
