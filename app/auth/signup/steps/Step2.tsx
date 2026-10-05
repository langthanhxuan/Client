/**
 * app/auth/signup/steps/Step2.tsx
 *
 * Form component for Step 2: "Nghề nghiệp / Dịch vụ cho đi".
 * Collects expertise, estimated hours, and preferred method of engagement.
 */
"use client";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SkillAdder from "../../../../components/auth/SkillAdder";
import { step2Schema, type Step2Type } from "@/schema/signup/step";

// Align the schema resolver with the form's declared value type.
const typedResolver = zodResolver(step2Schema) as Resolver<Step2Type>;
import { useSignupStore } from "@/store/signupStore";
import { useState } from "react";

/* EXPANSION AREA: Add new skills to this array to automatically update the UI. */
const AVAILABLE_SKILLS = [
  "Thiết kế đồ họa",
  "Dạy tiếng Anh",
  "Viết lách / Content",
  "Sửa chữa máy tính",
  "Tư vấn tâm lý",
  "Nấu ăn / Làm bánh",
  "Tôi sẽ suy nghĩ thêm",
];

export default function Step2({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { data, updateStep2 } = useSignupStore();

  const form = useForm<Step2Type>({
    resolver: typedResolver,
    defaultValues: {
      ...data.step2,
      skills: data.step2.skills || [],
      customSkill: "",
      method: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const selectedSkills = watch("skills") || [];

  const isThinking = selectedSkills.includes("Tôi sẽ suy nghĩ thêm");

  const toggleSkill = (skill: string) => {
    const isSelected = selectedSkills.includes(skill);
    if (isSelected) {
      setValue(
        "skills",
        selectedSkills.filter((s) => s !== skill),
      );
    } else if (selectedSkills.length < 5) {
      setValue("skills", [...selectedSkills, skill]);
    }
  };

  const [customSkillInput, setCustomSkillInput] = useState("");

  const addCustomSkill = () => {
    const trimmed = customSkillInput.trim();
    if (!trimmed) return;
    if (selectedSkills.length >= 5) return;
    if (selectedSkills.includes(trimmed)) return;
    setValue("skills", [...selectedSkills, trimmed]);
    setCustomSkillInput("");
  };

  const onSubmit = (formData: Step2Type) => {
    updateStep2({
      skills: formData.skills,
      customSkill: formData.customSkill ?? "",
      hours: formData.hours,
      method: formData.method,
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold">Dịch vụ cho đi</h2>
      <p className="text-gray-600">
        Hoàn thiện hồ sơ của bạn để chính thức tham gia cộng đồng
      </p>

      {/* Multi-select Skills Toggle */}
      <div>
        <p className="mb-2 block text-sm font-medium">
          Lĩnh vực chuyên môn (chọn tối đa 5)
        </p>
        <div className="grid grid-cols-2 gap-2">
          {AVAILABLE_SKILLS.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`rounded border p-2 text-sm transition-colors ${
                  isSelected
                    ? "border-green-600 bg-green-50 text-green-800"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
        {errors.skills && (
          <p className="mt-1 text-sm text-red-500">{errors.skills.message}</p>
        )}
      </div>

      {/* Hours */}
      <div>
        <label className="block text-sm font-medium" htmlFor="hours">
          Số giờ cho đi
        </label>
        <input
          disabled={isThinking}
          {...register("hours", { valueAsNumber: true })}
          type="number"
          id="hours"
          placeholder="Nhập số giờ (ví dụ: 4)"
          className="w-full rounded border p-2 disabled:bg-gray-100 disabled:text-gray-500"
        />
        {errors.hours && (
          <p className="text-sm text-red-500">{errors.hours.message}</p>
        )}
      </div>

      <div
        className={`rounded border border-dashed border-gray-300 p-4 ${isThinking ? "pointer-events-none opacity-50" : ""}`}
      >
        <p className="mb-2 text-sm font-medium">Thêm kỹ năng khác</p>
        <SkillAdder
          customSkillInput={customSkillInput}
          setCustomSkillInput={setCustomSkillInput}
          addCustomSkill={addCustomSkill}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedSkills
            .filter((s) => !AVAILABLE_SKILLS.includes(s))
            .map((skill) => (
              <span
                key={skill}
                className="flex items-center rounded bg-gray-100 px-2 py-1 text-xs"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className="ml-1 text-red-500"
                >
                  x
                </button>
              </span>
            ))}
        </div>
      </div>
      {/* Method Radio Group */}
      <fieldset
        disabled={isThinking}
        className="space-y-2 opacity-100 transition-opacity disabled:opacity-50"
      >
        <legend className="block text-sm font-medium">
          Phương thức cho đi
        </legend>
        <div className="flex gap-4">
          <label className="flex items-center" htmlFor="method-online">
            <input
              type="checkbox"
              {...register("method")}
              value="online"
              id="method-online"
              className="mr-2"
            />
            Online
          </label>
          <label className="flex items-center" htmlFor="method-offline">
            <input
              type="checkbox"
              {...register("method")}
              value="offline"
              id="method-offline"
              className="mr-2"
            />
            Offline
          </label>
        </div>
        {errors.method && (
          <p className="text-sm text-red-500">{errors.method.message}</p>
        )}
      </fieldset>

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
          Xác nhận
        </button>
      </div>
    </form>
  );
}
