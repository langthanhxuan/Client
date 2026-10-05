/**
 * app/auth/signup/steps/Step1.tsx
 *
 * Form component for Step 1: "Thông tin người dùng".
 * Handles collection of Full Name, DOB (via dropdowns), and Location (via dropdown).
 */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupStore } from "@/store/signupStore";
import { step1Schema, type Step1Type } from "@/schema/signup/step";

// --- Configuration & Helpers ---

/**
 * Generates an array of numbers for days/months/years.
 * @param start - The starting number.
 * @param end - The ending number.
 * @returns Array of strings for select options.
 */
const generateOptions = (start: number, end: number) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push(String(i));
  }
  return options;
};

const days = generateOptions(1, 31);
const months = generateOptions(1, 12);
// Minus 18 so that only 18+ can be joined
const currentYear = new Date().getFullYear() - 18;
const years = generateOptions(1960, currentYear).reverse();

/**
 * List of available locations.
 * DUPLICATION AREA: Add new items to this array to expand the dropdown.
 */
const locations = [
  "Phường 1, Quận 1",
  // TODO: Add more locations here...
];

// --- Validation Scheme ---
type Step1FormData = Step1Type;

// --- Component ---

export default function Step1({ onNext }: { onNext: () => void }) {
  const { data, updateStep1 } = useSignupStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: data.step1,
  });

  /**
   * Handles form submission, persists data to store, and advances to Step 2.
   */
  const onSubmit = (formData: Step1FormData) => {
    updateStep1(formData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-2xl font-bold">Thông tin người dùng</h1>
      <p className="text-gray-600">
        Hoàn thiện hồ sơ của bạn để chính thức tham gia cộng đồng
      </p>

      {/* Full Name Input */}
      <div>
        <label className="block text-sm font-medium" htmlFor="fullname">
          Họ và tên
        </label>
        <input
          {...register("fullname")}
          id="fullname"
          className="w-full rounded border p-2"
          placeholder="Ví dụ: Nguyễn Văn A"
        />
        {errors.fullname && (
          <p className="text-sm text-red-500">{errors.fullname.message}</p>
        )}
      </div>

      {/* Date of Birth Dropdowns */}
      <div>
        <label className="block text-sm font-medium" htmlFor="dobDay">
          Ngày tháng năm sinh
        </label>
        <div className="flex gap-2">
          <select
            {...register("dobDay")}
            id="dobDay"
            className="w-20 rounded border p-2"
          >
            <option value="">Ngày</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select {...register("dobMonth")} className="w-25 rounded border p-2">
            <option value="">Tháng</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select {...register("dobYear")} className="w-20 rounded border p-2">
            <option value="">Năm</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        {(errors.dobDay || errors.dobMonth || errors.dobYear) && (
          <p className="text-sm text-red-500">
            Vui lòng chọn đầy đủ ngày tháng năm sinh
          </p>
        )}
      </div>

      {/* Location Dropdown */}
      <div>
        <label className="block text-sm font-medium" htmlFor="location">
          Nơi sinh sống (Phường/Xã TP HCM)
        </label>
        <select
          {...register("location")}
          id="location"
          className="w-full rounded border p-2"
        >
          <option value="">Chọn Phường/Xã</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-400">
          Dự án tạm thời thử nghiệm ở Sài Gòn nên chỉ có các phường, chọn KHÁC
          nếu ở nơi khác, dành cho các hoạt động trao đi/nhận lại online
        </p>
        {errors.location && (
          <p className="text-sm text-red-500">{errors.location.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded bg-[#E85D04] p-3 font-bold text-white transition-colors hover:bg-[#D94E03]"
      >
        Xác nhận
      </button>
    </form>
  );
}
