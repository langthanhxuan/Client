"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import google from "@/public/google.svg";

/**
 * GoogleAuth Component
 * Handles Step 1 of the authentication flow: Google OAuth sign-in.
 */
export default function GoogleAuth() {
  // Loading state to disable button and show processing text during OAuth trigger
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Triggers the Google Sign-in flow.
   * On success: redirects to Step 2 (Phone Number verification).
   */
  async function handleGoogleSignIn() {
    setIsLoading(true);
    try {
      const res = await signIn("google", {
        callbackUrl: "/auth?step=phone",
        redirect: false,
      });

      if (res?.url) window.location.href = res.url;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* Primary Google Authentication Action Button */}
      <button
        type="button"
        disabled={isLoading}
        onClick={handleGoogleSignIn}
        className="relative flex min-h-14 w-full items-center justify-center rounded-xl bg-[#48521c] px-12 text-base font-bold text-[#feffef] transition-all hover:bg-[#5c6729] hover:shadow-[0_10px_24px_rgba(145,230,193,0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#48521c] active:scale-[0.99] disabled:opacity-70 sm:text-lg"
      >
        {/* Google brand icon positioned on the left */}
        <Image
          src={google}
          alt=""
          aria-hidden="true"
          className="absolute left-4 h-6 w-6 sm:left-5"
        />

        {/* Dynamic button label reflecting loading state */}
        {isLoading ? "Đang xử lý..." : "Tiếp tục với Google"}
      </button>
    </div>
  );
}
