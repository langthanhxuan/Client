import Image from "next/image";
import Link from "next/link";
import mainHero from "@/public/assets/images/landing_page_photo.jpg";

export default function MainPage() {
  return (
    <main className="flex min-h-[calc(100dvh-4rem)] w-full flex-1 flex-col justify-between">
      {/* Full-Sized Hero Section */}
      <section className="flex w-full flex-1 items-center border-b border-[#ede4ce] bg-[#fcf8ed] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Headings, Value Proposition & CTA */}
          <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-5">
            <h1 className="text-3xl font-bold tracking-tight text-[#1b4332] sm:text-4xl lg:text-5xl">
              Làng Thanh Xuân
            </h1>
            <h2 className="mt-2 text-xl font-bold text-[#c85a32] sm:mt-3 sm:text-2xl lg:text-3xl">
              Hạnh phúc tuổi xế chiều
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#2d3748] sm:mt-5 sm:text-lg lg:text-xl lg:leading-relaxed">
              Nơi kết nối, sẻ chia giá trị cuộc sống và hỗ trợ tương trợ lẫn
              nhau của cộng đồng người cao tuổi Việt Nam. Đóng góp kỹ năng
              chuyên môn, tích lũy giờ ảo quý giá, và nhận lại sự chăm sóc an
              sinh tận tâm khi bạn cần nhất.
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/auth"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1b4332] px-7 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#2d5a45] active:scale-95"
              >
                Tham gia ngay
              </Link>
              <Link
                href="/community"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#1b4332]/30 bg-white/80 px-6 text-base font-semibold text-[#1b4332] shadow-sm transition-all hover:bg-white active:scale-95"
              >
                Khám phá cộng đồng
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual */}
          <div className="relative flex w-full items-center justify-center lg:col-span-6 xl:col-span-7">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-[#e5dcbf] shadow-xl sm:aspect-16/11 lg:aspect-4/3 xl:aspect-16/11">
              <Image
                src={mainHero}
                alt="Cộng đồng người cao tuổi Làng Thanh Xuân quây quần uống trà trong vườn"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-[75%_50%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-[#f8fff9]/80 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-[#48521c]/80 sm:flex-row sm:text-sm">
          <p className="text-center sm:text-left">
            © 2024 Làng Thanh Xuân. Bảo lưu mọi quyền lợi. Cộng đồng tương trợ
            sức khỏe an sinh Việt Nam.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="transition-colors hover:text-[#1b4332] hover:underline"
            >
              Điều khoản dịch vụ
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#1b4332] hover:underline"
            >
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
