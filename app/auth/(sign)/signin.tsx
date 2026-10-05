import { inter } from "@/UI/Font/google/font";
import GoogleAuth from "./google-auth";
import PhoneAuth from "./phone-auth";

interface SigninProps {
  searchParams?: {
    step?: string;
    phone?: string;
  };
}

export default function Signin({ searchParams }: SigninProps) {
  const currentStep = searchParams?.step ?? "google";
  const phoneParam = searchParams?.phone ?? "";

  const isGoogleStep = currentStep === "google";
  const isPhoneStep = currentStep === "phone";
  const isOtpStep = currentStep === "otp";
  const isCompleteStep = currentStep === "complete";

  return (
    <main
      style={inter.style}
      className="flex min-h-[80vh] w-full items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
    >
      <section className="flex w-full max-w-lg flex-col items-center rounded-3xl border border-[#c2d9c5] bg-[#f8fff8]/95 px-6 py-10 shadow-[0_20px_60px_rgba(72,82,28,0.12)] backdrop-blur-sm sm:px-10 sm:py-14">
        {/* Step Progress Indicator */}
        <div className="mb-6 flex w-full items-center justify-center gap-2">
          <span
            className={`h-2.5 rounded-full transition-all duration-300 ${
              isGoogleStep ? "w-8 bg-[#48521c]" : "w-2.5 bg-[#c2d9c5]"
            }`}
            aria-hidden="true"
          />
          {/*
          //! Being disabled due to providers cannot be found
          */}
          {/* <span
            className={`h-2.5 rounded-full transition-all duration-300 ${
              isPhoneStep || isOtpStep
                ? "w-8 bg-[#48521c]"
                : isCompleteStep
                  ? "w-2.5 bg-[#48521c]"
                  : "w-2.5 bg-[#c2d9c5]"
            }`}
            aria-hidden="true"
          />
          <span
            className={`h-2.5 rounded-full transition-all duration-300 ${
              isCompleteStep ? "w-8 bg-[#48521c]" : "w-2.5 bg-[#c2d9c5]"
            }`}
            aria-hidden="true"
          /> */}
        </div>

        {/* Page Title & Subtitle */}
        <h1 className="text-center text-2xl font-bold tracking-tight text-(--main-color-text) sm:text-3xl">
          {isGoogleStep && "Đăng nhập / Đăng ký"}
          {isPhoneStep && "Xác thực số điện thoại"}
          {isOtpStep && "Xác nhận mã OTP"}
          {isCompleteStep && "Hoàn tất đăng nhập"}
        </h1>
        <p className="mt-2 text-center text-xs text-(--main-color-text)/75 sm:text-sm">
          {isGoogleStep && "Bắt đầu bằng tài khoản Google để tiếp tục"}
          {isPhoneStep && "Bước 2/2: Liên kết số điện thoại của bạn"}
          {isOtpStep && "Nhập mã xác thực được gửi qua tin nhắn SMS"}
          {isCompleteStep && "Chào mừng bạn đến với Làng Thanh Xuân"}
        </p>

        {/* Dynamic Auth Step Component Rendering */}
        <div className="mt-8 w-full">
          {isGoogleStep && <GoogleAuth />}

          {(isPhoneStep || isOtpStep || isCompleteStep) && (
            <PhoneAuth
              initialStep={
                isOtpStep ? "otp" : isCompleteStep ? "complete" : "phone"
              }
              initialPhone={phoneParam}
            />
          )}
        </div>
      </section>
    </main>
  );
}
