import { Button } from "../../../components/ui/button"
import { Card } from "../../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"

const categories = ["All Categories", "Art", "Celebrities", "Gaming", "Sport", "Music", "Crypto"]

const templates = [
  {
    id: 1,
    name: "Thanh Phong",
    image: "/abstract-colorful-sunset-ocean-painting.jpg",
    avatar: "/diverse-person-avatars.png",
    count: "1 of 321",
  },
  {
    id: 2,
    name: "Văn Khoa",
    image: "/rainbow-diagonal-stripes-abstract-art.jpg",
    avatar: "/diverse-person-avatars.png",
    count: "1 of 321",
  },
  {
    id: 3,
    name: "Minh Khiêm",
    image: "/fantasy-castle-in-clouds-watercolor.jpg",
    avatar: "/diverse-person-avatars.png",
    count: "1 of 321",
  },
  {
    id: 4,
    name: "Huỳnh Duyên",
    image: "/colorful-wavy-abstract-pattern.jpg",
    avatar: "/diverse-person-avatars.png",
    count: "1 of 321",
  },
]

export function TemplatesSection() {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">More Templates</h2>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? "default" : "outline"}
              className={index === 0 ? "bg-emerald-500 hover:bg-emerald-600 text-white rounded-full" : "rounded-full"}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden border-0 shadow-md">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={template.avatar || "/placeholder.svg"} alt={template.name} />
                    <AvatarFallback>{template.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.count}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500">
                    Premium
                  </Badge>
                  <Button variant="ghost" size="sm">
                    Edit Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((template) => (
            <Card key={`row2-${template.id}`} className="overflow-hidden border-0 shadow-md">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={template.avatar || "/placeholder.svg"} alt={template.name} />
                    <AvatarFallback>{template.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.count}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500">
                    Premium
                  </Badge>
                  <Button variant="ghost" size="sm">
                    Edit Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-12">
            More Templates
          </Button>
        </div>
      </div>
    </section>
  )
}
