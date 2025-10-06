import { Button } from "../../../components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/ui/avatar"

export function CreateTemplatesSection() {
  return (
    <section className="bg-gray-50 py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Template images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                  <img src="/abstract-colorful-sunset-ocean-painting.jpg" alt="Template" className="w-full h-full object-cover" />
                  <Avatar className="absolute bottom-4 right-4 h-16 w-16 border-4 border-white">
                    <AvatarImage src="/diverse-person-avatars.png" />
                    <AvatarFallback>TP</AvatarFallback>
                  </Avatar>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                  <img src="/rainbow-diagonal-stripes-abstract.jpg" alt="Template" className="w-full h-full object-cover" />
                  <Avatar className="absolute bottom-4 right-4 h-16 w-16 border-4 border-white">
                    <AvatarImage src="/diverse-person-avatars.png" />
                    <AvatarFallback>VK</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="pt-12">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                  <img src="/colorful-wavy-abstract-pattern.jpg" alt="Template" className="w-full h-full object-cover" />
                  <Avatar className="absolute bottom-4 right-4 h-16 w-16 border-4 border-white">
                    <AvatarImage src="/diverse-person-avatars.png" />
                    <AvatarFallback>HD</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Create and sell your templates</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With Biolinker, you can easily create and sell your own custom templates. Whether you&apos;re a designer,
              content creator, or just love building stylish pages, this feature lets you share your creativity with
              others. Turn your designs into income by offering them to Biolinker users looking for fresh, professional
              layouts.
            </p>
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-12">
              Start to Explore
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
