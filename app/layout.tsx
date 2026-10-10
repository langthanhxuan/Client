import type { Metadata } from "next";
import Link from "next/link";
import "@/UI/CSS/main.css";

import { inter, sansita } from "@/UI/Font/google/font";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

import {
  faHandHoldingHand,
  faHouseChimney,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";
import Profile from "@/components/main/Profile";

function ProfileSkeleton() {
  return (
    <output
      aria-label="Đang tải tài khoản"
      aria-busy="true"
      className="hidden items-center gap-3 md:flex"
    >
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-pulse rounded-full bg-[#dce9df]"
      />
    </output>
  );
}

export const metadata: Metadata = {
  title: "Làng Thanh Xuân",
  description: "Nền tảng gắn kết và hỗ trợ cộng đồng Làng Thanh Xuân",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full scroll-smooth antialiased">
      <body
        className={`${inter.className} flex min-h-dvh w-full flex-col overflow-x-hidden bg-linear-to-b from-[#ffffff] via-[#f4fcf7] to-[#e8f7ee] text-(--main-color-text) selection:bg-[#cdddce] selection:text-[#48521c]`}
      >
        {/* Header - Sticky, responsive, backdrop blur */}
        <header className="sticky top-0 z-40 w-full border-b border-[#cdddce] bg-[#f8fff9]/85 backdrop-blur-md transition-colors">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Brand Logo & Title */}
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-90"
              aria-label="Về trang chủ Làng Thanh Xuân"
            >
              <span
                className={`${sansita.className} text-xl font-bold tracking-tight text-(--main-color-text) sm:text-2xl`}
              >
                LÀNG THANH XUÂN
              </span>
            </Link>

            {/* Desktop Navigation Menu */}
            <nav className="hidden items-center gap-8 md:flex">
              <Link
                href="/"
                className="text-sm font-semibold text-(--main-color-text) transition-colors hover:text-[#282f0d]"
              >
                Trang chủ
              </Link>
              <Link
                href="/messages"
                className="text-sm font-semibold text-(--main-color-text) transition-colors hover:text-[#282f0d]"
              >
                Tin nhắn
              </Link>
              <Link
                href="/community"
                className="text-sm font-semibold text-(--main-color-text) transition-colors hover:text-[#282f0d]"
              >
                Cộng đồng
              </Link>
            </nav>

            {/* Desktop Right CTA / User Action */}
            <Suspense fallback={<ProfileSkeleton />}>
              <Profile />
            </Suspense>
          </div>
        </header>

        {/* Ghost element to shift main content down */}

        {/* Main Content Area */}
        <div className="flex min-h-[calc(100dvh-4rem)] w-full flex-1 flex-col pb-20 md:pb-0">
          {children}
        </div>

        {/* Mobile / Tablet Floating Bottom Dock (md:hidden) */}
        <nav
          aria-label="Điều hướng chính trên di động"
          className="fixed bottom-4 left-1/2 z-50 flex h-16 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-around rounded-full border border-[#c2d9c5] bg-[#f8fff9]/90 px-3 shadow-[0_10px_28px_rgba(72,82,28,0.14)] backdrop-blur-lg transition-transform md:hidden"
        >
          <Link
            href="/"
            aria-label="Trang chủ"
            className="flex h-12 w-12 items-center justify-center rounded-full text-(--main-color-text) transition-colors hover:bg-[#e4f7eb] active:scale-90"
          >
            <FontAwesomeIcon icon={faHouseChimney} className="h-5 w-5" />
          </Link>
          <Link
            href="/messages"
            aria-label="Tin nhắn"
            className="flex h-12 w-12 items-center justify-center rounded-full text-(--main-color-text) transition-colors hover:bg-[#e4f7eb] active:scale-90"
          >
            <FontAwesomeIcon icon={faMessage} className="h-5 w-5" />
          </Link>
          <Link
            href="/community"
            aria-label="Cộng đồng & Hỗ trợ"
            className="flex h-12 w-12 items-center justify-center rounded-full text-(--main-color-text) transition-colors hover:bg-[#e4f7eb] active:scale-90"
          >
            <FontAwesomeIcon icon={faHandHoldingHand} className="h-5 w-5" />
          </Link>
          <Link
            href="/auth"
            aria-label="Tài khoản cá nhân"
            className="flex h-12 w-12 items-center justify-center rounded-full text-(--main-color-text) transition-colors hover:bg-[#e4f7eb] active:scale-90"
          >
            <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
          </Link>
        </nav>
      </body>
    </html>
  );
}
