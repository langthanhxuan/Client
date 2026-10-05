import { create } from "zustand";

/**
 * Signup Store Configuration
 * Used to persist form data across the 3-step signup wizard.
 */
interface SignupData {
  step1: {
    fullname: string;
    dobDay: string;
    dobMonth: string;
    dobYear: string;
    location: string;
  };
  step2: {
    skills: string[];
    customSkill: string;
    hours: number | undefined;
    method: "online" | "offline" | "";
  };
  step3: {
    image: File | null;
    meetingStatus: "met" | "notMet" | "";
    referenceInfo: string;
  };
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
    step2: { skills: [], customSkill: "", hours: 0, method: "" }, // Initialized to 0
    step3: { image: null, meetingStatus: "", referenceInfo: "" },
  },
  updateStep1: (step1) => set((state) => ({ data: { ...state.data, step1 } })),
  updateStep2: (step2) => set((state) => ({ data: { ...state.data, step2 } })),
  updateStep3: (step3) => set((state) => ({ data: { ...state.data, step3 } })),
}));
