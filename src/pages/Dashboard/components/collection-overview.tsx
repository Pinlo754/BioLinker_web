import { Avatar, AvatarImage, AvatarFallback } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Card } from "../../../components/ui/card"
import { Check } from "lucide-react"

const sideTemplates = [
  {
    id: 2,
    title: "Template 2",
    image: "/rainbow-diagonal-stripes-abstract.jpg",
    avatar: "/diverse-person-avatars.png",
  },
  {
    id: 3,
    title: "Template 3",
    image: "/fantasy-castle-clouds.jpg",
    avatar: "/diverse-person-avatars.png",
  },
  {
    id: 4,
    title: "Template 4",
    image: "/colorful-wavy-pattern.jpg",
    avatar: "/diverse-person-avatars.png",
  },
]

const topTemplates = [
  {
    rank: 1,
    name: "Thanh Phong",
    value: "19,769.39",
    change: "+26.52%",
    positive: true,
    verified: true,
    avatar: "/diverse-person-avatars.png",
  },
  {
    rank: 2,
    name: "Minh Khiêm",
    value: "2,769.39",
    change: "+10.52%",
    positive: false,
    verified: false,
    avatar: "/diverse-person-avatars.png",
  },
  {
    rank: 3,
    name: "Văn Khoa",
    value: "9,232.39",
    change: "+2.52%",
    positive: true,
    verified: false,
    avatar: "/diverse-person-avatars.png",
  },
  {
    rank: 4,
    name: "Trọng Nghĩa",
    value: "3,769.39",
    change: "+1.52%",
    positive: true,
    verified: true,
    avatar: "/diverse-person-avatars.png",
  },
  {
    rank: 5,
    name: "Huỳnh Duyên",
    value: "10,769.39",
    change: "+2.52%",
    positive: false,
    verified: false,
    avatar: "/diverse-person-avatars.png",
  },
]

export function CollectionOverview() {
  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Featured Template */}
          <div className="lg:col-span-5">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="aspect-[4/5] relative">
                <img src="/abstract-colorful-sunset-ocean-painting.jpg" alt="Template 1" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/diverse-person-avatars.png" />
                      <AvatarFallback>TP</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">Template 1</h3>
                      <p className="text-sm text-muted-foreground">@thanhphong</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500 mb-1">
                      Premium
                    </Badge>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Side Templates */}
          <div className="lg:col-span-3 space-y-6">
            {sideTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden border-0 shadow-md">
                <div className="flex items-center gap-4 p-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={template.image || "/placeholder.svg"}
                      alt={template.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-2">{template.title}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={template.avatar || "/placeholder.svg"} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <Badge variant="outline" className="text-emerald-500 border-emerald-500">
                        Premium
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full rounded-full border-emerald-500 text-emerald-500 bg-transparent"
                    >
                      User template
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Top Templates Leaderboard */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Top Template over</h3>
              <p className="text-purple-600 font-semibold mb-6">Last 7 days</p>

              <div className="space-y-4">
                {topTemplates.map((template) => (
                  <div key={template.rank} className="flex items-center gap-4">
                    <span className="text-2xl font-bold w-8">{template.rank}</span>
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={template.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{template.name[0]}</AvatarFallback>
                      </Avatar>
                      {template.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.value}</p>
                    </div>
                    <span className={`font-bold ${template.positive ? "text-emerald-500" : "text-red-500"}`}>
                      {template.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
