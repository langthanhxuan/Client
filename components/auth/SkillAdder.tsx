import React from "react";

interface SkillAdderProps {
  customSkillInput: string;
  setCustomSkillInput: (value: string) => void;
  addCustomSkill: () => void;
}

export default function SkillAdder({
  customSkillInput,
  setCustomSkillInput,
  addCustomSkill,
}: SkillAdderProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Thêm kỹ năng mới"
        value={customSkillInput}
        onChange={(e) => setCustomSkillInput(e.target.value)}
        className="flex-1 rounded border p-2"
      />
      <button
        type="button"
        onClick={addCustomSkill}
        className="rounded bg-[#E85D04] p-2 text-white"
      >
        Thêm
      </button>
    </div>
  );
}
