"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignupStore } from "@/store/signupStore";
import { step3Schema, type Step3Type } from "@/schema/signup/step";
import { useRouter } from "next/navigation";

/**
 * Zod schema for Step 3 validation.
 * Validates identity verification, meeting status, and optional reference information.
 */
type Step3FormData = Step3Type;

/**
 * Step3: Xác minh uy tín
 * Finalizes registration by collecting verification info.
 */
export default function Step3({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const { data, updateStep3 } = useSignupStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      meetingStatus: data.step3.meetingStatus,
      referenceInfo: data.step3.referenceInfo,
    },
  });

  const onSubmit = (formData: Step3FormData) => {
    // Map form data and null for image for now (demo purpose)
    updateStep3({ ...formData, image: null });
    console.log("Submit finalized form:", {
      ...data,
      step3: { ...formData, image: null },
    });
    router.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold">Xác minh uy tín</h2>
      <p className="text-gray-600">
        Hoàn thiện hồ sơ của bạn để chính thức tham gia cộng đồng
      </p>

      {/* Simple image upload placeholder */}
      <div className="rounded border-2 border-dashed p-6 text-center text-gray-500">
        Tải ảnh chụp cùng Admin (tạm thời chưa hỗ trợ)
      </div>

      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            {...register("meetingStatus")}
            value="met"
            className="mr-2"
          />{" "}
          Tôi đã gặp ban quản trị làng
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            {...register("meetingStatus")}
            value="notMet"
            className="mr-2"
          />{" "}
          Tôi chưa từng gặp
        </label>
        {errors.meetingStatus && (
          <p className="text-sm text-red-500">{errors.meetingStatus.message}</p>
        )}
      </div>

      <textarea
        {...register("referenceInfo")}
        placeholder="Điền thông tin bảo lãnh (nếu có)..."
        className="h-24 w-full rounded border p-2"
      />

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded bg-gray-200 p-3 font-bold"
        >
          Quay lại
        </button>
        <button
          type="submit"
          className="flex-1 rounded bg-[#E85D04] p-3 font-bold text-white"
        >
          Hoàn tất đăng ký
        </button>
      </div>
    </form>
  );
}
