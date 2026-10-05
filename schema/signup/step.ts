import { z } from "zod";

export const step1Schema = z.object({
  fullname: z.string().min(1, "Vui lòng nhập họ tên"),
  dobDay: z.string().min(1, "Vui lòng chọn ngày"),
  dobMonth: z.string().min(1, "Vui lòng chọn tháng"),
  dobYear: z.string().min(1, "Vui lòng chọn năm"),
  location: z.string().min(1, "Vui lòng chọn địa điểm"),
});

export const step2Schema = z
  .object({
    skills: z
      .array(z.string())
      .min(1, "Vui lòng chọn ít nhất một kỹ năng")
      .max(5, "Chỉ được chọn tối đa 5 kỹ năng"),
    customSkill: z.string().optional(),
    hours: z.coerce
      .number()
      .min(0, "Vui lòng nhập số giờ có thể cho đi")
      .lte(87600)
      .optional(),
    method: z.array(z.enum(["online", "offline"])).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.skills.includes("Tôi sẽ suy nghĩ thêm")) {
      return;
    }
    if (data.hours === undefined || data.hours === 0 || data.hours === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Vui lòng nhập số giờ có thể cho đi",
        path: ["hours"],
      });
    }
    if (
      !data.method ||
      (Array.isArray(data.method) && data.method.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Vui lòng chọn phương thức cho đi",
        path: ["method"],
      });
    }
  });

export const step3Schema = z.object({
  image: z.any().optional(),
  meetingStatus: z.enum(["met", "notMet", ""], {
    message: "Vui lòng chọn trạng thái đã gặp",
  }),
  referenceInfo: z.string().optional(),
});

export type Step1Type = z.infer<typeof step1Schema>;
export type Step2Type = z.infer<typeof step2Schema>;
export type Step3Type = z.infer<typeof step3Schema>;
