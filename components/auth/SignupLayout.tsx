/**
 * components/auth/SignupLayout.tsx
 *
 * Shared layout component for the 3-step signup wizard.
 * Provides consistent branding (Logo), background, and progress tracking.
 *
 * @param {React.ReactNode} children - The form component for the specific step.
 * @param {number} currentStep - The current step number (1, 2, or 3).
 */
import type React from "react";
import { inter } from "@/UI/Font/google/font";

interface SignupLayoutProps {
  children: React.ReactNode;
  currentStep: number;
}

const SignupLayout: React.FC<SignupLayoutProps> = ({
  children,
  currentStep,
}) => {
  return (
    <main
      aria-label="Đăng ký"
      style={inter.style}
      className="flex min-h-0 w-full flex-1 flex-col items-center justify-start p-4 sm:p-6 lg:p-8"
    >
      <section className="flex max-h-[80vh] w-full max-w-lg flex-col items-center overflow-hidden rounded-3xl border border-[#c2d9c5] bg-[#f8fff8]/95 px-6 py-10 shadow-[0_20px_60px_rgba(72,82,28,0.12)] backdrop-blur-sm sm:px-10 sm:py-14">
        {/* Step Progress Indicator */}
        <div className="flex w-full items-center justify-center gap-2">
          <span
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentStep === 1 ? "w-8 bg-[#48521c]" : "w-2.5 bg-[#c2d9c5]"
            }`}
            aria-hidden="true"
          />
          <span
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentStep === 2 ? "w-8 bg-[#48521c]" : "w-2.5 bg-[#c2d9c5]"
            }`}
            aria-hidden="true"
          />
          <span
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentStep === 3 ? "w-8 bg-[#48521c]" : "w-2.5 bg-[#c2d9c5]"
            }`}
            aria-hidden="true"
          />
        </div>

        {/* Render the specific step component */}
        <div className="mt-8 w-full overflow-auto">{children}</div>
      </section>
    </main>
  );
};

export default SignupLayout;
