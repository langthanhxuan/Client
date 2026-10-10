"use client";

import {
  faChevronDown,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

type ProfileMenuProps = {
  image?: string | null;
  name?: string | null;
};

export default function ProfileMenu({ image, name }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const displayName = name ?? "Tài khoản cá nhân";

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative hidden md:block">
      <button
        ref={triggerRef}
        type="button"
        aria-label={`Mở menu tài khoản: ${displayName}`}
        aria-expanded={isOpen}
        aria-controls="profile-menu"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-11 items-center gap-2 rounded-full p-0.5 pr-2 text-(--main-color-text) transition-colors hover:bg-[#e4f7eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--main-color-text)"
      >
        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#e4f7eb]">
          {image ? (
            <Image
              src={image}
              alt=""
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              className="h-4 w-4"
              aria-hidden="true"
            />
          )}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id="profile-menu"
        className={`${isOpen ? "block" : "hidden"} absolute top-full right-0 z-50 mt-2 w-56 rounded-lg border border-[#cdddce] bg-[#f8fff9] p-1.5 shadow-[0_10px_28px_rgba(72,82,28,0.14)]`}
      >
        <Link
          href="/profile"
          onClick={() => setIsOpen(false)}
          className="flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-(--main-color-text) transition-colors hover:bg-[#e4f7eb] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--main-color-text)"
        >
          <FontAwesomeIcon
            icon={faUser}
            className="h-4 w-4"
            aria-hidden="true"
          />
          Thông tin cá nhân
        </Link>
        <button
          type="button"
          onClick={() => void signOut({ callbackUrl: "/" })}
          className="flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium text-[#8b3030] transition-colors hover:bg-[#fbe9e7] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#8b3030]"
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="h-4 w-4"
            aria-hidden="true"
          />
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
