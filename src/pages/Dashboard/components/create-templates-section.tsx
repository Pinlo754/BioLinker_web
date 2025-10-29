import { Button } from "../../../components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";

export function CreateTemplatesSection() {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {[
                "/abstract-colorful-sunset-ocean-painting.jpg",
                "/rainbow-diagonal-stripes-abstract.jpg",
              ].map((img, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden aspect-[3/4]"
                >
                  <img
                    src={img}
                    alt="Template"
                    className="w-full h-full object-cover"
                  />
                  <Avatar className="absolute bottom-3 right-3 h-12 w-12 border-4 border-white">
                    <AvatarImage src="/diverse-person-avatars.png" />
                  </Avatar>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="/colorful-wavy-abstract-pattern.jpg"
                  alt="Template"
                  className="w-full h-full object-cover"
                />
                <Avatar className="absolute bottom-3 right-3 h-12 w-12 border-4 border-white">
                  <AvatarImage src="/diverse-person-avatars.png" />
                </Avatar>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tạo và bán template của bạn
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6">
              Với Biolinker, bạn có thể dễ dàng tạo và bán các mẫu thiết kế của
              riêng mình. Chia sẻ sự sáng tạo và biến chúng thành thu nhập.
            </p>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 py-3 mb-20">
              Bắt đầu ngay
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
