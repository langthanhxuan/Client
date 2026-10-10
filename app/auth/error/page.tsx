import Link from "next/link";
import { inter } from "@/UI/Font/google/font";

interface PageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { error } = await searchParams;

  return (
    <main
      style={inter.style}
      className="grid min-h-[calc(100vh-4rem)] w-full place-items-center bg-[#faeaea] px-4 py-12 text-[#263a2c] selection:bg-[#cdddce] selection:text-[#48521c] sm:px-6"
    >
      <section className="w-full max-w-xl rounded-xl border border-[#d8e4d8] bg-white p-6 shadow-[0_20px_60px_rgba(38,58,44,0.08)] sm:p-10">
        <div className="flex h-auto w-full items-center gap-5">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff0ed] text-xl font-semibold text-[#a83d30]"
            aria-hidden="true"
          >
            !
          </div>
          <p className="h-fit w-fit text-sm font-semibold tracking-[0.12em] text-[#a83d30] uppercase">
            Lỗi xác thực
          </p>
        </div>
        <p
          role="alert"
          className="mt-5 rounded-lg border border-[#f0d6d1] bg-[#fff8f6] px-4 py-3 text-sm leading-6 wrap-break-word text-[#71352e]"
        >
          {error && error === "undefined"
            ? "Có lỗi không thể xác định. Hãy thử đăng nhập lại"
            : error}
        </p>
        <Link
          href="/auth"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-[#48521c] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#374016] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#48521c]"
        >
          Về trang xác thực
        </Link>
      </section>
    </main>
  );
}
