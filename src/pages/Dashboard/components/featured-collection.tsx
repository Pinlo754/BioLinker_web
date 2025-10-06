import { Avatar, AvatarImage, AvatarFallback } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"

const collections = [
  {
    id: 1,
    name: "Phong Collection",
    author: "ThanhPhong",
    avatar: "/diverse-person-avatars.png",
    totalItems: 54,
    images: [
      {
        size: "large",
        src: "/abstract-colorful-sunset-ocean-painting.jpg",
      },
      {
        size: "small",
        src: "/abstract-colorful-sunset-ocean-painting.jpg",
      },
      {
        size: "small",
        src: "/abstract-colorful-sunset-ocean-painting.jpg",
      },
      {
        size: "small",
        src: "/abstract-colorful-sunset-ocean-painting.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Khiêm Collection",
    author: "MinhKhiem",
    avatar: "/diverse-person-avatars.png",
    totalItems: 54,
    images: [
      {
        size: "large",
        src: "/rainbow-diagonal-stripes-abstract.jpg",
      },
      {
        size: "small",
        src: "/rainbow-diagonal-stripes-abstract.jpg",
      },
      {
        size: "small",
        src: "/rainbow-diagonal-stripes-abstract.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Khoa Collection",
    author: "VanKhoa",
    avatar: "/diverse-person-avatars.png",
    totalItems: 54,
    images: [
      {
        size: "large",
        src: "/colorful-wavy-abstract-pattern.jpg",
      },
      {
        size: "small",
        src: "/colorful-wavy-abstract-pattern.jpg",
      },
      {
        size: "small",
        src: "/colorful-wavy-abstract-pattern.jpg",
      },
      {
        size: "small",
        src: "/colorful-wavy-abstract-pattern.jpg",
      },
    ],
  },
]

export function FeaturedCollections() {
  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Collection Featured BioLinker</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div key={collection.id} className="space-y-4">
              {/* Image Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden">
                  <img
                    src={collection.images[0].src || "/placeholder.svg"}
                    alt={`${collection.name} main`}
                    className="w-full h-full object-cover aspect-square"
                  />
                </div>
                {collection.images.slice(1).map((image, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={`${collection.name} ${idx + 2}`}
                      className="w-full h-full object-cover aspect-square"
                    />
                  </div>
                ))}
              </div>

              {/* Collection Info */}
              <div>
                <h3 className="text-xl font-bold mb-3">{collection.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={collection.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{collection.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">by {collection.author}</span>
                  </div>
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500 rounded-full">
                    Total {collection.totalItems} Items
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
