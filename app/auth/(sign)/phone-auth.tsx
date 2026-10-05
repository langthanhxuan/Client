"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

/**
 * Props accepted by PhoneAuth component.
 * Supports initializing from URL search params passed by the parent server component.
 */
interface PhoneAuthProps {
  initialStep?: "phone" | "otp" | "complete";
  initialPhone?: string;
}

/**
 * PhoneAuth Component
 * Handles Step 2 & 3 of the authentication flow:
 * - Phone number input & validation
 * - SMS OTP input & verification
 * - Completion confirmation screen
 */
export default function PhoneAuth({
  initialStep = "phone",
  initialPhone = "",
}: PhoneAuthProps) {
  // Navigation router for query parameter URL synchronization
  const router = useRouter();

  // --- Internal Component State ---
  // Sub-step tracking: 'phone' (input), 'otp' (verify code), 'complete' (success)
  const [step, setStep] = useState<"phone" | "otp" | "complete">(initialStep);

  // User input values
  const [phone, setPhone] = useState(initialPhone);
  const [otp, setOtp] = useState("");

  // Validation / API error feedback
  const [error, setError] = useState("");

  // Submission loading indicator state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Logic Handlers ---

  /**
   * Validates phone format and sends SMS OTP request to backend.
   * Enforces Vietnamese mobile network prefixes (03x, 05x, 07x, 08x, 09x or +84/84 equivalent).
   * On success: transitions state & URL to OTP verification step.
   */
  function triggerPhoneSend() {
    // Strip common spacing and symbols
    const cleanPhone = phone.replace(/[\s().-]/g, "");

    // Regex check:
    // 1) Starts with 0 followed by 3, 5, 7, 8, 9 and exactly 8 digits (10 digits total)
    // 2) Starts with +84 or 84 followed by 3, 5, 7, 8, 9 and exactly 8 digits (9 digits after country code)
    const vnPhoneRegex = /^(?:(?:\+84|84)[35789]\d{8}|0[35789]\d{8})$/;

    if (!vnPhoneRegex.test(cleanPhone)) {
      setError(
        "Số điện thoại không hợp lệ (VD: 0912345678 hoặc +84912345678).",
      );
      return;
    }

    setError("");
    setIsSubmitting(true);

    // TODO: Replace with actual backend API call to dispatch SMS OTP
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("otp");
      // Synchronize URL search params with normalized phone number
      router.push(`/auth?step=otp&phone=${encodeURIComponent(cleanPhone)}`);
    }, 400);
  }

  /**
   * Form submit handler for phone number input step.
   */
  function handlePhoneSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    triggerPhoneSend();
  }

  /**
   * Action handler for resending OTP code from OTP screen.
   */
  function handleResendOtp() {
    triggerPhoneSend();
  }

  /**
   * Form submit handler for OTP verification.
   * Validates 6-digit numeric string and verifies with backend.
   */
  function handleOtpSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Regex validation: exactly 6 numeric digits
    if (!/^\d{6}$/.test(otp)) {
      setError("Mã xác nhận gồm 6 chữ số.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // TODO: Replace with actual backend OTP verification API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("complete");
      // Synchronize URL to completion step
      router.push("/auth/signup");
    }, 400);
  }

  /**
   * Navigates back from OTP screen to Phone Number input screen.
   */
  function handleBackToPhone() {
    setError("");
    setOtp("");
    setStep("phone");
    router.push("/auth?step=phone");
  }

  /**
   * Navigates back from Phone screen to Step 1 (Google OAuth).
   */
  function handleBackToGoogle() {
    setError("");
    router.push("/auth?step=google");
  }

  // --- Render Step 4: Success / Completion Screen ---
  if (step === "complete") {
    return (
      <div className="w-full space-y-6 text-center">
        {/* Success Checkmark Badge */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d7f5e3] text-2xl text-[#2a6840]">
          ✓
        </div>

        {/* Success Confirmation Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-(--main-color-text) sm:text-2xl">
            Xác thực thành công!
          </h2>
          <p className="text-sm text-(--main-color-text)/80 sm:text-base">
            Số điện thoại {phone} đã được liên kết với tài khoản của bạn.
          </p>
        </div>

        {/* Return Home CTA Button */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="min-h-12 w-full rounded-xl bg-[#48521c] px-6 text-base font-bold text-[#feffef] transition-colors hover:bg-[#5c6729]"
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  // --- Render Step 3: SMS OTP Code Input & Verification Screen ---
  if (step === "otp") {
    return (
      <form onSubmit={handleOtpSubmit} className="w-full space-y-5">
        {/* Step instruction label */}
        <div className="text-center">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-(--main-color-text) sm:text-base"
          >
            Nhập mã xác nhận 6 số đã gửi đến{" "}
            <span className="font-bold">{phone || "số điện thoại"}</span>
          </label>
        </div>

        {/* OTP Input Field (Numeric only, spaced characters) */}
        <input
          id="otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          value={otp}
          onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
          placeholder="000000"
          className="min-h-14 w-full rounded-xl border border-[#c2d9c5] bg-white px-4 text-center text-2xl font-semibold tracking-[0.4em] text-(--main-color-text) transition outline-none focus:border-[#48521c] focus:ring-4 focus:ring-[#91e6c1]/30"
        />

        {/* Inline Error Message */}
        {error && (
          <p
            role="alert"
            className="text-center text-sm font-medium text-red-600"
          >
            {error}
          </p>
        )}

        {/* Submit OTP Verification Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-14 w-full rounded-xl bg-[#48521c] px-5 text-base font-bold text-[#feffef] transition-all hover:bg-[#5c6729] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#48521c] active:scale-[0.99] disabled:opacity-70 sm:text-lg"
        >
          {isSubmitting ? "Đang xác thực..." : "Xác nhận mã"}
        </button>

        {/* Secondary Navigation Actions: Change phone number or Resend OTP */}
        <div className="flex items-center justify-between pt-2 text-sm">
          <button
            type="button"
            onClick={handleBackToPhone}
            className="text-(--main-color-text) underline underline-offset-4 transition-colors hover:text-[#282f0d]"
          >
            Đổi số điện thoại
          </button>
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-(--main-color-text) underline underline-offset-4 transition-colors hover:text-[#282f0d]"
          >
            Gửi lại mã
          </button>
        </div>
      </form>
    );
  }

  // --- Render Step 2: Phone Number Entry Screen ---
  return (
    <form onSubmit={handlePhoneSubmit} className="w-full space-y-5">
      {/* Phone Number Input Group */}
      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-center text-sm font-medium text-(--main-color-text) sm:text-base"
        >
          Nhập số điện thoại để tiếp tục xác thực
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+84 901 234 567"
          className="min-h-14 w-full rounded-xl border border-[#c2d9c5] bg-white px-4 text-base text-(--main-color-text) transition outline-none focus:border-[#48521c] focus:ring-4 focus:ring-[#91e6c1]/30"
        />
      </div>

      {/* Inline Error Message */}
      {error && (
        <p
          role="alert"
          className="text-center text-sm font-medium text-red-600"
        >
          {error}
        </p>
      )}

      {/* Submit Phone Number Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-14 w-full rounded-xl bg-[#48521c] px-5 text-base font-bold text-[#feffef] transition-all hover:bg-[#5c6729] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#48521c] active:scale-[0.99] disabled:opacity-70 sm:text-lg"
      >
        {isSubmitting ? "Đang gửi..." : "Gửi mã xác nhận"}
      </button>

      {/* Back Navigation to Step 1 (Google OAuth) */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={handleBackToGoogle}
          className="text-sm text-(--main-color-text) underline underline-offset-4 transition-colors hover:text-[#282f0d]"
        >
          Quay lại bước Google
        </button>
      </div>
    </form>
  );
}
