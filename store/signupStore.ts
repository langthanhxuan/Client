import { create } from "zustand";
import type { Step1Type, Step2Type, Step3Type } from "@/schema/signup/step";

/**
 * Signup Store Configuration
 * Used to persist form data across the 3-step signup wizard.
 */
interface SignupData {
  step1: Step1Type;
  step2: Step2Type;
  step3: Step3Type;
}

interface SignupStore {
  data: SignupData;
  updateStep1: (data: SignupData["step1"]) => void;
  updateStep2: (data: SignupData["step2"]) => void;
  updateStep3: (data: SignupData["step3"]) => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  data: {
    step1: {
      fullname: "",
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      location: "",
    },
    step2: { skills: [], customSkill: "", hours: 0, method: [] },
    step3: { image: null, meetingStatus: "", referenceInfo: "" },
  },
  updateStep1: (step1) => set((state) => ({ data: { ...state.data, step1 } })),
  updateStep2: (step2) => set((state) => ({ data: { ...state.data, step2 } })),
  updateStep3: (step3) => set((state) => ({ data: { ...state.data, step3 } })),
}));
