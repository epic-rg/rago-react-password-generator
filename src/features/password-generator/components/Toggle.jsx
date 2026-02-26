import { haptic } from "../utils/haptics";

export const Toggle = ({ label, checked, onChange, theme }) => (
  <button
    type="button"
    onClick={() => {
      haptic();
      onChange(!checked);
    }}
    className="flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition"
    style={{
      borderColor: theme.border || theme.secondary,
      backgroundColor: `${theme.primary}B3`,
      color: theme.text,
    }}
  >
    <span>{label}</span>
    <span
      className={`relative inline-flex h-6 w-11 shrink-0 overflow-hidden rounded-full p-0.5 transition-colors duration-300 ${
        checked ? "" : ""
      }`}
      style={{ backgroundColor: checked ? theme.secondary : theme.primary }}
    >
      <span
        className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ${
          checked ? "left-5.5" : "left-0.5"
        }`}
      />
    </span>
  </button>
);
